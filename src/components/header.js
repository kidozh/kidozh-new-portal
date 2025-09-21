import * as React from "react"
import { Link } from "gatsby"
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next'
import LangSwitch from './lang-switch'
import { useLocation } from '@reach/router'
import { useEffect, useState } from 'react'

const Header = ({ siteTitle }) => {
  const { t } = useTranslation()
  const { language } = useI18next()
  const loc = useLocation()
  const pathname = (typeof window !== 'undefined' && loc && loc.pathname) ? loc.pathname : '/'

  const isActive = (to) => {
    // Normalize with language prefix (ensure leading slash, no trailing slash)
    const raw = to.startsWith('/') ? to : `/${to}`
    const normalized = raw.replace(/\/+$|\/$/, '') || '/'

    // Special-case root: don't use startsWith('/') because every path starts with '/'
    if (normalized === '/') {
      if (language && language !== 'en') {
        const prefRoot = `/${language}`
        return pathname === '/' || pathname === prefRoot || pathname === `${prefRoot}/`
      }
      return pathname === '/'
    }

    // For non-root paths, consider exact match or sub-paths
    if (language && language !== 'en') {
      const prefixed = `/${language}${normalized}`
      if (pathname === prefixed || pathname === `${prefixed}/` || pathname.startsWith(`${prefixed}/`)) return true
    }
    if (pathname === normalized || pathname === `${normalized}/` || pathname.startsWith(`${normalized}/`)) return true
    return false
  }

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    try {
      const stored = localStorage.getItem('color-theme')
      if (stored) return stored
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch (e) {
      return 'light'
    }
  })

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
      }
    } catch (e) {}
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
  <header>

    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-(--breakpoint-xl) flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{siteTitle}</span>
        </Link>

        <div className="flex items-center md:order-2">
          <button type="button" id="theme-toggle" onClick={toggleTheme}
          className="inline-flex items-center
           font-medium justify-center px-4 py-2 
           text-sm text-gray-900 dark:text-white 
           rounded-lg cursor-pointer hover:bg-gray-100
            dark:hover:bg-gray-700 dark:hover:text-white" aria-label="Toggle theme">
            {/* light icon visible in light mode, dark icon in dark mode; controlled by React state for immediate response */}
            <svg className={`${theme === 'dark' ? 'hidden' : 'inline'} w-5 h-5`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
            <svg className={`${theme === 'dark' ? 'inline' : 'hidden'} w-5 h-5`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
          </button>
          <LangSwitch />
            <button data-collapse-toggle="navbar-default" type="button"
           className="inline-flex items-center p-2 ml-3 text-sm text-gray-500
            rounded-lg md:hidden hover:bg-gray-100 focus:outline-hidden focus:ring-2
             focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700
              dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">{t('nav.openMenu')}</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-default">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              {/* <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link> */}
              <Link to="/" className={`block py-2 pl-3 pr-4 rounded-sm md:p-0 ${isActive('/') ? 'text-white bg-blue-600 md:bg-transparent md:text-blue-700 dark:text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}>{t('nav.home')}</Link>
            </li>
            <li>
              <Link to="/resume/" className={`block py-2 pl-3 pr-4 rounded-sm md:p-0 ${isActive('/resume') ? 'text-white bg-blue-600 md:bg-transparent md:text-blue-700 dark:text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}>{t('nav.cv')}</Link>
            </li>
            <li>
              <Link to="/project/" className={`block py-2 pl-3 pr-4 rounded-sm md:p-0 ${isActive('/project') ? 'text-white bg-blue-600 md:bg-transparent md:text-blue-700 dark:text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}>{t('nav.projects')}</Link>
            </li>
            <li>
              <Link to="/update/" className={`block py-2 pl-3 pr-4 rounded-sm md:p-0 ${isActive('/update') ? 'text-white bg-blue-600 md:bg-transparent md:text-blue-700 dark:text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}>{t('nav.updates')}</Link>
            </li>
            <li>
              <Link to="/contact/" className={`block py-2 pl-3 pr-4 rounded-sm md:p-0 ${isActive('/contact') ? 'text-white bg-blue-600 md:bg-transparent md:text-blue-700 dark:text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}>{t('nav.contact')}</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {/* Theme switcher is loaded and invoked from Layout via Script tags */}


  </header>
  )
}

export default Header
