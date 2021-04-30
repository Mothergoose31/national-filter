import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/router'
import Layout from '../components/Layout.jsx'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({countries}) {
  return (
    <Layout>
      <div className={styles.inputContainer}>

      </div>
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