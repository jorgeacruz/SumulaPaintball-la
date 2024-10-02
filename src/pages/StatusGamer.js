import React, { useEffect, useState } from 'react';
import VendaAvulsa from './Componentes/VendaAvul';
import CardJog from './Componentes/Cardjog';
import axios from 'axios';

export default function StatusGame() {
  const [jogo, setJogo] = useState({});
  const [jogadores, setJogadores] = useState([{ nome: '', numero: '1', items: [], selectedItem: '', isClosed: false }]);
  const [bolinhas, setBolinhas] = useState(null);

  const calcularValorTotalCompras = () => {
    return jogadores
      .filter(jogador => jogador.isClosed) // Filtrar jogadores que fecharam o pedido
      .reduce((total, jogador) => {
        const valorTotalJogador = jogador.items.reduce((sum, item) => sum + item.valor, 0);
        return total + valorTotalJogador; // Somar o valor total de cada jogador fechado
      }, 0); // Valor inicial do total é 0
  };
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
  return (
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
  <p className="font-semibold">Valor Total de Compras</p>
  <p className="font-semibold text-3xl">R${calcularValorTotalCompras().toFixed(2)}</p>
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
  );
}
