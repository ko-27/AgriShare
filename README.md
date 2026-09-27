# AgriShare – Farmer Equipment Sharing & Rental Portal
**Course Code:** 23IT721 – Full Stack Development Laboratory  
**Assignment – 2:** Interactive Dashboard Webpage Using CSS, JavaScript and Web Animations with GitHub and Vercel Deployment  

---

## 🌾 Student & Project Metadata
- **Student Name:** Kohila M  
- **Register Number:** 2303717620522027  
- **Department:** Department of Information Technology  
- **Degree:** B.Tech. Information Technology  
- **Institution:** Department of Information Technology, Full Stack Development Laboratory  
- **Project Domain:** Smart Agriculture & Sustainable Resource Sharing  
- **Live Vercel URL:** *[To be added upon deployment]*  
- **GitHub Repository URL:** *[To be added upon upload]*  

---

## 📖 Project Overview & Objectives
**AgriShare** is an enterprise-grade Smart Agriculture Single-Page Interactive Web Dashboard designed to facilitate seamless equipment sharing and rental services between agricultural machinery owners and local farmers. 

Instead of smallholder and marginal farmers suffering crippling capital expenditure to purchase tractors, combine harvesters, rotavators, and high-capacity irrigation pumps, AgriShare enables transparent, verified hourly and daily rentals within localized 15 km regional clusters across Tamil Nadu (Coimbatore, Erode, Salem, Madurai, Trichy).

### Key Objectives:
1. **Reduce Farming Capital Costs:** Lower machinery adoption barriers through affordable hourly bookings.
2. **Maximize Asset Utilization:** Empower equipment owners to monetize idle machinery during off-season cycles.
3. **Responsive Full Stack Frontend Prototype:** Build a clean, semantic HTML5, CSS3, and JavaScript dashboard adhering to modern UI/UX principles, CSS Grid/Flexbox architectures, and accessibility standards.
4. **Placement-Ready Portfolio Project:** Deploy on Vercel with version control tracking on GitHub.

---

## 📋 Comprehensive Feature Checklist (Assignment 2 Mapping)

| S.No | Component / Section | Requirements & Implementation Details | Status |
| :---: | :--- | :--- | :---: |
| **1** | **Professional Theme** | Styled using agricultural palette: Primary Green (`#2E7D32`), Secondary Green (`#43A047`), Earth Brown (`#6D4C41`), soft shadows, clean typography (Inter & Poppins), and CSS Grid/Flexbox. | ✅ Implemented |
| **2** | **Navigation Bar** | Responsive sticky topbar and sidebar navigation (Home, Dashboard, Machinery, Features, Services, Reports, Register, Modules, Contact, Logout) with hover effects and scroll-based active menu highlighting. | ✅ Implemented |
| **3** | **Welcome Banner** | Hero section with tagline typing effect, application vision & mission cards, project description, call-to-action buttons, and fade-in/slide-in animations. | ✅ Implemented |
| **4** | **Dashboard Cards** | Six animated metric cards: Registered Farmers (1,450+), Equipment Owners (380+), Available Equipment (520), Today's Bookings (94), Pending Requests (18), and Completed Rentals (1,120). | ✅ Implemented |
| **5** | **Dynamic Statistics** | JavaScript animated count-up counters utilizing `requestAnimationFrame` with scroll triggers and an interactive refresh button. | ✅ Implemented |
| **6** | **Features Section** | Semantic `<ul>` and `<li>` structured into 6 animated feature cards with custom icon badges and hover-lift transitions. | ✅ Implemented |
| **7** | **Services Section** | Semantic `<ol>` and `<li>` structured into 6 numbered service cards highlighting registration, search, operator bookings, and audit reports. | ✅ Implemented |
| **8** | **Image / Banner Slider** | High-performance interactive equipment carousel featuring Mahindra Tractor, John Deere Harvester, Kirloskar Pump, Shaktiman Rotavator, Seed Drill, and Cultivator with auto-slide, next/prev triggers, and dot navigation. | ✅ Implemented |
| **9** | **Date and Time Display** | Live clock in the top sticky header updating real-time day, month, date, hours, minutes, and seconds every 1,000ms via JavaScript. | ✅ Implemented |
| **10** | **Theme Switcher** | Light Mode and Dark Mode toggle stored in browser `localStorage` ensuring theme persistence across reloads. | ✅ Implemented |
| **11** | **Notification Panel** | Slide-in drawer with badge counters, unread notification badges, and a "Mark All as Read" interactive trigger. | ✅ Implemented |
| **12** | **Registration Form** | Form containing Name, Email, Phone Number, Password, Gender, Date of Birth, Address, Submit, and Reset buttons. | ✅ Implemented |
| **13** | **Form Validation** | Comprehensive client-side JavaScript validation (email regex, 10-digit mobile, age calculation, password strength meter, required checks) with error alerts. | ✅ Implemented |
| **14** | **Animation Effects** | Over 8 animations: Fade-In, Slide-In Left/Right, Zoom-In, Button Bounce, Pulse Glow, Rotating Machinery Icon, Progress Bar Fills, and Typing Effect. | ✅ Implemented |
| **15** | **Action Buttons** | Transition hover effects, smooth color morphs, and scaling states applied across all interactive buttons. | ✅ Implemented |
| **16** | **Scroll-to-Top Button** | Floating circular button appearing after 350px scroll with smooth scroll-to-top behavior. | ✅ Implemented |
| **17** | **Contact Section** | Regional hub address, email links, helpline numbers, quick inquiry form, and stylized social media channels (Facebook, Instagram, LinkedIn, GitHub). | ✅ Implemented |
| **18** | **Footer** | Copyright © 2026 AgriShare, Developer metadata (Kohila M, Reg: 2303717620522027, IT Dept), and navigation anchors. | ✅ Implemented |
| **19** | **GitHub Repository** | Version control tracking with structured commits for HTML, CSS, JS, and documentation. | 🚀 Instructions Below |
| **20** | **Vercel Deployment** | Production cloud deployment with live SSL-certified URL. | 🚀 Instructions Below |

