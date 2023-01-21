import './App.css';
import { useState } from 'react';
function App() {
  
  const [api,setApi] = useState([])
  const [render, setRender] = useState()
  const apiHTTP = "http://localhost:3333/"




  console.log(api)

  const handleFetch = () =>{
      fetch(`${apiHTTP}posts`)
      .then((response) => response.json())
      .then((data) => setApi(data));
  }

  const  handleADD = ()=>{
    console.log("handleADD")
  }
  const handleDELETE = (id) => {
    fetch(`${apiHTTP}posts/${id}`, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
    },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    setRender(Math.random())
    console.log(api)
    console.log("handleDELETE")
  }
  const   handleUPGRADE = ()=>{
    console.log("handleDELETE")
  }


  return (
    <div className="App">
      <h1>LEARN JSONsever</h1>
      <ul>
        <button style={{margin : '5px'}}  onClick = {handleFetch}>Fetch Data</button>
        <button style={{margin : '5px'}}  onClick = {handleADD}>ADD Data</button>
  
        {api.map( item => <div key={item.id}>
          <h4> {item.title}</h4>
          <button style={{margin : '5px'}}  onClick = {() => handleUPGRADE(item.id)}>UPGRADE Data</button>
          <button style={{margin : '5px'}}  onClick = {() => handleDELETE(item.id)}>DELETE Data</button>
        </div>)}
      </ul>
    </div>
  );
}

export default App;
