// Main application script
import config from './config.js';
import theme from './theme.js';

class PortfolioApp {
    constructor() {
        this.currentSection = 'home';
        this.init();
    }

    async init() {
        await config.init();
        
        this.setupNavigation();
        this.setupTimeDisplay();
        this.renderContent();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        
        console.log('🚀 Portfolio application initialized');
        this.showConsoleGreeting();
    }

    setupNavigation() {
        // Mobile menu toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
            });
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Update active link
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                    
                    // Smooth scroll
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    this.currentSection = targetId.substring(1);
                    console.log(`📍 Navigated to: ${this.currentSection}`);
                }
            });
        });
    }

    setupTimeDisplay() {
        const updateISTTime = () => {
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const ist = new Date(utc + (5.5 * 60 * 60000));
            
            const hours = ist.getHours().toString().padStart(2, '0');
            const minutes = ist.getMinutes().toString().padStart(2, '0');
            const seconds = ist.getSeconds().toString().padStart(2, '0');
            
            const timeElement = document.getElementById('currentTime');
            if (timeElement) {
                timeElement.textContent = `${hours}:${minutes}:${seconds} IST`;
            }
        };
        
        updateISTTime();
        setInterval(updateISTTime, 1000);
    }

    renderContent() {
        this.renderPersonalInfo();
        this.renderExperience();
        this.renderProjects();
        this.renderSkills();
        this.renderEducation();
        this.renderCertifications();
        this.renderMetrics();
        this.renderSocialLinks();
        this.setupDownloadLinks();
    }

    renderPersonalInfo() {
        const personal = config.get('personal', {});
        
        // Set page title
        document.title = config.get('site.title', 'Archit Verma | Portfolio');
        
        // Update name and role
        const nameElement = document.querySelector('.hero-title .highlight');
        if (nameElement && personal.name) {
            nameElement.textContent = personal.name.split(' ')[1] || personal.name;
        }
        
        // Update location
        const locationElement = document.getElementById('locationText');
        if (locationElement && personal.location) {
            locationElement.textContent = personal.location;
        }
        
        // Update hero description
        const descriptionElement = document.getElementById('heroDescription');
        if (descriptionElement) {
            descriptionElement.textContent = config.get('site.description', '');
        }
        
        // Update experience years
        const expElement = document.getElementById('expYears');
        if (expElement) {
            const expYears = this.calculateExperienceYears();
            expElement.textContent = `${expYears}+`;
        }
    }

    calculateExperienceYears() {
        const personal = config.get('personal', {});
        
        // Use explicit experienceYears if provided
        if (personal.experienceYears) {
            return personal.experienceYears;
        }
        
        const experiences = config.get('experience', []);
        if (experiences.length === 0) return 2;
        
        // Extract all four-digit years from experience periods using regex
        const yearRegex = /\b(19|20)\d{2}\b/g;
        const allYears = experiences
            .flatMap(exp => {
                if (!exp.period) return [];
                const matches = exp.period.match(yearRegex);
                return matches ? matches.map(y => parseInt(y, 10)) : [];
            });
        
        // Use the maximum (most recent) year as the start point
        if (allYears.length === 0) return 2;
        const maxYear = Math.max(...allYears);
        const currentYear = new Date().getFullYear();
        return currentYear - maxYear;
    }

    renderExperience() {
        const experiences = config.get('experience', []);
        const timelineElement = document.getElementById('experienceTimeline');
        
        if (!timelineElement) return;
        
        timelineElement.innerHTML = experiences.map(exp => `
            <div class="timeline-item">
                <div class="timeline-marker ${exp.status === 'current' ? 'current' : ''}">
                    <i class="fas fa-${exp.status === 'current' ? 'cogs' : 'code'}"></i>
                </div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h3 class="timeline-title">${exp.title}</h3>
                        <span class="timeline-period">${exp.period}</span>
                    </div>
                    <div class="timeline-company">${exp.company}</div>
                    ${exp.subtitle ? `<div class="timeline-subtitle">${exp.subtitle}</div>` : ''}
                    <ul class="timeline-achievements">
                        ${exp.achievements ? exp.achievements.map(ach => `
                            <li>${ach}</li>
                        `).join('') : ''}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    renderProjects() {
        const projects = config.get('projects', []);
        const projectsGrid = document.getElementById('projectsGrid');
        
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-status-badge">
                        <i class="fas fa-${project.status === 'production' ? 'rocket' : 'cogs'}"></i>
                        ${(project.status || 'production').toUpperCase()}
                    </span>
                </div>
                
                <p class="project-description">${project.description}</p>
                
                <div class="project-meta">
                    ${project.period ? `<span class="project-period"><i class="fas fa-calendar"></i>${project.period}</span>` : ''}
                    ${project.impact ? `<span class="project-impact"><i class="fas fa-chart-line"></i>${project.impact}</span>` : ''}
                </div>
                
                ${project.highlights ? `
                    <div class="project-highlights">
                        ${project.highlights.map(highlight => `
                            <div class="highlight-item">
                                <i class="fas fa-check"></i>
                                ${highlight}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="project-features">
                    <div class="features-label">Key Features</div>
                    <div class="feature-list">
                        ${project.features ? project.features.map(feature => `
                            <span class="feature-item">${feature}</span>
                        `).join('') : ''}
                    </div>
                </div>
                
                <div class="tech-stack">
                    ${project.technologies ? project.technologies.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('') : ''}
                </div>
            </div>
        `).join('');
    }

    renderSkills() {
        const skills = config.get('skills', {});
        const skillsGrid = document.getElementById('skillsGrid');
        
        if (!skillsGrid) return;
        
        const skillCategories = [
            { key: 'languages', icon: 'code', title: 'Languages' },
            { key: 'backend_frameworks', icon: 'server', title: 'Backend & Frameworks' },
            { key: 'data_database', icon: 'database', title: 'Data & Database' },
            { key: 'ai_innovation', icon: 'robot', title: 'AI & Innovation' },
            { key: 'tools_platforms', icon: 'wrench', title: 'Tools & Platforms' },
            { key: 'practices', icon: 'cogs', title: 'Engineering Practices' }
        ];
        
        skillsGrid.innerHTML = skillCategories.map(category => `
            <div class="architecture-layer">
                <div class="layer-header">
                    <div class="layer-icon">
                        <i class="fas fa-${category.icon}"></i>
                    </div>
                    <h3 class="layer-title">${category.title}</h3>
                </div>
                <div class="layer-tech">
                    ${skills[category.key] ? skills[category.key].map(skill => `
                        <span class="tech-tag">${skill}</span>
                    `).join('') : ''}
                </div>
            </div>
        `).join('');
    }

    renderEducation() {
        const education = config.get('education', []);
        const educationGrid = document.getElementById('educationGrid');
        
        if (!educationGrid) return;
        
        educationGrid.innerHTML = education.map(edu => `
            <div class="education-card degree-card">
                <div class="degree-badge">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <h3 class="education-degree">${edu.degree}</h3>
                <div class="education-institution">${edu.institution}</div>
                <div class="education-period">${edu.period}</div>
                ${edu.description ? `<div class="education-description">${edu.description}</div>` : ''}
            </div>
        `).join('');
    }

    renderCertifications() {
        const certifications = config.get('certifications', []);
        const certificationsGrid = document.getElementById('certificationsGrid');
        
        if (!certificationsGrid) return;
        
        certificationsGrid.innerHTML = certifications.map(cert => `
            <div class="education-card certification-card">
                <div class="certification-badge">
                    <i class="fas fa-certificate"></i>
                </div>
                <h3 class="certification-name">${cert.certification}</h3>
                <div class="certification-issuer">${cert.issuer}</div>
                ${cert.category ? `<div class="certification-category"><span class="category-tag">${cert.category}</span></div>` : ''}
            </div>
        `).join('');
    }

    renderMetrics() {
        const skills = config.get('skills', {});
        const metricsGrid = document.getElementById('skillMetrics');
        
        if (!metricsGrid) return;
        
        const metrics = [
            { label: 'BACKEND', value: 90 },
            { label: 'DATA/BI', value: 85 },
            { label: 'AI/AUTOMATION', value: 80 }
        ];
        
        metricsGrid.innerHTML = metrics.map(metric => `
            <div class="metric-item">
                <div class="metric-label">${metric.label}</div>
                <div class="metric-value">${metric.value}%</div>
                <div class="metric-bar">
                    <div class="metric-fill" style="width: ${metric.value}%"></div>
                </div>
            </div>
        `).join('');
    }

    renderSocialLinks() {
        const links = config.get('links', {});
        const socialLinksContainer = document.getElementById('socialLinks');
        
        if (!socialLinksContainer) return;
        
        const socialConfig = [
            { key: 'email', icon: 'fas fa-envelope', label: 'Email' },
            { key: 'linkedin', icon: 'fab fa-linkedin', label: 'LinkedIn' },
            { key: 'github', icon: 'fab fa-github', label: 'GitHub' },
            { key: 'hackerrank', icon: 'fab fa-hackerrank', label: 'HackerRank' },
            { key: 'codechef', icon: 'fab fa-codepen', label: 'CodeChef' }
        ];
        
        socialLinksContainer.innerHTML = socialConfig
            .filter(social => links[social.key])
            .map(social => `
                <div class="social-link-wrapper">
                    <a href="${links[social.key]}" 
                       class="social-link" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       aria-label="${social.label}">
                        <i class="${social.icon}"></i>
                    </a>
                    <span class="social-link-label">${social.label}</span>
                </div>
            `).join('');
    }
    
    setupDownloadLinks() {
        const links = config.get('links', {});
        
        // LinkedIn button
        const linkedinBtn = document.getElementById('linkedinBtn');
        if (linkedinBtn && links.linkedin) {
            linkedinBtn.href = links.linkedin;
            linkedinBtn.target = '_blank';
        }
        
        // Resume button
        const resumeBtn = document.getElementById('resumeBtn');
        if (resumeBtn && links.resume) {
            resumeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.downloadResume(links.resume);
            });
        }
        
        // Update copyright
        const copyrightElement = document.getElementById('copyright');
        if (copyrightElement) {
            copyrightElement.textContent = config.get('contact.copyright', '');
        }
        
        // Update system version
        const versionElement = document.getElementById('systemVersion');
        if (versionElement) {
            versionElement.textContent = config.get('contact.version', '1.0.0');
        }
    }


    downloadResume(url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Archit_Verma_Resume.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('📄 Resume download initiated');
    }

    setupEventListeners() {
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.getElementById('navToggle');
            
            if (navMenu && navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + T to toggle theme
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                theme.toggleTheme();
            }
            
            // Escape to close mobile menu
            if (e.key === 'Escape') {
                const navMenu = document.getElementById('navMenu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Listen for theme changes
        document.addEventListener('themechange', (e) => {
            console.log(`Theme changed to: ${e.detail.theme}`);
        });
    }

    setupIntersectionObserver() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Observer for header animations (triggers earlier)
        const animationObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% is visible
                rootMargin: '-10% 0px -10% 0px' // A less aggressive margin
            }
        );
        
        // Observer for navigation updates (needs more visibility)
        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                            }
                        });
                        this.currentSection = id;
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '-100px 0px -100px 0px'
            }
        );
        
        sections.forEach(section => {
            animationObserver.observe(section);
            navObserver.observe(section);
        });
    }

    showConsoleGreeting() {
        const personal = config.get('personal', {});
        console.log('%c╔══════════════════════════════════════════════════════════╗', 'color: #3b82f6');
        console.log('%c║                                                          ║', 'color: #3b82f6');
        console.log(`%c║  ${personal.name} - Portfolio System                    ║`, 'color: #06d6a0');
        console.log('%c║  Status: ONLINE | Version: 2.0.0 | Build: Production    ║', 'color: #8b5cf6');
        console.log('%c║                                                          ║', 'color: #3b82f6');
        console.log('%c╚══════════════════════════════════════════════════════════╝', 'color: #3b82f6');
        console.log('%c🚀 Backend • BI Automation • AI Integration', 'color: #38bdf8; font-weight: bold;');
        console.log('%c🔗 All configurations loaded from config.json', 'color: #94a3b8;');
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    
    // Make app available globally for debugging
    window.portfolioApp = app;
});