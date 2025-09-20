/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it

import './src/styles/global.css'
import 'flowbite'

export const onRouteUpdate = ({ location, prevLocation }) => {
    // set initial theme class
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark')
    }

    var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Change the icons inside the button based on previous settings (guarded)
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        if (themeToggleLightIcon && themeToggleLightIcon.classList) themeToggleLightIcon.classList.remove('hidden');
    } else {
        if (themeToggleDarkIcon && themeToggleDarkIcon.classList) themeToggleDarkIcon.classList.remove('hidden');
    }

    var themeToggleBtn = document.getElementById('theme-toggle');

    if (themeToggleBtn && themeToggleBtn.addEventListener) {
      themeToggleBtn.addEventListener('click', function () {

        // toggle icons inside button (guarded)
        if (themeToggleDarkIcon && themeToggleDarkIcon.classList) themeToggleDarkIcon.classList.toggle('hidden');
        if (themeToggleLightIcon && themeToggleLightIcon.classList) themeToggleLightIcon.classList.toggle('hidden');

        // if set via local storage previously
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }

            // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }

      });
    }
}
