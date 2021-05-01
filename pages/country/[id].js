//when you click on a country show information about the country here.

import React,{useState,useEffect,useContext} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/Layout.js'
import styles  from '../../styles/Country.module.css'
import formatNum from '../../functions/formatNum.js'

import TrLang from '../../public/translations/translation.json'
import {LangContext} from '../../pages/_app.js'


const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
    const country = await res.json();
    return country;
};


export default function Country ({ country })  {
    const [borders, setBorders] = useState([]);
    const { lang } = useContext(LangContext);

    const getBorders = async () => {
        const borders = await Promise.all(
            country.borders.map((border) => getCountry(border))
        );

        setBorders(borders);
    };

    useEffect(() => {
        getBorders();
    }, [country]);

    return (
        <Layout title={country.name}>
        <div className={styles.container}>
            <div className={styles.container_left}>
                <div className={styles.overview_panel}>
                    <Image src={country.flag} alt={country.name} width={700} height={500}/>
                    <h1 className={styles.overview_name}>
                        {country.translations[lang] || country.name}
                    </h1>
                    <div className={styles.overview_region}>{country.region}</div>
                    <div className={styles.overview_numbers}>
                        <div className={styles.overview_population}>
                            <div className={styles.overview_value}>
                                {formatNum(country.population)}
                            </div>
                        <div className={styles.overview_label}>
                            {TrLang["country"]["population"][lang]}
                        </div>
                    </div>
                    <div className={styles.overview_area}>
                        <div className={styles.overview_value}>
                            {formatNum(country.area)} (km
                            <sup style={{ fontSize: "0.5rem" }}> 2</sup>)
                        </div>
                        <div className={styles.overview_label}>
                            {TrLang["country"]["area"][lang]}
                        </div>
                </div>
            </div>
        </div>
        </div>

        <div className={styles.container_right}>
            <div className={styles.details_panel}>
                <h4 className={styles.details_panel_heading}>
                    {TrLang["country"]["details"][lang]}
                </h4>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>
                        {TrLang["country"]["capital"][lang]}
                    </div>
                    <div className={styles.details_panel_value}>
                        {country.capital}
                    </div>
                </div>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>
                        {TrLang["country"]["subregion"][lang]}
                    </div>
                    <div className={styles.details_panel_value}>
                        {country.subregion}
                    </div>
                </div>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>
                        {TrLang["country"]["languages"][lang]}
                    </div>
                    <div className={styles.details_panel_value}>
                        {country.languages.map(({ name }) => name).join(", ")}
                    </div>
                </div>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>
                        {TrLang["country"]["currencies"][lang]}
                    </div>
                    <div className={styles.details_panel_value}>
                        {country.currencies.map(({ name }) => name).join(", ")}
                    </div>
                </div>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>
                        {TrLang["country"]["native_name"][lang]}
                    </div>
                    <div className={styles.details_panel_value}>
                        {country.nativeName}
                    </div>
                </div>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>
                        {TrLang["country"]["gini"][lang]}
                    </div>
                    <div className={styles.details_panel_value}>
                        {country.gini} %
                    </div>
                </div>
                {!borders.length ? (
                <div className={styles.details_panel_no_borders}>
                    <div className={styles.details_panel_borders_label}>
                        {TrLang["country"]["neighbouring_countries"][lang]}
                    </div>
                    <div className={styles.details_panel_value}>
                        {TrLang["country"]["no_neighbors"][lang]}
                    </div>
                </div>
                ) : (
                <div className={styles.details_panel_borders}>
                    <div className={styles.details_panel_borders_label}>
                        {TrLang["country"]["neighbouring_countries"][lang]}
                    </div>
                    <div className={styles.details_panel_borders_container}>
                        {borders.map(({ flag, name, alpha3Code, translations }) => (
                        <Link href={`/country/${alpha3Code}`} key={name}>
                            <div className={styles.details_panel_borders_country}>
                                <Image src={flag} alt={name} width={200} height={150} />
                                <div className={styles.details_panel_name}>
                                    {translations[lang] || name}
                                </div>
                            </div>
                        </Link>
                    ))}
                    </div>
                </div>
                )}
            </div>
        </div>
    </div>
    </Layout>
    );
};


export const getStaticPaths = async () => {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const countries = await res.json();
    const paths = countries.map((country) => ({
        params: { id: country.alpha3Code },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params }) => {
    const country = await getCountry(params.id);
    return {
        props: { country },
    };
};

