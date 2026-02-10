// Configuration loader for portfolio
class Config {
    constructor() {
        this.config = null;
        this.init();
    }

    async init() {
        try {
            const response = await fetch('config/config.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            this.config = await response.json();
            console.log('✅ Configuration loaded successfully');
            this.validateConfig();
        } catch (error) {
            console.error('❌ Failed to load configuration:', error);
            this.loadFallbackConfig();
        }
    }

    validateConfig() {
        const required = ['personal', 'links', 'experience', 'projects', 'skills'];
        const missing = required.filter(section => !this.config[section]);
        
        if (missing.length > 0) {
            console.warn(`⚠️ Missing sections in config: ${missing.join(', ')}`);
        }
    }

    loadFallbackConfig() {
        this.config = {
            site: {
                title: "Archit Verma | Backend • BI Automation • AI Engineer",
                description: "Software / BI Automation Engineer with 2+ years experience",
                author: "Archit Verma"
            },
            personal: {
                name: "Archit Verma",
                role: "Backend / BI Automation / AI Engineer",
                location: "India",
                email: "archit.verma@example.com"
            },
            links: {
                linkedin: "#",
                github: "#",
                portfolio: "#",
                resume: "assets/docs/resume.pdf"
            },
            experience: [],
            projects: [],
            skills: {},
            contact: {
                copyright: "© 2024 Archit Verma. All rights reserved.",
                version: "1.0.0"
            }
        };
        console.warn('⚠️ Using fallback configuration');
    }

    get(key, defaultValue = null) {
        return key.split('.').reduce((obj, k) => obj && obj[k], this.config) || defaultValue;
    }

    update(key, value) {
        const keys = key.split('.');
        let obj = this.config;
        
        for (let i = 0; i < keys.length - 1; i++) {
            if (!obj[keys[i]]) {
                obj[keys[i]] = {};
            }
            obj = obj[keys[i]];
        }
        
        obj[keys[keys.length - 1]] = value;
        console.log(`📝 Config updated: ${key} = ${JSON.stringify(value)}`);
    }

    save() {
        try {
            const data = JSON.stringify(this.config, null, 2);
            localStorage.setItem('portfolio_config', data);
            console.log('💾 Configuration saved to localStorage');
        } catch (error) {
            console.error('❌ Failed to save configuration:', error);
        }
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem('portfolio_config');
            if (data) {
                this.config = JSON.parse(data);
                console.log('📂 Configuration loaded from localStorage');
            }
        } catch (error) {
            console.error('❌ Failed to load configuration from storage:', error);
        }
    }
}

export default new Config();