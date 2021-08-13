import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route ,Link } from 'react-router-dom';
// import Home from './Pages/Home'
import CardItem from './Pages/Card';                                      //card for home page
import Charpage from './Pages/Charpage'                               //single character page
function App() {
  let [count, setcount] = useState([]);                               //page no count
  let [result,setResult]=useState('')                                 //display text when filter called
  let [dummycharcters2, setDum] = useState([{ name: '', status: '', nickname: '', birthday: '', portrayed: '', img: '', occupation: [], appearance: [1, 2, 3, 4, 5] }]);
  let [characters, setCharacters] = useState([{ name: '', status: '', nickname: '', birthday: '', portrayed: '', img: '', occupation: [], appearance: [1, 2, 3, 4, 5] }]);  //initialization of character to overcome error in before fetching data
  
   //pre-call function to fetch data
  async function apicall() {                                     
    if (characters[0].img == '')                                  //overcome refreshing data again and again while switching pages
      await axios.get(`${process.env.REACT_APP_API_URL1}/api/characters`)               //api fetch data
        .then(response => {
          setCharacters(response.data.slice(0,10) )     //visibility data upto 10
          let dummycount = [];
          for (let i = 0; i < response.data.length / 10; i++) {
            dummycount.push(i)
          }
          setcount(dummycount);
          setDum(response.data)
        })
        .catch(error => {
          alert('data not recieved from API')
        });
    else
      console.log('notloaded');
  }
  useEffect(() => { //restricts the function call loop
    apicall();
  }, [])
  
  
  //Home page
  function Home() { 
    let dummycharcters = characters;
    function changePage(index) {
      dummycharcters = dummycharcters2.slice((index * 10), (index * 10) + 10)         //slicing characters from index to index+10 
      setCharacters(dummycharcters);
      window.scroll(0, 0)
    }
    function filter(){
      window.scroll(0, 0)
      var values =[];
      document.getElementsByClassName('page')[0].style.display='none';        //to make page no.s invisible 
        var checkboxes = document.getElementsByClassName('inp');              //get checked filters
        for (var checkbox of checkboxes) {
            if (checkbox.checked) {
                values.push(checkbox.name);
            }
        }
        console.log(values.join(' '));                                    //malking checked as a single string
        if(values.length<=0){
          setResult('Please Select atleast One Option');  
        }
        else{
        setResult('Seasons and Status filter Results For '+values.join(', '));                      
        let result = dummycharcters2.map((char, index)=> {
          for (let i=0;i<char.appearance.length;i++)
             if(values.join(' ').includes(char.appearance[i]))
             return char
             else if(values.join(' ').includes(char.status))
             return char
        });                                                                   //filtering
        result = result.filter(function( element ) {                          //removing undefined
          return element !== undefined;
       });
        setCharacters(result)                         //updating characters
      }
    }
    function search(){
      let element=document.getElementById('search').value;
      console.log(element)
      if(element.length==0)
      setResult('Please Enter a Name');
      else{
        let result = dummycharcters2.map((char, index)=> {
          if(char.name.toUpperCase().includes(element.toUpperCase()))
          return char
        });                                                              //filtering
        console.log(result)
        result = result.filter(function( element ) {                          //removing undefined
          return element !== undefined;
       });
          if(result.length==0){
          setResult('No results Found');
        }
          else{
          setResult('Searches For '+element);
        setCharacters(result)    }
      }
    }
    return <div className='app'>
      <div className='filtergap'>
      <div className='filterblock'>
                <div id='closefilter'><i onClick={()=>document.getElementsByClassName('filterblock')[0].style.display='none'} class="fas fa-times"></i></div>
        <h2>Filter :</h2><br/>
        <b>Status :</b><br/><br/>
        <input className='inp' type="checkbox" name='Alive'></input>&ensp;Alive<br/>
        <input className='inp' type="checkbox" name='Deceased'></input>&ensp;Deceased<br/>
        <br/><br/><b>Appeared in:</b> <br/><br/>
        <input className='inp' type="checkbox" name='1'></input>&ensp;Season 1<br/>
        <input className='inp' type="checkbox" name='2'></input>&ensp;Season 2<br/>
        <input className='inp' type="checkbox" name='3'></input>&ensp;Season 3<br/>
        <input className='inp' type="checkbox" name='4'></input>&ensp;Season 4<br/>
        <input className='inp' type="checkbox" name='5'></input>&ensp;Season 5<br/>
        <div className='filterbutton' onClick={filter}>Filter</div>
      </div>
      </div>
      <div>
        <div className='searchfeild' style={{width:'100%',height:'30px',marginTop:'10px'}}>
        <input type="text" id="search" name="search"/>
        <div className='searchbutton' onClick={search}>Search</div>
        <div className='searchbutton' onClick={()=>{changePage(0);setResult('')}}>Reload</div>
        </div><br/>
        <div className='filter' style={{width:'100%',height:'30px'}}>{result}</div>
        {characters.map((char, index) => (
          <CardItem                                     //card items in a loop
            key={index}
            id={index}
            imgsrc={char.img}
            name={char.name}
            occupation={char.occupation}
            birthday={char.birthday}
            status={char.status}
            nick={char.nickname}
            portrayed={char.portrayed}
            apperance={char.appearance}
            char_id={char.char_id}
          />))}
          <div onClick={()=>document.getElementsByClassName('filterblock')[0].style.display='block'} className='filtershow'>Show Filter</div>
        <div className='page' style={{display:result!=''?'none':'block'}}>{count.map((char, index) => (
          <p onClick={() => changePage(index)}>{index + 1}</p>
        ))}</div>
      </div>
    </div>
  }
  const Tohome=()=>{
    return <div className='nav'>
      <Link to='/'>Home</Link>
    </div>
  }
  return <div className='main'>
    <Router>
      <Tohome/>
      <Switch>      {/*switching from one page to another*/}
        <Route path='/' exact component={Home} />
        <Route exact path='/page/:char' component={Charpage} />
      </Switch>
    </Router>
  </div>
}

export default App;
