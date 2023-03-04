import React, {useState} from 'react';
import './StudentForm.css';


const StudentForm = () => {
    const [inputData, setInputData]=useState({
        name:'',
        age:'',
        gender:'',
        address:''
    });

    const nameChangeHandler = (e)=>{
        setInputData(prevState =>({...prevState, name:e.target.value}));
    };

    const ageChangeHandler = (e)=>{
        setInputData(prevState =>({...prevState, age:e.target.value}));
    };

    const genderChangeHandler = (e)=>{
        setInputData(prevState =>({...prevState, gender:e.target.value}));
    };

    const addressChangeHandler = (e)=>{
        setInputData(prevState =>({...prevState, address:e.target.value}));
    };

    const sumbmitHandler=()=>{
        console.log(inputData);
    }

  return (
    <tr className="student-form">
        <td><input 
            onChange={nameChangeHandler}
            value={inputData.name}
            type="text"/></td>
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
            type="text"/></td>
        <td><input 
            onChange={addressChangeHandler}
            value={inputData.address}
            type="text"/></td>
        <td><button onClick={sumbmitHandler}>Add</button></td>

    </tr>
  )
}

export default StudentForm
