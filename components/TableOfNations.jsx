import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from  '../styles/TableOfNations.module.css'

const orderBy = (countries, value, direction) => {
    if (direction === 'asc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1)
    }

    if (direction === 'desc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1)
    }

    return countries
}
export default function TableOfNations({countries}) {
    const [oder,setOrder] =useState()
    const [value,setValue] = useState()
    const orderedNation = orderBy(countries, value, direction)

    const reverseOrder = () => {
        if (!direction) {
            setOrder('desc')
        } else if (direction === 'desc') {
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
            
        <div style={styles.heading}>
            <div className={styles.heading_flag}></div>
            <button className={styles.heading_name} onClick={() => setValueAndOder('name')}>
                <div>{l10n['sort']['name'][lang]}</div>
                {value === 'name' && <SortArrow direction={direction} />}
            </button>

            <button className={styles.heading_population} onClick={() => setValueAndOder('population')}>
                <div>{l10n['sort']['population'][lang]}</div>
                {value === 'population' && <SortArrow direction={direction} />}
            </button>

            <button className={styles.heading_area} onClick={() => setValueAndOder('area')}>
                <div>{l10n['sort']['area'][lang]} (km<sup style={{ fontSize: "0.5rem" }}> 2</sup>)</div>
                {value === 'area' && <SortArrow direction={direction} />}
            </button>

            <button className={styles.heading_gini} onClick={() => setValueAndOder('gini')}>
                <div>{l10n['sort']['gini'][lang]}</div>
                {value === 'gini' && <SortArrow direction={direction} />}
            </button>
        </div>
        {orderedNation.map((country)=>{
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
            })}
        </div>
    )
}
