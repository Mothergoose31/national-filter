import RoundedSearchBar from '@material-ui/icons/SearchRounded'
import styles from '../styles/SearchBar.module.css'
export default function Searchbar({...rest}) {
    return (
        <div className={styles.wrapper}>
            <RoundedSearchBar color ="inherit" style={{ fontSize: '1.5rem', width: 24 }}/>
            <input className={styles.input} {...rest}/>
            
        </div>
    )
}
