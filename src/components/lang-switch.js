import React from 'react'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next'

const LangSwitch = () => {
  const { i18n } = useTranslation()
  const { languages, originalPath, language: currentLanguage, changeLanguage, navigate } = useI18next()
  const current = currentLanguage || (i18n && i18n.language) || 'en'

  // Enable inline client-side language switch (no navigation, URL unchanged).
  // Pros: instant UI update for strings managed by react-i18next.
  // Cons: page-level GraphQL data that depends on language won't be re-fetched,
  // and SEO/URL will not reflect language change. Set to false to retain navigation behavior.
  const INLINE_SWITCH = true

  return (
    <div className="ml-4 inline-flex items-center">
      {languages.map((lng) => {
        const label = lng === 'zh' ? '中' : lng.toUpperCase()
        return (
        <button
          key={lng}
          onClick={async () => {
            if (INLINE_SWITCH) {
              // Only change translations in-place; do not navigate. Update URL using history.pushState
              if (changeLanguage) await changeLanguage(lng)
              try {
                if (i18n && i18n.changeLanguage) i18n.changeLanguage(lng)
              } catch (e) {
                // ignore
              }

              // Update the URL to reflect language without triggering navigation
              if (typeof window !== 'undefined') {
                try {
                  const url = new URL(window.location.href)
                  const p = url.pathname
                  // remove existing language prefix if present
                  const parts = p.split('/').filter(Boolean)
                  if (parts.length > 0 && languages.includes(parts[0])) parts.shift()
                  // add selected language as prefix unless it's default 'en'
                  const newParts = (lng === 'en') ? parts : [lng, ...parts]
                  const newPath = '/' + newParts.join('/') + (url.search || '') + (url.hash || '')
                  window.history.pushState({}, '', newPath)
                } catch (e) {
                  // ignore pushState errors
                }
              }

              return
            }

            // Default: navigation-based change with prefetch
            try {
              if (changeLanguage) await changeLanguage(lng)

              if (navigate && originalPath) {
                let localizedPath = originalPath
                if (!originalPath.startsWith(`/${lng}`)) {
                  localizedPath = `/${lng}${originalPath}`
                }

                try {
                  if (typeof window !== 'undefined' && window.___loader && window.___loader.enqueue) {
                    window.___loader.enqueue([localizedPath])
                  }
                } catch (e) {
                  /* ignore prefetch errors */
                }

                navigate(localizedPath)
              }
            } catch (e) {
              if (changeLanguage) changeLanguage(lng)
              if (navigate && originalPath) navigate(originalPath, { language: lng })
            }
          }}
          aria-current={lng === current ? 'true' : 'false'}
          data-lang={lng}
          className={`px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-offset-2
            ${lng === current ? 'font-semibold bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
            transition-colors duration-150 mx-1`}
          title={label}
        >
          {label}
        </button>
      )})}
    </div>
  )
}

export default LangSwitch
