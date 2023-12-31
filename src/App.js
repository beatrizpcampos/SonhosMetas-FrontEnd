import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {
  const Sonhos = ({ sonhos }) => {
   return (
    <div className='containerLista'>
      {sonhos.map((sonho) => {
        return (
          <div className='lista'>
            <button 
             onClick={() => checkSonho(sonho)}
             className='checkbox' 
             style={{ backgroundColor: sonho.status ? '#1b5699' : '#f0f0f0' }}>
            </button>
            <p>{sonho.nome}</p>
            <button onClick={() => editSonhoExist(sonho)}>
              <AiOutlineEdit size={25} color={"#4d4f57"}></AiOutlineEdit>
            </button>
            <button onClick={() => deleteSonho(sonho)}>
              <AiOutlineDelete size={25} color={"#4d4f57"}></AiOutlineDelete>
            </button>
          </div>
        )
      })}
    </div>
   )
  }

  async function editStatusSonho() {
    setInputVisibility(!inputVisibility)
  }

  async function editSonhoExist(sonho){
    setSelectedSonho(sonho)
    setInputVisibility(true)
  }

  async function getSonhos() {
    const response = await axios.get("http://localhost:3333/sonhos")
    setSonhos(response.data)
  }

  async function editSonho() {
    await axios.put("http://localhost:3333/sonhos", {
      id: selectedSonho.id,
      nome: inputValue,
    })
    setSelectedSonho()
    setInputVisibility(false)
    getSonhos()
    setInputValue("")
  }

  async function createSonho(){
    await axios.post("http://localhost:3333/sonhos", {
      nome: inputValue,
    })
    getSonhos()
    setInputVisibility(!setInputVisibility)
    setInputValue("")
  }

  async function deleteSonho(sonho){
    await axios.delete(`http://localhost:3333/sonhos/${sonho.id}`)
    getSonhos()
  }

  async function checkSonho(sonho) {
    await axios.put("http://localhost:3333/sonhos", {
      id: sonho.id,
      status: !sonho.status,
    });
    getSonhos();
  }

  const [sonhos, setSonhos] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [inputVisibility, setInputVisibility] = useState()
  const [selectedSonho, setSelectedSonho] = useState()

  useEffect(() => {
    getSonhos()
  }, [])

  return (
   <div className="App">
      <div className="container">
        <div className='header'>
          <h1>Sonhos e Metas 2023</h1>
        </div>

        <Sonhos sonhos={sonhos}></Sonhos>

        <input
          value={inputValue}
          style={{ display: inputVisibility ? "block" : "none" }}
          onChange={(event) => {
            setInputValue(event.target.value)
          }}
          className='inputName'
        ></input>

        <button 
        onClick={
          inputVisibility 
          ? selectedSonho
           ? editSonho
           : createSonho
          : editStatusSonho} 
          className='addButton'>
          {inputVisibility ? "Confirmar" : "Novo Sonho ou Meta"}
          </button>
      </div>
    </div>
  );
}

export default App;
