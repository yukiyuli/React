import React, { useCallback, useEffect, useState } from 'react';
import StudentList from "./components/StudentList";
import './App.css';
import StuContext from "./store/StuContext";
import useFetch from './hooks/usefetch';


const App = () => {

    const { data: stuData, loading, error, fetchData } = useFetch({
        url: 'students'
    });


    // 组件重新加载
    useEffect(() => {
        fetchData();
    }, []);

    // 点击按钮
    const loadDataHandler = () => {
        fetchData();
    };

    return (
        <StuContext.Provider value={{ fetchData }}>
            <div className="app">
                <button onClick={loadDataHandler}>Load data</button>
                {(!loading && !error) && <StudentList stus={stuData} />}
                {loading && <p>Loading...</p>}
                {error && <p>Loading error！</p>}
            </div>
        </StuContext.Provider>
    );
};

export default App;
