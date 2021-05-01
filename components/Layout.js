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
                    <h1 className={styles.title}>National-Filter</h1>
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
