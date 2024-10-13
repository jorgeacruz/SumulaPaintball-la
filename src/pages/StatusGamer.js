import React, { useEffect, useState } from 'react';
import VendaAvulsa from './Componentes/VendaAvul';
import CardJog from './Componentes/Cardjog';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StatusGame() {
  const [jogo, setJogo] = useState({});
  const [jogadores, setJogadores] = useState([{ nome: '', numero: '1', items: [], selectedItem: '', isClosed: false }]);
  const [bolinhas, setBolinhas] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Estado para controlar o modal
  const navigate = useNavigate();

   // Variável local para armazenar o valor total das vendas avulsas
   let valorTotalVendasAvulsas = 0;

   // Função para calcular o valor total das vendas avulsas
   const calcularValorTotalVendasAvulsas = () => {
     valorTotalVendasAvulsas = 0; // Reseta o valor total antes de somar novamente
 
     // Percorre os jogadores e soma apenas os itens de venda avulsa
     jogadores.forEach(jogador => {
       if (!jogador.isClosed) { // Verifica apenas jogadores que não fecharam o pedido
         jogador.items.forEach(item => {
           if (item.tipo === 'venda avulsa') { // Verifica se o item é de venda avulsa
             valorTotalVendasAvulsas += item.valor; // Soma o valor do item
           }
         });
       }
     });
   };
  const calcularValorTotalCompras = () => {
    return jogadores
      .filter(jogador => jogador.isClosed) // Filtrar jogadores que fecharam o pedido
      .reduce((total, jogador) => {
        const valorTotalJogador = jogador.items.reduce((sum, item) => sum + item.valor, 0);
        return total + valorTotalJogador; // Somar o valor total de cada jogador fechado
      }, 0); // Valor inicial do total é 0
  };
  useEffect(() => {
    const interval = setInterval(() => {
      calcularValorTotalVendasAvulsas(); // Atualiza o valor total das vendas avulsas
    }, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [jogadores]);

  const fetchBolinhas = () => {
    axios.get('http://localhost:5000/estoque/bolinhas')
      .then(response => {
        setBolinhas(response.data.quantidade); // Define a quantidade de bolinhas
      })
      .catch(error => {
        console.error('Erro ao buscar bolinhas:', error);
      });
  };

  useEffect(() => {
    fetchBolinhas();

    const storedData = localStorage.getItem('dataJogo');
    const storedHora = localStorage.getItem('horaJogo');
  
    if (storedData) {
      setJogo({ data: storedData, hora: storedHora });
    }
    const interval = setInterval(() => {
      fetchBolinhas(); 
    }, 5000); // Intervalo de 5 segundos

    return () => clearInterval(interval); 
  }, []);

  const handleAddJogador = () => {
    const newNumero = (jogadores.length + 1).toString();
    setJogadores([...jogadores, { nome: '', numero: newNumero, items: [], selectedItem: '', isClosed: false }]);
  };

  const handleClosePedido = (index) => {
    const updatedJogadores = [...jogadores];
    updatedJogadores[index].isClosed = !updatedJogadores[index].isClosed;
    setJogadores(updatedJogadores);
  };

  // Contar jogadores ativos (cards não fechados)
  const jogadoresAtivos = jogadores.filter(jogador => !jogador.isClosed).length;

  // Contar jogadores inativos (cards fechados)
  const jogadoresInativos = jogadores.filter(jogador => jogador.isClosed).length;

  const handleFecharPartida = () => {
    setShowConfirmationModal(true);
  };

  // Função para confirmar o fechamento da partida e redirecionar
  const confirmCloseGame = () => {
    setShowConfirmationModal(false);
    navigate('/resumogame');
  };

  // Função para cancelar o fechamento da partida
  const cancelCloseGame = () => {
    setShowConfirmationModal(false);
  };
  return (
    <section className="bg-black text-white min-h-screen w-full h-auto rounded-md p-3 flex flex-col gap-4">
    <section className="bg-black text-white w-full h-auto rounded-md p-3 flex flex-col gap-4">
      <div className="flex justify-between w-full gap-4 mb-4">
        <div className="flex flex-col items-start">
          <p className="font-semibold">Data da Partida</p>
          <p id="dataPartida" className="font-semibold text-3xl">{jogo.data || 'Carregando...'}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="font-semibold">Jogadores Ativos</p>
          <p id="playerAtivo" className="font-semibold text-3xl">{jogadoresAtivos}</p> 
        </div>
        <div className="flex flex-col items-start">
          <p className="font-semibold">Jogadores Finalizados</p>
          <p id="playerInativo" className="font-semibold text-3xl">{jogadoresInativos}</p> 
        </div>
        <div className="flex flex-col items-start">
        <p id="bolinhasEstoque" className="font-semibold text-3xl">
          {bolinhas !== null ? `Bolinhas disponíveis: ${bolinhas}` : 'Carregando...'}
        </p>
      <div className="flex flex-col items-start">
    </div>
        </div>
      </div>

      {/* Componentes VendaAvulsa e CardJog */}
      <div className="flex flex-wrap gap-4 text-black">
        <CardJog 
          jogadores={jogadores} 
          setJogadores={setJogadores} 
          handleAddJogador={handleAddJogador} 
          handleClosePedido={handleClosePedido}   
        />
        <VendaAvulsa />
        
      </div>
    </section>
    <div className="flex justify-end mt-auto">
        <button 
          onClick={handleFecharPartida}  // Abre o modal de confirmação
          className="mt-4 mb-4 rounded-md w-[300px] h-[40px] bg-primary flex justify-center items-center hover:bg-red-500 transition-colors"
        >
          <p>Fechar Partida</p>
        </button>
      </div>

      {/* Modal de confirmação */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-black text-2xl font-semibold mb-4">Tem certeza que deseja fechar a partida?</h2>
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-500 hover:bg-black text-white py-2 px-4 rounded-lg"
                onClick={cancelCloseGame}  // Fecha o modal sem redirecionar
              >
                Cancelar
              </button>
              <button
                className="bg-black hover:bg-primary py-2 px-4 rounded-lg text-white"
                onClick={confirmCloseGame}  // Confirma o fechamento e redireciona
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}