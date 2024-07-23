import './App.css';
import logo from '../src/images/logo_la.png';

function App() {
  return (
    /* TELA 02.1 -ACESSO USUÁRIOS CADASTRADO
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <div className='flex flex-col justify-center items-center '>
        <img src={logo} className="m-4 w-[150px]" title='PaintBall - LA' alt='PaintBall - LA'/>
        <h1 className='text-white font-bold text-3xl m-3'>Jogador! Acesse sua conta.</h1>
        <input id="username" type='text' className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]' placeholder='Digite seu nome'/>
        <input id="email" type='email' className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]' placeholder='Digite seu Email' />
        <button id="bt-log" className='bg-primary p-1 rounded-sm text-center m-2 w-[250px]' >
          Fazer Cadastro
        </button>
        <p className='text-primary mt-10'><a href='../../src/pages/login/'>Esqueci minha senha</a></p>
        <p className='text-primary mt-10'><span className='text-white'>Não possuo cadastro!</span> <a href='../../src/pages/login/'>Clique aqui</a></p>
      </div>
    </div>
    */

    /* TELA 02 - CADASTRO USUÁRIOS
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      
      <div className='flex flex-col justify-center items-center '>
        <img src={logo} className="m-4 w-[150px]" title='PaintBall - LA' alt='PaintBall - LA'/>
        <h1 className='text-white font-bold text-3xl m-3'>Jogador! Faça seu cadastro.</h1>
        <input id="username" type='text' className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]' placeholder='Digite seu nome'/>
        <input id="email" type='email' className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]' placeholder='Digite seu Email' />
        <input id="cpf" type='text' className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]' placeholder='Digite seu CPF' />
        <input id="telefone" type='text' className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]' placeholder='Digite sua Telefone' />
        <button id="bt-log" className='bg-primary p-1 rounded-sm text-center m-2 w-[250px]' >
          Fazer Cadastro
        </button>
        <p className='text-white text-sm'>Já possuo cadastro! <span><a href='../../src/pages/login/'>Clique aqui</a></span></p>
      </div>
    </div>
    */

    /*TELA 01 - LOGIN ADMINISTRADOR */
   <div className='w-full h-screen flex flex-col items-center justify-center bg-black'>
      <div className='flex flex-col justify-center items-center '>
        <img src={logo} className="m-4 w-[150px]" title='PaintBall - LA' alt='PaintBall - LA'/>
        <h1 className='text-white text-4xl font-bold m-4'>Administradores</h1>
        <input id="username" type='text' className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]' placeholder='Digite seu nome'/>
        <input id="password" type='password' className='border border-white p-1 rounded-sm text-center mt-2 w-[250px]' placeholder='Digite sua senha' />
        <button id="bt-log" className='bg-primary p-1 rounded-sm text-center m-2 w-[250px]' >
          Acessa sistema
        </button>
        <p className='text-white font-light text-sm'> Esqueci minha senha</p>
      </div>
   </div>
   
  );
}

export default App;
