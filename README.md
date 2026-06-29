# AgriShare – Farmer Equipment Sharing & Rental Portal

![AgriShare Dashboard](https://via.placeholder.com/1200x500?text=AgriShare+Dashboard+Screenshot)

## 📌 Project Overview
**AgriShare** is a Smart Agriculture Single Page Dashboard Application that allows farmers to rent agricultural machinery from equipment owners. By shifting from an ownership model to a sharing and rental model, the platform helps reduce operational farming costs, improves equipment utilization, and promotes sustainable farming practices. 

This repository contains the comprehensive frontend interface developed as the prototype for a Full Stack Development Laboratory project. The design closely mirrors enterprise SaaS applications (like SAP Fiori or AWS Console) tailored explicitly for Agricultural Equipment Rental Management.

### Tagline
_Empowering Farmers Through Shared Resources_

---

## 🎯 Objectives
- **Cost Reduction:** Provide small and marginal farmers access to high-cost machinery without the burden of ownership.
- **Resource Optimization:** Help equipment owners maximize the return on their investments through rentals.
- **Professional Standard:** Demonstrate industry-grade UI/UX utilizing semantic HTML5, CSS Grid/Flexbox, and Vanilla JavaScript.
- **Scalability:** Serve as a clean, static frontend foundation ready to be integrated with PHP & MySQL in future project phases.

---

## ✨ Features
1. **Interactive Dashboard:** Live counts, animated statistics, and intuitive UI representations of system metrics.
2. **Equipment Catalog (Slider):** A responsive image slider displaying available machinery including Tractors, Harvesters, and Water Pumps.
3. **Advanced Booking Workflow:** Visual representation of the complete lifecycle of an equipment rental (from registration to review).
4. **Theme Switcher:** Integrated Dark/Light Mode functionality with local storage persistence.
5. **Real-time Validations:** Comprehensive Client-side form validation ensuring data integrity before submission.
6. **Notification System:** A slide-in, interactive dynamic notification panel.
7. **Semantic Structure:** Full adherence to HTML5 (`<header>`, `<nav>`, `<aside>`, `<marquee>`, `<table>`, `<ul>`, `<ol>`).
8. **Fully Responsive:** Gracefully scales across Mobile, Tablet, and Desktop using CSS Grid and Flexbox.

---

## 💻 Technology Stack
- **HTML5:** Semantic architecture focusing on accessibility and structural integrity.
- **CSS3:** Custom Properties (Variables), Grid Layout, Flexbox, Glassmorphism UI, Responsive Media Queries, and Keyframe Animations.
- **JavaScript (Vanilla):** DOM manipulation, Intersect Observers, Form Validation, Date API, LocalStorage processing.
- **FontAwesome:** Scalable vector icons.
- **Google Fonts:** Primary typography (`Inter`).

---

## 📂 Folder Structure

```
AgriShare/
│
├── index.html        # Main Entry Point (Single Page Application structure)
├── style.css         # Styling, Layouts, Variables, responsive breakpoints
├── script.js         # JavaScript Logic (Counters, Slider, Themes, Validations)
└── README.md         # Documentation
```

---

## 🚀 Deployment Instructions

### GitHub Deployment Steps
1. Create a GitHub Account at [github.com](https://github.com).
2. Click on the **+** icon in the top right corner and select **New repository**.
3. Name your repository `AgriShare-Dashboard` and click **Create repository**.
4. Initialize a git repository locally, commit your code, and push it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AgriShare Dashboard Frontend"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/AgriShare-Dashboard.git
   git push -u origin main
   ```

### Vercel Deployment Steps
1. Sign up or log into [Vercel](https://vercel.com/) (You can authenticate using your GitHub account).
2. From the Vercel Dashboard, click on **Add New -> Project**.
3. Locate the `AgriShare-Dashboard` repository from the list of your GitHub repos and click **Import**.
4. Leave all default project settings and click **Deploy**.
5. Wait a few seconds until Vercel completes the build. 
6. Click **Continue to Dashboard** to view your Live URL.

---

## 🔮 Future Scope
In upcoming laboratory assignments, this prototype will evolve into a complete Full Stack Application via:
- **Backend:** PHP scripting to handle User Authentication and API routing.
- **Database:** Relational schema building in MySQL to manage Farmers, Equipment, Bookings, and Logs.
- **Dynamic Frontend:** AJAX & jQuery integrations for asynchronous data loading removing the need for page reloads.

---

## 👩‍💻 Developer Information
- **Developed By:** [Student Name]
- **Register Number:** [Register Number]
- **Course:** 23IT721 – Full Stack Development Laboratory
- **Department:** Department of Information Technology

---
*© 2026 AgriShare. Designed & Developed as a placement-ready portfolio project.*
