import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Charpage() {
    let [char, setchar] = useState({name:'',status:'',nickname:'',portrayed:'',img:'',occupation:[],birthday:'',appearance:[1,2,3,4,5]})
    let [quotes, setQuotes] = useState([
    ])
    let loader=[0,1,2,3,4,5];
    async function apicall() {
        var str = window.location.href;
        var res = str.split("/");
        var name = res[(res.length) - 1];   //Getting the last segment of url to fetch character data
        if(!name.includes(encodeURI(localStorage.getItem('name')))){ //checking that localstorage has the data otherwise fetch the data
        await axios.get(`${process.env.REACT_APP_API_URL1}/api/characters?name=${name}`)
            .then(response => {
                setchar(response.data[0])
                setfetched(true)
            })
            .catch(error => {
                alert('data not recieved from API')
                console.log(error)
            });
        }
        else{           //getting stored items rather than fetching
            let chars=[];
            chars.img=localStorage.getItem('img')
            chars.name=localStorage.getItem('name');
            chars.birthday=localStorage.getItem('dob');
            chars.occupation=localStorage.getItem('occ');
            chars.status=localStorage.getItem('stat');
            chars.nickname=localStorage.getItem('nick');
            chars.portrayed=localStorage.getItem('port');
            chars.appearance=localStorage.getItem('app');
            setchar(chars);
        }
            await axios.get(`${process.env.REACT_APP_API_URL1}/api/quote?author=${name}`)
            .then(response => {
                setQuotes(response.data);
                setload(true)
            })
            .catch(error => {
            });
    }
    useEffect(() => {
        apicall();
    }, [])
    let  [load,setload]=useState(false)
    let [fetched,setfetched]=useState(false)
    return <div className='pager'>
            <img src={char.img} />
            <div className='largecard' ><br/>
                <div style={{width:'100%',fontSize:'30px',textAlign:'center'}}>{char.name.length!=0?char.name:!load?<div class="card__title loading"></div>:<>No Data Recorded</>}
                    </div>
            <table>
                <tr>
                    <td><b>Name</b></td>
                    <td>{char.name.length!=0?char.name:!load?<div class="card__title loading"></div>:<>No Data Recorded</>}</td>
                </tr>
                <tr>
                    <td><b>DOB</b></td>
                    <td>{char.birthday.length!=0?char.birthday:!load?<div class="card__title loading"></div>:<>No Data Recorded</>}</td>
                </tr>
                <tr>
                    <td><b>Occupation</b></td>
                    <td> {char.occupation.length!=0?!fetched?char.occupation:char.occupation.join(', '):!load?<div class="card__title loading"></div>:<>No Data Recorded</>}</td>
                </tr>
                <tr>
                    <td><b>Status</b></td>
                    <td > {char.status.length!=0?char.status:!load?<div class="card__title loading"></div>:<>No Data Recorded</>}</td>
                </tr>
                <tr>
                    <td><b>Nick Name</b></td>
                    <td > {char.nickname.length!=0?char.nickname:!load?<div class="card__title loading"></div>:<>No Data Recorded</>}</td>
                </tr>
                <tr>
                    <td><b>Portrayed</b></td>
                    <td > {char.portrayed.length!=0?char.portrayed:!load?<div class="card__title loading"></div>:<>No Data Recorded</>}</td>
                </tr>
                <tr>
                    <td><b>Appeared in Seasons</b></td>
                    <td > {(char.appearance).length != 0 ?!fetched?char.appearance:char.appearance.join(', '):!load?<div class="card__title loading"></div>: <>No Data Recorded</>}</td>
                </tr>
            </table>
                    <div className='quotes' style={{width:'100%'}}><b>Quotes</b><br/>
                    <ul style={{marginLeft:'50px',marginRight:'40px'}}>
                        {quotes.length != 0 ? quotes.map((chars, index) => (
                            <li key={index}>{chars.quote}<br /></li>)) :
                            !load ? loader.map((chars, index) => (<li key={index}><div class="card__title loading"></div><br /></li>)):
                            <>No Quotes Recorded</>
                        }
                    </ul>
                    </div>
        </div>
        </div>
}

export default Charpage;
