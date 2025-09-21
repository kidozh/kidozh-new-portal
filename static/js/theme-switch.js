// Lightweight, idempotent theme switcher helper
function _initThemeState() {
    try {
        var stored = localStorage.getItem('color-theme');
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (stored === 'dark' || (stored === null && prefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    } catch (e) {
        // ignore (e.g., disabled localStorage)
    }
}

function _bindThemeToggle() {
    if (window.__themeSwitcherBound) return; // avoid double-binding
    window.__themeSwitcherBound = true;

    var themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    themeToggleBtn.addEventListener('click', function () {
        try {
            var stored = localStorage.getItem('color-theme');
            if (stored) {
                if (stored === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
        } catch (e) {}
    });
}

function renderThemeSwitcher() {
    _initThemeState();
    _bindThemeToggle();
}

// Safe auto-init when script is loaded
if (typeof window !== 'undefined') {
    try {
        // run init synchronously if possible
        _initThemeState();
        // bind later after idle for performance
        if ('requestIdleCallback' in window) {
            requestIdleCallback(_bindThemeToggle);
        } else {
            setTimeout(_bindThemeToggle, 200);
        }
    } catch (e) {}
}

