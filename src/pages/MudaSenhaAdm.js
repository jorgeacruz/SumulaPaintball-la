import logo from '../images/logo_la.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Estilos do toastify

function Changepass(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Verify username and email, Step 2: Set new password
  const navigate = useNavigate();

  const handleVerifyAdm = async () => {
    try {
      const response = await fetch('http://localhost:5000/verifyadm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        setStep(2);
      } else {
        toast.error('Usuário ou email incorretos!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      toast.error('Erro ao verificar usuário.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast('As senhas não coincidem.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/resetpasswordadm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, newPassword })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        toast('Senha alterada com sucesso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      } else {
        toast.error('Erro ao alterar senha.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      toast.error('Erro ao alterar senha.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
    <ToastContainer />
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <div className='flex flex-col justify-center items-center'>
        <img src={logo} className="m-4 w-[150px]" title='PaintBall - LA' alt='PaintBall - LA'/>
        {step === 1 ? (
          <>
            <h1 className='text-white font-bold text-3xl m-3'>Esqueci Minha Senha</h1>
            <input 
              id="username" 
              type='text' 
              className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]' 
              placeholder='Digite seu nome'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
              id="email" 
              type='email' 
              className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]' 
              placeholder='Digite seu Email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              id="bt-log" 
              className='bg-primary p-1 rounded-sm text-center m-2 w-[250px]' 
              onClick={handleVerifyAdm}>Verificar Usuário</button>
          </>
        ) : (
          <>
            <h1 className='text-white font-bold text-3xl m-3'>Nova Senha</h1>
            <input 
              id="new-password" 
              type='password' 
              className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]' 
              placeholder='Digite sua nova senha'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input 
              id="confirm-password" 
              type='password' 
              className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]' 
              placeholder='Confirme sua nova senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button 
              id="bt-log" 
              className='bg-primary p-1 rounded-sm text-center m-2 w-[250px]' 
              onClick={handleResetPassword}>Alterar Senha</button>
          </>
        )}
      </div>
    </div>
    </div>
  );
}

export default Changepass;