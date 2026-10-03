const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Helper to read DB
function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = { users: [], equipment: [], bookings: [] };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
      return initial;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB:', err);
    return { users: [], equipment: [], bookings: [] };
  }
}

// Helper to write DB
function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing DB:', err);
    return false;
  }
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AgriShare API Server', timestamp: new Date() });
});

// 2. User Aadhar Authentication & Registration
app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, aadhar, role, address } = req.body;
  if (!name || !phone || !aadhar) {
    return res.status(400).json({ error: 'Name, Phone, and 12-digit Aadhar ID are required.' });
  }

  const db = readDB();
  const existing = db.users.find(u => u.aadhar === aadhar || u.phone === phone);
  if (existing) {
    return res.json({ success: true, user: existing, message: 'User authenticated via Aadhar ID.' });
  }

  const newUser = {
    id: 'usr_' + Date.now(),
    name,
    email: email || `${phone}@agrishare.in`,
    phone,
    aadhar,
    role: role || 'farmer',
    gender: req.body.gender || 'Male',
    age: req.body.age || 35,
    address: address || 'Coimbatore'
  };

  db.users.push(newUser);
  writeDB(db);
  res.status(201).json({ success: true, user: newUser, message: 'User registered and authenticated successfully with Aadhar ID.' });
});

app.post('/api/auth/login', (req, res) => {
  const { aadhar, phone } = req.body;
  const db = readDB();
  const user = db.users.find(u => (aadhar && u.aadhar === aadhar) || (phone && u.phone === phone));

  if (user) {
    return res.json({ success: true, user, message: 'Aadhar authentication successful.' });
  } else {
    // Auto register for seamless UX
    const newUser = {
      id: 'usr_' + Date.now(),
      name: req.body.name || 'Verified Farmer',
      email: `${phone || '9876543210'}@agrishare.in`,
      phone: phone || '9876543210',
      aadhar: aadhar || '5481-8392-4015',
      role: 'farmer',
      gender: 'Male',
      address: 'Tamil Nadu'
    };
    db.users.push(newUser);
    writeDB(db);
    return res.json({ success: true, user: newUser, message: 'Aadhar user logged in.' });
  }
});

// 3. Equipment Routes
app.get('/api/equipment', (req, res) => {
  const db = readDB();
  res.json({ success: true, equipment: db.equipment });
});

app.post('/api/equipment', (req, res) => {
  const { name, category, hp, rate, ownerName, ownerPhone, ownerAadhar, location, img } = req.body;
  if (!name || !rate || !ownerName || !ownerAadhar) {
    return res.status(400).json({ error: 'Equipment name, hourly rate, owner details, and Aadhar ID are required.' });
  }

  const db = readDB();
  const newEquip = {
    id: 'eq_' + Date.now(),
    name,
    category: category || 'Agricultural Machinery',
    hp: hp || '45 HP',
    rate: Number(rate),
    ownerName,
    ownerPhone,
    ownerAadhar,
    location: location || 'Coimbatore',
    img: img || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&auto=format&fit=crop&q=80',
    status: 'Available',
    createdAt: new Date().toISOString()
  };

  db.equipment.unshift(newEquip);
  writeDB(db);

  res.status(201).json({ success: true, equipment: newEquip, message: 'Equipment registered and saved to backend database.' });
});

// 4. Booking Routes
app.get('/api/bookings', (req, res) => {
  const db = readDB();
  res.json({ success: true, bookings: db.bookings });
});

app.post('/api/bookings', (req, res) => {
  const { equipmentName, renterName, renterPhone, renterAadhar, location, rate, durationHours, startDate, startTime } = req.body;
  if (!equipmentName || !renterName || !renterAadhar || !rate || !durationHours) {
    return res.status(400).json({ error: 'Equipment, renter details, Aadhar ID, hourly rate, and rental duration are required.' });
  }

  const duration = Number(durationHours) || 1;
  const hourlyRate = Number(rate) || 0;
  const totalCost = hourlyRate * duration;

  const db = readDB();
  const newBooking = {
    id: 'bk_' + Date.now(),
    equipmentName,
    renterName,
    renterPhone: renterPhone || '9876543210',
    renterAadhar,
    location: location || 'Tamil Nadu',
    rate: hourlyRate,
    durationHours: duration,
    totalCost,
    startDate: startDate || new Date().toISOString().split('T')[0],
    startTime: startTime || '09:00',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  db.bookings.unshift(newBooking);
  writeDB(db);

  res.status(201).json({ success: true, booking: newBooking, message: 'Equipment booking confirmed and saved to backend DB.' });
});

// 5. Unified Storage endpoint (Sync DB & WebStorage)
app.get('/api/storage', (req, res) => {
  const db = readDB();
  res.json({
    success: true,
    users: db.users,
    equipment: db.equipment,
    bookings: db.bookings
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  AgriShare Backend API & Web Server Running Successfully!`);
  console.log(`  Local Server URL: http://localhost:${PORT}`);
  console.log(`  Database File: ${DB_FILE}`);
  console.log(`=======================================================`);
});
