// Theme management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('portfolio-theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupListeners();
        console.log(`🎨 Theme initialized: ${this.theme}`);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            icon.style.color = this.theme === 'dark' ? '#f59e0b' : '#0f172a';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        localStorage.setItem('portfolio-theme', this.theme);
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: this.theme }
        }));
        
        console.log(`🔄 Theme toggled to: ${this.theme}`);
    }

    setupListeners() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    }

    getCurrentTheme() {
        return this.theme;
    }

    setTheme(theme) {
        if (['dark', 'light'].includes(theme)) {
            this.theme = theme;
            this.applyTheme();
            localStorage.setItem('portfolio-theme', theme);
        }
    }
}

export default new ThemeManager();