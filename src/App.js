import React, { useEffect, useState } from 'react';

import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

/**
 * 3 conceitos principais no react: componente, estado e propriedade. De acordo
 * com o que eu entendi, o react.js é um framework javascript é orientado a
 * componentes.
 * 
 * componente
 * ----------
 * É uma função que retorna algum conteúdo HTML. O componente também pode
 * retornar CSS e Javascript. No mais é um bloco isolado de HTML, CSS e
 * JS que não interfere no restante da aplicação.
 * 
 * estado
 * ------
 * É uma informação que o componente vai manipular. Informações mantidas pelo
 * componente.
 * 
 * propriedade
 * -----------
 * Propriedade (ou atributo, se for pensar em HTML), é um atributo que faz
 * parte de um componente do react. Informações que um componente pai passa
 * para o componente filho.
 */

function App() {
  const [devs, setDevs] = useState([]);  

  useEffect(() => {
      async function loadDevs() {
      const response = await api.get('/api/devs');
        
      setDevs(response.data);
    }
  
    loadDevs();
  }, []);

  /**
   * Função responsável por manipular o envio do formulário pelo usuário.
   */
  async function handleSubmit(data) {
    // O comportamento padrão de um evento é mudar a tela assi que um formulário
    // é submetido. Esse método previne que esse comportamento ocorra.
    // event.preventDefault();

    const response = await api.post('/api/devs', data);

    // Adicionando o dev novo
    setDevs([...devs, response.data]);

    console.log(response.data);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar novo dev</strong>
        <DevForm onSubmit={handleSubmit} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
