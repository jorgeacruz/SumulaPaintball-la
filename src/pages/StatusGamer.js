import React, { useEffect, useState } from 'react';
import VendaAvulsa from './Componentes/VendaAvul';
import CardJog from './Componentes/Cardjog';

export default function StatusGame() {
  const [jogo, setJogo] = useState({});
  const [estoque, setEstoque] = useState(0);
  const [jogadores, setJogadores] = useState([{ nome: '', numero: '1', items: [], selectedItem: '', isClosed: false }]);

  // Função para buscar os dados do último jogo e do estoque
  const fetchGameData = async () => {
    try {
      const response = await fetch('http://localhost:5000/statusgame');
      const result = await response.json();
      
      if (result.success) {
        setJogo(result.jogo); // Definir dados do jogo (data e hora)
        setEstoque(result.estoque); // Definir a quantidade de bolinhas no estoque
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchGameData(); 
  }, []);

  const handleAddJogador = () => {
    const newNumero = (jogadores.length + 1).toString(); // Incrementar o número do jogador
    const novoJogador = { nome: '', numero: newNumero, items: [], selectedItem: '', isClosed: false }; // Novo jogador

    setJogadores([...jogadores, novoJogador]); // Adiciona o novo jogador ao estado
  };

  const handleClosePedido = (index) => {
    const updatedJogadores = [...jogadores];
    updatedJogadores[index].isClosed = !updatedJogadores[index].isClosed; // Alterna o estado de "fechado"
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
          <p id="playerAtivo" className="font-semibold text-3xl">{jogadoresAtivos}</p> {/* Exibe jogadores ativos */}
        </div>
        <div className="flex flex-col items-start">
          <p className="font-semibold">Jogadores Finalizados</p>
          <p id="playerInativo" className="font-semibold text-3xl">{jogadoresInativos}</p> {/* Exibe jogadores inativos */}
        </div>
        <div className="flex flex-col items-start">
          <p className="font-semibold">Bolinhas Estoque</p>
          <p id="bolinhasEstoque" className="font-semibold text-3xl">{estoque || 'Carregando...'}</p>
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
