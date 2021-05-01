import React,{useState,useContext} from 'react';
import Layout from '../components/Layout.js'

import styles from '../styles/Home.module.css'
import SearchBar from '../components/SearchBar.js'
import TableOfNations from '../components/TableOfNations.js'


import { ShuffleRounded } from '@material-ui/icons'
import TrLang from '../public/translations/translation.json'
import {LangContext} from './_app.js'

export default function Home({countries}) {

  const [keyword, setKeyword] = useState("")
  const { lang } = useContext(LangContext)

  const filteredNations = countries.filter(country =>
    country.name.toLowerCase().includes(keyword) ||
    country.region.toLowerCase().includes(keyword) ||
    country.subregion.toLowerCase().includes(keyword)
)

  const onInputChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }
  
  const randomCountry = () => {
    const random = Math.floor(Math.random() * filteredCountry.length) + 1

    return router.push(`/country/${countries[random].alpha3Code}`)
  }

  return (
    <Layout>
      <div className={styles.inputContainer}>
      <div className={styles.counts}>
        <div> {TrLang['found_countries']['1'][lang]} {countries.length}  {TrLang['found_countries']['2'][lang]}</div>

        <button className={styles.shufflebutton} title={TrLang['random_country'][lang]} onClick={randomCountry} >
            <ShuffleRounded color='inherit' style={{ fontSize: '1.5rem' }}/>
        </button>
    </div>

    <div className={styles.input}>
        <SearchBar  onChange={onInputChange} placeholder={TrLang['filter'][lang]}/>
    </div>
  </div>

  < TableOfNations countries={filteredNations} />
</Layout>
  )
}
export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all")
  const countries = await res.json()

  return {
      props: {
          countries
      }
  }
}