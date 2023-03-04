import React from 'react';
import Student from "./Student";
import './StudentList.css';
import StudentForm from "./StudentForm";

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
                    <th>Operation</th>
                </tr>
                </thead>

                <tbody>

                {props.stus.map(stu => <Student key={stu.id} stu={stu}/> )}

                </tbody>

                <tfoot>
                  <StudentForm/>   
                </tfoot>


            </table>
    );
};

export default StudentList;