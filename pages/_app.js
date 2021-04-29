import React,{useState,useEffect,useCallback,useMemo} from 'react'
import '../styles/globals.css'


export const LangContext = React.createContext({
  language: 'en',
  switchLanguage:() =>{}
});

function MyApp({ Component, pageProps }) {
  const [language,setlanguage] = useState("en")

  const switchLanguage = useCallback(function(){
    setlanguage((l)=>(l ==="en"? "jp":"en"))
  },[])


  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    function () {
      return {
        language,
        switchLanguage,
      };
    },
    [language, switchLanguage]
  );

  return(
    <LangContext.Provider value={value}>
      <Component {...pageProps} />
    </LangContext.Provider>
  ) 


}

export default MyApp
