import React, { useContext, useState, useEffect, useCallback } from 'react'
import Head from "next/head"
import styles from "../styles/Layout.module.css"
import Link from "next/link"
import{Brightness6Rounded,LanguageRounded} from  '@material-ui/icons'

import { LangContext } from '../pages/_app.js'

import TrLang from '../public/translations/translation.json'




export default function Layout({children,title = "National-Filter"}) {
    const [theme, setTheme] = useState('light')
    const { lang, switchLanguage } = useContext(LangContext)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'))
        if (localStorage.getItem('theme')) {
            setTheme(localStorage.getItem('theme'))
        } else {
            localStorage.setItem('theme', theme)
        }
    }, [])

    const switchTheme = () => {
        if (theme === 'light') {
            saveTheme('dark')
        } else {
            saveTheme('light')
        }
    }

    const saveTheme = (theme) => {
        setTheme(theme)
        localStorage.setItem("theme", theme)
        document.documentElement.setAttribute('data-theme', theme)
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                
                <meta charSet="UTF-8"/>
                <meta name="theme-color" content="#252329" />
                <meta name="description" content="   rank countries  by gini index,  population  and other factors"/>
                <meta name="keywords" content="rank, country, infos, stats"/>
                
            </Head>
            <header className={styles.header}>
                <Link href='/'>
                    <>
                    <svg  x="0px" y="0px" width="278px" height="311.27px" viewBox="0 0 278 311.27" xmlns="http://www.w3.org/2000/svg" >
                        
	                    
                    <defs>
                    </defs>
                        <g>
                        	<rect x="151.23" y="26.17" width="43.08" height="235.55"/>
                        	<path d="M194.04,26.45v235h-42.53v-235H194.04 M194.59,25.9h-43.63V262h43.63V25.9L194.59,25.9z"/>
                        </g>
                        <g>
                        	<rect x="14.14" y="108.5" width="43.19" height="153.24"/>
                        	<path d="M57.11,108.72v152.8H14.36v-152.8H57.11 M57.55,108.27H13.92v153.68h43.63V108.27L57.55,108.27z"/>
                        </g>
                        <g>
                        	<rect x="77.63" class="st0" width="48.82" height="261.96"/>
                        </g>
                        <g>
                        	<rect x="218.29" y="77.66" class="st0" width="43.63" height="184.39"/>
                        </g>
                        <g>
                        	<rect x="0.32" y="275.59" width="277.37" height="35.37"/>
                        	<path d="M277.37,275.91v34.73H0.63v-34.73H277.37 M278,275.27H0v36h278V275.27L278,275.27z"/>
                        </g>
                    </svg>
                    <h1 className={styles.title}>National-Filter</h1>
                    </>
                </Link>

                <button className={styles.theme_switcher} onClick={switchTheme} title ={TrLang['switch_theme'][lang]} >
                    <Brightness6Rounded style={{ fontSize: '1.5rem' }}/>
                </button>

            <button className={styles.language_switcher} onClick={switchLanguage} title ={TrLang['switch_language'][lang]}>
                <LanguageRounded style={{ fontSize: '1.5rem' }}/>
            </button>

            </header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}> </footer>
        </div>
    )
}
