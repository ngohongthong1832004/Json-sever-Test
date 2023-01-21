import './App.css';
import { useState } from 'react';
function App() {
  
  const [api,setApi] = useState([])

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
  const    handleUPGRADE = ()=>{
    console.log("handleUPGRADE")
  }
  const    handleDELETE = ()=>{
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
          <button style={{margin : '5px'}}  onClick = {handleUPGRADE}>UPGRADE Data</button>
          <button style={{margin : '5px'}}  onClick = {handleDELETE}>DELETE Data</button>
        </div>)}
      </ul>
    </div>
  );
}

export default App;