---

## 📂 Project Directory Structure

```text
c:/AgriShare/
├── index.html       # Complete Semantic HTML5 Master Dashboard Interface
├── style.css        # Professional Theme, Dark Mode, Animations & Responsive Grid
├── script.js        # Dynamic Statistics, Slider, Live Clock, Theme & Validation Logic
└── README.md        # Assignment Documentation & Deployment Guidelines
```

---

## 🛠️ Technology Stack
- **HTML5:** Semantic architecture (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<table>`, `<ul>`, `<ol>`, `<marquee>`)
- **CSS3:** Custom Properties (Theming), CSS Flexbox & CSS Grid, Glassmorphism, Keyframe Animations, Responsive Media Queries
- **JavaScript (ES6+):** DOM Manipulation, IntersectionObserver API, RequestAnimationFrame, Date Object, LocalStorage API, Regex Validations
- **Icons & Typography:** Font Awesome 6.5.1, Google Fonts (Inter & Poppins)

---

## 🚀 Step-by-Step Deployment Instructions

### Part 1: GitHub Repository Setup (Requirement 19)
1. Open your terminal in the project directory:
   ```bash
   cd c:\AgriShare
   ```
2. Initialize Git and stage all files:
   ```bash
   git init
   git add .
   git commit -m "Assignment 2: Interactive AgriShare Dashboard with CSS & JS Animations"
   ```
3. Create a new public repository on [GitHub](https://github.com) named `AgriShare-Dashboard`.
4. Link your local repository to GitHub and push to the `main` branch:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/AgriShare-Dashboard.git
   git push -u origin main
   ```

---

### Part 2: Vercel Cloud Deployment (Requirement 20)
1. Navigate to [Vercel](https://vercel.com/) and log in with your GitHub account.
2. Click **Add New** ➔ **Project**.
3. Select **Import** next to your `AgriShare-Dashboard` repository.
4. Keep the Framework Preset as **Other** (Root Directory `./`).
5. Click **Deploy**.
6. Within 15 seconds, Vercel will generate your live production URL (e.g., `https://agrishare-dashboard.vercel.app`).
7. Copy the Live URL and GitHub Repository link and submit them on your laboratory portal!

---

*Academic Submission for Course 23IT721 – Full Stack Development Laboratory • Department of Information Technology*
