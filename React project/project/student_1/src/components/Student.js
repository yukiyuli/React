import React, { useCallback, useContext, useState } from 'react';
import useFetch from '../hooks/usefetch';
import StuContext from "../store/StuContext";
import StudentForm from './StudentForm';

const Student = (props) => {
    // {stu:{name, age, gender, address}} = props
    const [isEdit, setIsEdit] = useState(false);

    const ctx = useContext(StuContext);

    const { loading, error, fetchData: delStu } = useFetch({
        url: `students/${props.stu.id}`,
        method: 'delete',

    }, ctx.fetchData);

    const deleteHandler = () => {
        // 删除学生
        // http://localhost:1337/api/students/3
        // props.stu.id
        delStu();
    };

    const cancelEdit = () => {
        setIsEdit(false);
    }

    return (
        <>
            {!isEdit &&
                <tr>
                    <td>{props.stu.attributes.name}</td>
                    <td>{props.stu.attributes.gender}</td>
                    <td>{props.stu.attributes.age}</td>
                    <td>{props.stu.attributes.address}</td>
                    <td>
                        <button onClick={deleteHandler}>Delete</button>
                        <button onClick={() => setIsEdit(true)}>Edit</button>
                    </td>
                </tr>
            }

            {isEdit && <StudentForm stu={props.stu} onCancel={cancelEdit} />}

            {loading && <tr><td colSpan={5}>Deleting...</td></tr>}
            {error && <tr><td colSpan={5}>Delete failed...</td></tr>}
        </>
    );
};

export default Student;