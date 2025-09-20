import { Link } from "gatsby";
import * as React from "react"
import { useTranslation } from 'gatsby-plugin-react-i18next'

const Footer = () => {
    const { t } = useTranslation()
    return (
    <footer className="bg-white p-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-(--breakpoint-xl) p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2014 - {new Date().getFullYear()} <Link to="https://kidozh.com/" class="hover:underline">kidozh</Link>. {t('footer.allRightsReserved')}
            </span>
        </div>
    </footer>
    )
}

export default Footer;