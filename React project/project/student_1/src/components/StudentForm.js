import React, { useState, useCallback, useContext } from 'react';
import useFetch from '../hooks/usefetch';
import StuContext from '../store/StuContext';
import './StudentForm.css';


const StudentForm = (props) => {
    const [inputData, setInputData] = useState({
        name: props.stu ? props.stu.attributes.name : '',
        age: props.stu ? props.stu.attributes.age : '',
        gender: props.stu ? props.stu.attributes.gender : '',
        address: props.stu ? props.stu.attributes.address : ''
    });


    const ctx = useContext(StuContext);

    // 把add, udpate合在一起
    const { loading, error, fetchData: updateStudent } = useFetch({
        // 如果prop.stu有数据，说明是休息，如果没有数据是添加
        url: props.stu ? `students/${props.stu.id}` : 'students',
        method: props.stu ? 'put' : 'post',
        // body: inputData, body传的位置变了，在调用的时候传数据

    }, ctx.fetchData);


    const nameChangeHandler = (e) => {
        setInputData(prevState => ({ ...prevState, name: e.target.value }));
    };

    const ageChangeHandler = (e) => {
        setInputData(prevState => ({ ...prevState, age: +e.target.value }));
    };

    const genderChangeHandler = (e) => {
        setInputData(prevState => ({ ...prevState, gender: e.target.value }));
    };

    const addressChangeHandler = (e) => {
        setInputData(prevState => ({ ...prevState, address: e.target.value }));
    };

    const sumbmitHandler = () => {
        updateStudent(inputData);
    }

    const updateHandler = () => {
        updateStudent(inputData)
    }

    return (
        <>
            <tr className="student-form">
                <td><input
                    onChange={nameChangeHandler}
                    value={inputData.name}
                    type="text" /></td>
                <td>
                    <select
                        onChange={genderChangeHandler}
                        value={inputData.gender}
                    >
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </td>
                <td><input
                    onChange={ageChangeHandler}
                    value={inputData.age}
                    type="text" /></td>
                <td><input
                    onChange={addressChangeHandler}
                    value={inputData.address}
                    type="text" /></td>
                <td>

                    {/* 根据表格里有没有数据，显示不同的按钮 */}
                    {props.stu && <>

                        <button onClick={() => props.onCancel()}>Cancel</button>
                        <button onClick={updateHandler}>Confirm</button>

                    </>}
                    {!props.stu &&
                        <button onClick={sumbmitHandler}>Add</button>}
                </td>

            </tr>
            {loading && <tr><td colSpan={5}>Adding...</td></tr>}
            {error && <tr><td colSpan={5}>Add failed...</td></tr>}

        </>
    )
}

export default StudentForm
