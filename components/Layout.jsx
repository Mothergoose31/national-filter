import React, { useContext, useState, useEffect, useCallback } from 'react'
import Head from "next/head"
import styles from "../styles/Layout.module.css"
import Link from "next/link"

export default function Layout({children,title = "National-Filter"}) {
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

            </header>
        </div>
    )
}
