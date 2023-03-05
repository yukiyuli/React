import React, { useState, useCallback, useContext } from 'react';
import StuContext from '../store/StuContext';
import './StudentForm.css';


const StudentForm = (props) => {
    const [inputData, setInputData] = useState({
        name: props.stu ? props.stu.attributes.name : '',
        age: props.stu ? props.stu.attributes.age : '',
        gender: props.stu ? props.stu.attributes.gender : '',
        address: props.stu ? props.stu.attributes.address : ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const ctx = useContext(StuContext);


    // add student function
    const addStudent = useCallback(async (newStu) => {

        try {
            setLoading(true);
            setError(null);

            const res = await fetch('http://localhost:1337/api/students', {
                method: 'post',
                body: JSON.stringify({ data: newStu }),
                headers: { "Content-type": "application/json" }
            });

            if (!res.ok) {
                throw new Error('Add failed')
            }

            // add successfully then refresh
            ctx.fetchData();

        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }

    }, []);

    const updateStudent = useCallback(async (id, newStu) => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`http://localhost:1337/api/students/${id}`, {
                method: 'put',
                body: JSON.stringify({ data: newStu }),
                headers: { "Content-type": "application/json" }
            });

            if (!res.ok) {
                throw new Error('Edit failed')
            }

            // add successfully then refresh
            ctx.fetchData();

        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }

    }, []);


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
        addStudent(inputData);
    }

    const updateHandler = () => {
        updateStudent(props.stu.id, inputData)
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
