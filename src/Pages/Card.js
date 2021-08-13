import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function CardItem(props) {
    const occ=props.occupation.length<=0?[1,2,3]:props.occupation;
    return <div className='carder'><Link to={()=>{
         return 'page/'+props.name}} onClick={()=>{ //setting to localstorage no need to fetch character data in character page
            localStorage.setItem('name',props.name);
            localStorage.setItem('img',props.imgsrc);
            localStorage.setItem('dob',props.birthday);
            localStorage.setItem('stat',props.status);
            localStorage.setItem('nick',props.nick);
            localStorage.setItem('port',props.portrayed);
            localStorage.setItem('app',props.apperance.join(" "));
            localStorage.setItem('occ',props.occupation.join(", "));
         }}><div className='card'  id={props.id} key={props.key}>
            <img src={props.imgsrc} />
            <table>
                <tr>
                    <td><b>Name</b></td>
                    <td>{props.name}</td>
                </tr>
                <tr>
                    <td><b>DOB</b></td>
                    <td>{props.birthday}</td>
                </tr>
                <tr>
                    <td><b>Occupation</b></td>
                    <td id='occupations'> {props.occupation.join(', ')}</td>
                </tr>
                <tr>
                    <td><b>Status</b></td>
                    <td > {props.status}</td>
                </tr>
            </table>
        </div></Link></div>
}

export default CardItem;
