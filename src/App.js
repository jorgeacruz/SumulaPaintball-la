import './App.css';
import logo from '../src/images/logo_la.png';
import { useState } from "react";  
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CadJog from './pages/login/CadJog';
import Loginjog from './pages/Loginjog';
import NavBar from './pages/Componentes/Navbar';
import ForgotPassword from './pages/MudaSenhaJog';
import Changepass from './pages/MudaSenhaAdm';
import Estoque from './pages/Estoque';
import AddJogo from './pages/AddJogo';
import CardJogador from './pages/Componentes/Cardjog';
import CardVendaAvulsa from './pages/Componentes/VendaAvul';
import StatusGame from './pages/StatusGamer';
import ResumoGame from './pages/ResumoGame';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
        localStorage.setItem('auth', true);
        navigate("/estoque");
    } else {
      toast.warn('Usuário ou senha incorretos!');
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-black'>
      <div className='flex flex-col justify-center items-center '>
        <img src={logo} className="m-4 w-[150px]" title='PaintBall - LA' alt='PaintBall - LA'/>
        <h1 className='text-white text-4xl font-bold m-4'>Administradores</h1>
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
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button 
          id="bt-log" 
          className='bg-primary p-1 rounded-sm text-center m-2 w-[250px] hover:scale-110 duration-300' 
          onClick={handleLogin}
        >
          Acessa sistema
        </button>
        <p className='text-primary mt-10'><a href='/mudarsenhaadm'>Esqueci minha senha</a></p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
       // theme="light"
      />

    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadjog" element={<CadJog />} />
        <Route path="/loginjog" element={<Loginjog />} />
        <Route path="/Navbar" element={<NavBar />} />
        <Route path="/mudarsenhajog" element={<ForgotPassword />} />
        <Route path="/mudarsenhaadm" element={<Changepass />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/addjogo" element={<AddJogo />} />
        <Route path="/cardjogador" element={<CardJogador />} />
        <Route path="/vendaavulsa" element={<CardVendaAvulsa />} />
        <Route path="/statusgame" element={<StatusGame />} />
        <Route path="/resumogame" element={<ResumoGame/>}/>
      </Routes>
    </Router>
  );
}

export default App;
