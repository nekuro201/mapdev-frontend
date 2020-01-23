import React, {useState, useEffect} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Siderbar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)
// Propriedade: Informações que um componente PAI passa para o componente FILHO

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data){
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);
  }

  async function handleDropDev(data){
    const {github_username} = data;

    const response = await api.delete(`/devs/${github_username}`)

    const {n} = response.data;

    if(n !== 0){
      console.log("EXCLUIDO");

      setDevs([...devs.filter(devs => devs.github_username !== github_username )]);

    }
    else{
      console.log("NÃO EXCLUIDO");
    }
  }

  return (
    <div id="app">

      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem onSubmit={handleDropDev} key={dev._id} dev={dev} />
          ))}
          
        </ul>
      </main>
      
    </div>
  );
}

export default App;
