import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import classes from './FilterMeals.module.css'


const FilterMeals = (props) => {

    const [keyword, setKeyword] = useState('');

    useEffect(()=>{

        // Reduce the number of data filtering and improve user experience
        // Filter after the user enters, do not filter during the user input
        // When the user stops typing for 1 second, we do the query
        // While starting a timer, it should be turned off the last time
        const timer = setTimeout(()=>{
            props.onFilter(keyword);
        }, 1000);

        // In the callback function of Effect, you can specify a function as the return value
        // This function can be called a cleanup function, it will be called before the next Effect execution
        // You can do some work in this function to clear the impact of the last Effect execution.
        return () => {
            clearTimeout(timer);
        };

    }, [keyword]);

    const inputChangeHandler = e =>{
        setKeyword(e.target.value.trim());
        // props.onFilter(keyword);
    };

    return (
        <div className={classes.FilterMeals}>
            <div className={classes.InputOuter}>
                <input
                    value={keyword}
                    onChange={inputChangeHandler}
                    className={classes.SearchInput}
                    type="text" placeholder={"Please input the keyword"} />
                <FontAwesomeIcon
                    className={classes.SearchIcon}
                    icon={faSearch} />
            </div>
        </div>
    );
};

export default FilterMeals;