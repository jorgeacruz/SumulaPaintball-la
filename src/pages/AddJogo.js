import logo from '../images/logo_la.png';
import React, { useState } from 'react';
import NavBar from './Componentes/Navbar';

function AddJogo() {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  const handleAdicionar = async () => {
    try {
      const response = await fetch('http://localhost:5000/addjogo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data, hora })
      });

      const result = await response.json();

      if (result.success) {
        alert('Jogo adicionado com sucesso!');
      } else {
        alert('Erro ao adicionar jogo.');
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      alert('Erro ao adicionar jogo.');
    }
  };

  return (
    <>
      <NavBar />
      <div className='w-full h-screen bg-black flex items-center justify-center'>
        <div className='flex flex-col justify-center items-center'>
          <img src={logo} className="m-4 w-[150px]" title='PaintBall - LA' alt='PaintBall - LA' />
          <h1 className='text-white font-bold text-3xl m-3'>Iniciar jogo</h1>
          <input
            id="data"
            type='date'
            className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]'
            placeholder='Digite a data'
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <input
            id="hora"
            type='time'
            className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]'
            placeholder='Digite a hora'
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
          <button
            id="bt-log"
            className='bg-primary p-1 rounded-sm text-center m-2 w-[250px]'
            onClick={handleAdicionar}
          >
            Cadastrar e adicionar jogo
          </button>
        </div>
      </div>
    </>
  );
}

export default AddJogo;
