# Archit Verma | Portfolio

A modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. Showcasing backend engineering, BI automation, and AI integration expertise with a sleek dark/light theme toggle.

---

## 🚀 Features

- **Responsive Design** – Mobile-first approach with breakpoints for all screen sizes
- **Dark/Light Theme Toggle** – Theme preference persisted to localStorage
- **Dynamic Content Loading** – All content driven from `config/config.json`
- **Smooth Navigation** – Active section tracking with Intersection Observer API
- **Terminal-Inspired UI** – Aesthetic design with system/engineering theme
- **IST Time Display** – Real-time IST timezone clock in navbar
- **Production Ready** – Clean, modular code structure with ES6 modules
- **Beautiful Animations** – Smooth transitions and interactive elements

---

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Setup & Installation](#setup--installation)
3. [Configuration](#configuration)
4. [Customization](#customization)
5. [Deployment](#deployment)
6. [Browser Support](#browser-support)

---

## 📁 Project Structure

```
archit-portfolio/
├── index.html                      # Main HTML template
├── README.md                       # Project documentation
│
├── config/
│   └── config.json                # All content & settings (edit this!)
│
├── css/
│   ├── style.css                  # Global styles & CSS variables
│   └── components.css             # Component-specific styles
│
├── js/
│   ├── config.js                  # Config loader & manager
│   ├── theme.js                   # Dark/light theme handler
│   └── main.js                    # Main app logic & DOM rendering
│
└── assets/
    ├── docs/
    │   ├── Resume-Archit.pdf
    │   └── messages.json          # Message structure reference ⭐
    └── icons/                     # Optional icon assets
```

---

## 🔧 Setup & Installation

### Prerequisites
- Any modern browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- No build tools or server required (works with `file://` or local server)

### Quick Start

1. **Clone or extract the repository:**
   ```bash
   cd o:\Work\VSCode\my-portfolio
   ```

2. **Open in browser:**
   - Option A: Double-click `index.html`
   - Option B: Run a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Or using Node.js (http-server)
     npx http-server
     ```
   - Then open `http://localhost:8000`

3. **Customize content:**
   - Edit `config/config.json` with your information
   - Update links, experience, projects, and skills
   - See [Configuration](#configuration) below

---

## ⚙️ Configuration

All content is managed in `config/config.json`. No HTML/JS changes needed for content updates.

### Site Settings

```json
"site": {
  "title": "Your Name | Role Title",
  "description": "Your professional description",
  "keywords": "relevant, keywords, for, seo",
  "author": "Your Name"
}
```

### Personal Information

```json
"personal": {
  "name": "Your Full Name",
  "role": "Your Professional Title",
  "location": "Your Location",
  "email": "your.email@example.com",
  "availability": "Open to Opportunities"
}
```

### Links

```json
"links": {
  "linkedin": "https://linkedin.com/in/your-profile",
  "github": "https://github.com/your-username",
  "resume": "assets/docs/YourResume.pdf"
}
```

### Experience

```json
"experience": [
  {
    "title": "Job Title",
    "company": "Company Name",
    "period": "Month YYYY – Month YYYY",
    "status": "current",  // or leave blank
    "achievements": [
      "Achievement 1",
      "Achievement 2"
    ]
  }
]
```

### Projects

```json
"projects": [
  {
    "title": "Project Name",
    "description": "Brief project description",
    "status": "production",  // or "development"
    "technologies": ["Tech1", "Tech2"],
    "features": [
      "Feature 1",
      "Feature 2"
    ]
  }
]
```

### Skills

```json
"skills": {
  "backend": ["Java", "Python", "Spring Boot"],
  "data_bi": ["SQL", "Power BI", "Tableau"],
  "ai_automation": ["LangGraph", "AI Workflows"],
  "practices": ["CI/CD", "Git", "Microservices"]
}
```

### Education

```json
"education": [
  {
    "degree": "Bachelor's in Computer Science",
    "institution": "University Name",
    "period": "2020 - 2024"
  }
]
```

### Contact & Footer

```json
"contact": {
  "email": "your.email@example.com",
  "copyright": "© 2026 Your Name. All rights reserved.",
  "version": "1.0.0",
  "build_date": "YYYY-MM-DD"
}
```

---

## 🎨 Customization

### Colors & Typography

Edit CSS variables in `css/style.css`:

```css
:root {
    --color-primary: #06d6a0;        /* Main accent color */
    --color-secondary: #3b82f6;      /* Secondary color */
    --color-accent: #8b5cf6;         /* Tertiary color */
    --container-max-width: 1600px;   /* Content width */
    --container-padding: 0.75rem;    /* Side padding */
}
```

### Dark/Light Theme

The theme toggle automatically switches between dark and light modes. Customize colors for light theme:

```css
[data-theme="light"] {
    --color-bg-primary: #f8fafc;
    --color-text-primary: #0f172a;
    /* ... other variables ... */
}
```

### Responsive Breakpoints

Modify media queries in `css/components.css`:

```css
@media (max-width: 768px) {
    /* Tablet & mobile styles */
}

@media (max-width: 480px) {
    /* Mobile-only styles */
}
```

---

## 📦 Sections Overview

### 1. Hero Section
- Main title with role highlight
- Location display
- Call-to-action buttons (LinkedIn, Resume)
- Experience stats

### 2. System Overview
- Engineer profile terminal card
- Data pipeline workflow visualization
- Technical metrics

### 3. Experience Pipeline
- Timeline of professional roles
- Achievements and accomplishments
- Current/past role indicators

### 4. Project Portfolio
- Project cards with status badges
- Technology stacks
- Feature lists

### 5. Technical Architecture
- Skill categories (Backend, Data/BI, AI, Practices)
- Technology tags

### 6. Education & Certifications
- Degree information
- Institution details

### 7. Contact & Footer
- Email, LinkedIn, GitHub links
- System status and version info

---

## 🌐 Deployment

### GitHub Pages

1. Create a GitHub repository named `your-username.github.io`
2. Push all files to `main` branch
3. Enable GitHub Pages in repository settings
4. Visit `https://your-username.github.io`

### Netlify

1. Connect your repository to Netlify
2. Build command: (leave blank – no build needed)
3. Publish directory: `/` (root)
4. Deploy

### Traditional Hosting

1. Upload all files to your web server
2. Ensure `config/config.json` is accessible
3. Set MIME type for `.json` files if needed

---

## 🔍 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note:** IE11 is not supported (ES6 module syntax used)

---

## 📱 Mobile Experience

The portfolio is fully responsive:
- **Desktop (1200px+):** Full multi-column layouts
- **Tablet (768px – 1199px):** Adjusted grid & spacing
- **Mobile (<768px):** Single column, hamburger menu, optimized touch targets

---

## 🛠️ Development Tips

### Adding New Sections

1. Add HTML in `index.html` with a unique `id`
2. Add corresponding `div` for content to populate
3. Create renderer method in `js/main.js` (e.g., `renderMySection()`)
4. Call it from `renderContent()` method
5. Add data to `config/config.json`
6. Add navigation link in navbar

### Debugging

- Open browser DevTools (`F12`)
- Check Console for errors
- The app logs initialization steps with emoji prefixes (🚀, 📍, 🎨, etc.)
- Global `window.portfolioApp` available for inspection

### Local Development Server

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# VS Code Live Server extension
# Just install and click "Go Live"
```

---

## 📝 Common Customizations

### Change Primary Color
Edit `css/style.css`:
```css
--color-primary: #your-color-hex;
```

### Adjust Content Width
Edit `css/style.css`:
```css
--container-max-width: 1800px;  /* Wider content */
--container-padding: 1rem;       /* More side padding */
```

### Update Resume Link
Edit `config/config.json`:
```json
"resume": "assets/docs/YourResume.pdf"
```

### Add Social Links
Edit `config/config.json` `links` object and update `js/main.js` `setupDownloadLinks()` method

---

## 📄 License

This portfolio template is provided as-is. Customize freely for personal use.

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify `config/config.json` is valid JSON
3. Ensure all linked files exist (resume, images, etc.)
4. Check file paths use forward slashes `/`

---

## 🎯 Next Steps

1. ✅ Review and customize `config/config.json`
2. ✅ Update colors in `css/style.css`
3. ✅ Add your resume to `assets/docs/`
4. ✅ Test on mobile devices
5. ✅ Deploy to GitHub Pages or hosting service

---

**Version:** 1.0.0 | **Last Updated:** Feb 11, 2026
