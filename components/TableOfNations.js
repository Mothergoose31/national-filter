import React,{useState,useContext} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from  '../styles/TableOfNations.module.css'
import formatNumber from '../functions/formatNum.js'
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons'
import TrLang from '../public/translations/translation.json'
import {LangContext} from '../pages/_app.js'


const orderBy = (countries, value, order) => {
    if (order === 'asc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1)
    }

    if (order === 'desc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1)
    }

    return countries
}


const SortArrow = ({ order }) => {
    if (!order) return <></>

    if (order === 'desc') {
        return <div className={styles.heading_arrow}>
            <KeyboardArrowDownRounded color='inherit' />
        </div>
    } else {
        return <div className={styles.heading_arrow}>
            <KeyboardArrowUpRounded color='inherit' />
        </div>
    }
}

export default function TableOfNations({countries}) {
   
    const [order,setOrder] =useState()
    const [value,setValue] = useState()
    const { lang } = useContext(LangContext)
    const orderedNations = orderBy(countries, value, order)

    const reverseOrder = () => {
        if (!order) {
            setOrder('desc')
        } else if (order === 'desc') {
            setOrder('asc')
        } else {
            setOrder(null)
        }
    }

    const setValueAndOder = (value) => {
        reverseOrder();
        setValue(value)
    }

    return (
        <div>
             <div className={styles.heading}>

<div className={styles.heading_flag}></div>
<button className={styles.heading_name} onClick={() => setValueAndOder('name')}>
    <div>{TrLang['sort']['name'][lang]}</div>
    {value === 'name' && <SortArrow direction={order} />}
</button>

<button className={styles.heading_population} onClick={() => setValueAndOder('population')}>
    <div>{TrLang['sort']['population'][lang]}</div>
    {value === 'population' && <SortArrow direction={order} />}
</button>

<button className={styles.heading_area} onClick={() => setValueAndOder('area')}>
    <div>{TrLang['sort']['area'][lang]} (km<sup style={{ fontSize: "0.5rem" }}> 2</sup>)</div>
    {value === 'area' && <SortArrow direction={order} />}
</button>

<button className={styles.heading_gini} onClick={() => setValueAndOder('gini')}>
    <div>{TrLang['sort']['gini'][lang]}</div>
    {value === 'gini' && <SortArrow direction={order} />}
</button>
</div>

{orderedNations.map((country) =>
<Link href={`/country/${country.alpha3Code}`} key={country.name}>
    <div className={styles.row}>
        <div className={styles.flag}>
            <Image src={country.flag} alt={country.name} width={60} height={40}/>
        </div>
        <div className={styles.name}>{country.translations[lang] || country.name }</div>

        <div className={styles.population}>{formatNumber(country.population)}</div>

        <div className={styles.area}>{formatNumber(country.area) || 0}</div>

        <div className={styles.gini}>{country.gini || 0} %</div>
    </div>
</Link>
)}
</div>
    )
}
