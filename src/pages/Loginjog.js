import logo from '../images/logo_la.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Loginjog() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch('http://localhost:5000/jogador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email })
    });
    
    const data = await response.json();
    
    if (data.success) {
        alert("sucesso")
        navigate("");
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <div className='flex flex-col justify-center items-center '>
        <img src={logo} className="m-4 w-[150px]" title='PaintBall - LA' alt='PaintBall - LA' />
        <h1 className='text-white font-bold text-3xl m-3'>Jogador! Acesse sua conta.</h1>
        <input
          id="username"
          type='text'
          className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]'
          placeholder='Digite seu nome'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="password"
          type='password'
          className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]'
          placeholder='Digite sua senha'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          id="bt-log"
          className='bg-primary p-1 rounded-sm text-center m-2 w-[250px]'
          onClick={handleLogin}
        >
          Acessar Conta
        </button>
        <p className='text-primary mt-10'><a href='/esqueci-minha-senha'>Esqueci minha senha</a></p>
        <p className='text-primary mt-10'><span className='text-white'>Não possuo cadastro!</span> <a href='/cadastro'>Clique aqui</a></p>
      </div>
    </div>
  );
}

export default Loginjog;
