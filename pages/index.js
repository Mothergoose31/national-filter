import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/router'
import Layout from '../components/Layout.jsx'

import styles from '../styles/Home.module.css'
import SearchBar from '../components/SearchBar.jsx'
import TableOfNations from '../components/TableOfNations.jsx'


import { ShuffleRounded } from '@material-ui/icons'

export default function Home({countries}) {

  const [keyword, setKeyword] = useState("")

  const filteredNations = countries.filter(country =>
    country.name.toLowerCase().includes(keyword) ||
    country.region.toLowerCase().includes(keyword) ||
    country.subregion.toLowerCase().includes(keyword)
)
console.log(filteredNations + " filtered")
  const onInputChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
}
  return (
    <Layout>
      <div className={styles.inputContainer}>
      <div className={styles.counts}>
        <div> {countries.length} </div>

        <button className={styles.shufflebutton}  >
            <ShuffleRounded color='inherit' style={{ fontSize: '1.5rem' }}/>
        </button>
    </div>

    <div className={styles.input}>
        <SearchBar  onChange={onInputChange} />
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