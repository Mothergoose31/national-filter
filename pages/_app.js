import React,{useState,useEffect,useCallback,useMemo} from 'react'
import '../styles/globals.css'


export const LangContext = React.createContext({
  lang: 'en',
  switchLanguage:() =>{}
});

function MyApp({ Component, pageProps }) {
  const [lang,setlanguage] = useState("en")

  const switchLanguage = useCallback(function(){
    setlanguage((l)=>(l ==="en"? "ja":"en"))
  },[])


  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    function () {
      return {
        lang,
        switchLanguage,
      };
    },
    [lang, switchLanguage]
  );

  return(
    <LangContext.Provider value={value}>
      <Component {...pageProps} />
    </LangContext.Provider>
  ) 


}

export default MyApp
