import React from 'react';
import Student from "./Student";
import './StudentList.css';

const StudentList = (props) => {
    return (
            <table>
                <caption>Student List</caption>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Address</th>
                </tr>
                </thead>

                <tbody>

                {props.stus.map(stu => <Student key={stu.id} stu={stu.attributes}/> )}

                </tbody>


            </table>
    );
};

export default StudentList;