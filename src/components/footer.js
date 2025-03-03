import { Link } from "gatsby";
import * as React from "react"

const Footer = () => (

    <footer className="bg-white p-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-(--breakpoint-xl) p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2014 - {new Date().getFullYear()} <Link to="https://kidozh.com/" class="hover:underline">kidozh</Link>. All Rights Reserved.
            </span>
            
            {/* <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <Link to="/contact" class="hover:underline">Contact</Link>
                </li>
            </ul> */}
        </div>
    </footer>

);

export default Footer;