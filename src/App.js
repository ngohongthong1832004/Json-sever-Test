import './App.css';
import { useState, useEffect ,useRef } from 'react';
function App() {
  const [api,setApi] = useState([])
  const [apiHTTP , setApiHTTP] = useState('http://localhost:3333/posts?_page=1')
  const [inputValue, setInputValue] = useState('')
  const [inputSearchValue, setInputSearchValue] = useState('')
  const [valueUpgrade, setValueUpgrade] = useState('')
  const [idUpgrade , setIdUpgrade] = useState('')
  const [isButtonUpgrade , setIsButtonUpgrade] = useState(false)

  const [paginationLink , setPaginationLink] = useState([])
  const [showPage , setShowPage] = useState(true)

  const upgradeInput = useRef()
  const ulRef = useRef()

  var rootLink = "http://localhost:3333/posts"


  const inputRef = useRef()
  const inputSearchValueRef = useRef()
  // const handleFetch = () =>{
      
  // }
  const form = {
    title : inputRef.current?.value,
  }
  const formUpgrade = {
    title : valueUpgrade,
  }
  // console.log(inputRef.value)
  // valueUpgrade

  useEffect(()=>{ 
    fetchAPI()
  },[apiHTTP])

  const fetchAPI = ()=>{
    console.log("call API")
    fetch(apiHTTP)
      .then((response) => response.json())
      .then((data) =>{ 
        setApi(data)
      });
  }

  useEffect(()=>{
    fetch(apiHTTP)
      .then((response) => {
        const rs = [...response.headers].filter((item)=>{
            return item[0] === "link"
        })
       return rs[0][1].split(',')
      })
      .then(arr => {
        return setPaginationLink(arr)
      })
  },[apiHTTP])
  
  

  const  handleADD = ()=>{
    fetch(rootLink , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(form),
      })
      setInputValue('')
      inputRef.current.focus()

      fetchAPI()

      // setTimeout(()=>{  
      //     fetchAPI()
      // },100)
  }
  const handleDELETE = (id) => {
    const test = document.getElementById(id)
    test.style.display = 'none'

    fetch(`${rootLink}/${id}`, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
    },
    })
    setApiHTTP(apiHTTP)
  }
  
  const   handleUPGRADE = ()=>{
    fetch(`${rootLink}/${idUpgrade}`, {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formUpgrade),
    })
      .then(res => res.json())
      .then(data => console.log(data))

      fetchAPI()

      setValueUpgrade("")

    console.log("handleUPGRADE")
  }
  const handleFind  = ()=>{
    fetch(`${rootLink}?q=${inputSearchValue}`)
    .then(res => res.json())
    .then(data => setApi(data))
    setInputSearchValue('')
    upgradeInput.current.focus()
    // inputSearchValueRef.focus()
  }
  // const handleComplete = () => {
  //   console.log("")
  // }
  const handleClickUpgrade =  (item) => { 
    setValueUpgrade(item.title) 
    setIdUpgrade(item.id)
  }

  const handleClickPagination = function(link){
    // console.log("LInk : ",link)
    const result  = link.trim()?.split(";")[0]?.split("<")[1]?.split(">")[0]
    console.log(result)
    setApiHTTP(result)
  }
  // console.log(formUpgrade)
  // console.log(idUpgrade)
  // console.log("apiHTTP : ",apiHTTP)
  // console.log(paginationLink)
//  const arr  =  paginationLink.map((e)=>{
//     return e.trim()?.split(";")[0]?.split("<")[1]?.split(">")[0]
//   })
//   console.log("arr : ",arr)
  return (
    <div className="App">
      <h1>TODO FAKE APP</h1>

        <label>Job name </label>
        <input ref = {inputRef} value={inputValue} onChange = { e => setInputValue(e.target.value)} />
        <button style={{margin : '5px'}}  onClick = {handleADD}>Add To List</button>
        <div style={{padding : "10px"}}>-----------------------------</div>

        <label>Find Job </label>
        <input ref = {inputSearchValueRef} value={inputSearchValue} onChange = { e => setInputSearchValue(e.target.value)} />
        <button style={{margin : '5px'}}  onClick = {handleFind}>Find</button>
        <div style={{padding : "10px"}}>-----------------------------</div>

        { isButtonUpgrade && <div>
          <label> Edit value </label>
          <input value={valueUpgrade} onChange = { e => setValueUpgrade(e.target.value)} />
          <button ref = {upgradeInput} style={{margin : '5px'}}  onClick = {handleUPGRADE}>Edit</button>
          <div style={{padding : "10px"}}>-----------------------------</div>
        </div>}
        

      <ul  ref = {ulRef}>
        {/* <button style={{margin : '5px'}}  onClick = {handleFetch}>Fetch Data</button> */}
        {api.map( item => <li key={item.id} id = {item.id}>
          <span style={{color :"blue",padding : "10px"}}>{item.id}</span>
          <h4>{item.title}</h4>
          <div>
            <button style={{margin : '5px',backgroundColor : "green"}}  onClick = {()=> { handleClickUpgrade(item) ; setIsButtonUpgrade(true)}}>EDIT</button>
            <button style={{margin : '5px',backgroundColor : "red"}}  onClick = {() => handleDELETE(item.id)}>DELETE</button>
          </div>
          {/* <button style={{margin : '5px',backgroundColor : "aqua"}}  onClick = {() => handleComplete(item.id)}>Complete</button> */}
        </li>)}
      </ul>
          {showPage && <div style = {{display : "flex" , alignItems :"center" , justifyContent : "space-evenly" , padding : "30px 50px"}}>
            {paginationLink.map((item,index)=>{
              return <button 
                        onClick = {() => handleClickPagination(item)} key={index}
                        style = {{border : "1px solid black" , padding : "10px 25px" , fontSize : "25px" , listStyle : "none"}}
                      >
                        {item?.split(';')[1]?.split('=')[1].slice(1,item?.split(';')[1]?.split('=')[1].length -1).toUpperCase()}
                      </button>
            })}
          </div>}
    </div>
  );
}

export default App;
