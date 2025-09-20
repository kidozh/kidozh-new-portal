import React from 'react'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next'

const LangSwitch = () => {
  const { i18n } = useTranslation()
  const { languages, originalPath, language: currentLanguage, changeLanguage, navigate } = useI18next()
  const current = currentLanguage || (i18n && i18n.language) || 'en'

  return (
    <div className="ml-4 inline-flex items-center">
      {languages.map((lng) => {
        const label = lng === 'zh' ? '中' : lng.toUpperCase()
        return (
        <button
          key={lng}
          onClick={() => {
            if (changeLanguage) changeLanguage(lng)
            if (navigate && originalPath) navigate(originalPath, { language: lng })
          }}
          aria-current={lng === current ? 'true' : 'false'}
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
