import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom';

export default function CadEquipe() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idade, setIdade] = useState('');
  const [jogadores, setJogadores] = useState([]); 
  const [editIndex, setEditIndex] = useState(null); 
  const navigate = useNavigate();

  const handleAdd = () => {
    if (nome && email && telefone && idade) {
      const novoJogador = { nome, email, telefone, idade };

      if (editIndex !== null) {
        const jogadoresAtualizados = [...jogadores];
        jogadoresAtualizados[editIndex] = novoJogador;
        setJogadores(jogadoresAtualizados);
        setEditIndex(null); 
      } else {
        setJogadores([...jogadores, novoJogador]);
      }

      setNome('');
      setEmail('');
      setTelefone('');
      setIdade('');
    } else {
      alert('Preencha todos os campos antes de adicionar.');
    }
  };

  
  const handleEdit = (index) => {
    const jogador = jogadores[index];
    setNome(jogador.nome);
    setEmail(jogador.email);
    setTelefone(jogador.telefone);
    setIdade(jogador.idade);
    setEditIndex(index); 
  };

 
  const handleDelete = (index) => {
    const jogadoresAtualizados = jogadores.filter((_, i) => i !== index);
    setJogadores(jogadoresAtualizados);
  };

  
  const handleSubmit = async () => {
    if (jogadores.length === 0) {
      alert('Adicione pelo menos um jogador antes de finalizar o cadastro.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jogadores }), 
      });
      if (response.ok) {
        toast('Cadastro da equipe realizado com sucesso', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setJogadores([]); 
        setTimeout(() => {
          navigate("/estoque"); 
        }, 5000);
      } else {
        toast.error('Erro ao realizar cadastro', {
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
      console.error('Erro ao enviar os dados:', error);
    }
  };

  return (
    <section className="bg-black w-full h-screen flex flex-col items-center p-5">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center gap-2 mb-7">
        <h1 className="text-white text-4xl font-semibold m-3">Cadastro de Equipe</h1>
        <h2 className="text-white">Adicione todos os jogadores da sua equipe</h2>
        <h2 className="text-red-600">Depois de cadastrar todos os jogadores, clique em finalizar cadastro.</h2>
      </div>
      
      <div id="cadEquipe" className="p-1 w-full flex flex-col lg:flex-row justify-center items-center gap-2">
        <input 
          type="text" 
          placeholder="Nome e Sobrenome" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="text-center rounded-sm p-2"
        />
        <input 
          type="email" 
          placeholder="Email do Jogador" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-center rounded-sm p-2"
        />
        <input 
          type="text" 
          placeholder="Telefone Jogador" 
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="text-center rounded-sm p-2"
        />
        <input 
          type="text" 
          placeholder="Idade do Jogador" 
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          className="text-center rounded-sm p-2"
        />

        <button 
          className="w-[220px] lg:w-10 h-10 rounded-sm bg-primary hover:bg-green-600 duration-300 p-2 flex justify-center items-center"
          onClick={handleAdd}
        >
          <FaPlus size={20} />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto text-white p-1 gap-3 w-full flex flex-col justify-start items-center">
        {/* Exibir lista de jogadores cadastrados */}
        {jogadores.map((jogador, index) => (
          <div key={index} className="flex justify-between w-4/6 items-center">
            <span>{jogador.nome}</span>
            <span>{jogador.email}</span>
            <span>{jogador.telefone}</span>
            <span>{jogador.idade} anos</span>

            <div className="flex gap-2">
              <button 
                className="w-[220px] lg:w-10 h-10 rounded-sm bg-white hover:bg-secondary duration-300 p-2 flex justify-center items-center"
                onClick={() => handleEdit(index)} // Edição do jogador
              >
                <FaEdit color="#000" size={15} />
              </button>
              <button 
                className="w-[220px] lg:w-10 h-10 rounded-sm bg-white hover:bg-primary duration-300 p-2 flex justify-center items-center"
                onClick={() => handleDelete(index)} // Exclusão do jogador
              >
                <FaTrashAlt color="#000" size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-4">
        <button 
          className="w-[220px] lg:w-[220px] h-10 rounded-sm bg-green-600 hover:scale-110 duration-300 p-2 flex justify-center items-center"
          onClick={handleSubmit}
        >
          <span className="text-white">FINALIZAR CADASTRO</span>
        </button>
      </div>
    </section>
  );
}
