import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CardJogador() {
  const [jogadores, setJogadores] = useState([{ nome: '', numero: '1', items: [], selectedItem: '', isClosed: false }]);
  const [estoque, setEstoque] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    // Faz a requisição para obter os itens do estoque
    axios.get('http://localhost:5000/estoque')
      .then(response => setEstoque(response.data))
      .catch(error => console.error('Erro ao buscar estoque:', error));
  }, []);

  const handleAddJogador = () => {
    const newNumero = (jogadores.length + 1).toString(); // Novo número baseado no comprimento da lista
    setJogadores([...jogadores, { nome: '', numero: newNumero, items: [], selectedItem: '', isClosed: false }]);
  };

  const handleRemoveJogador = (index) => {
    const updatedJogadores = jogadores.filter((_, i) => i !== index);
    setJogadores(updatedJogadores);
    updateValorTotal(updatedJogadores);
  };

  const handleNomeChange = (index, event) => {
    const updatedJogadores = [...jogadores];
    updatedJogadores[index].nome = event.target.value;
    setJogadores(updatedJogadores);
  };

  const handleNumeroChange = (index, event) => {
    const updatedJogadores = [...jogadores];
    updatedJogadores[index].numero = event.target.value;
    setJogadores(updatedJogadores);
  };

  const handleItemSelectChange = (index, event) => {
    const updatedJogadores = [...jogadores];
    const selectedItem = estoque.find(item => item.nome === event.target.value);
    updatedJogadores[index].selectedItem = selectedItem;
    setJogadores(updatedJogadores);
  };

  const handleAddItem = (index) => {
    const updatedJogadores = [...jogadores];
    if (updatedJogadores[index].selectedItem) {
        const selectedItem = { ...updatedJogadores[index].selectedItem };

        // Certifique-se de que `valor` seja numérico
        selectedItem.valor = parseFloat(selectedItem.valor) || 0;

        updatedJogadores[index].items.push(selectedItem);
        updatedJogadores[index].selectedItem = ''; // Reset the selected item
        setJogadores(updatedJogadores);
        updateValorTotal(updatedJogadores);
    }
  };

  const handleRemoveItem = (jogadorIndex, itemIndex) => {
    const updatedJogadores = [...jogadores];
    updatedJogadores[jogadorIndex].items.splice(itemIndex, 1);
    setJogadores(updatedJogadores);
    updateValorTotal(updatedJogadores);
  };

  const updateValorTotal = (updatedJogadores) => {
    const total = updatedJogadores.reduce((sum, jogador) => {
      const jogadorTotal = jogador.items.reduce((itemSum, item) => itemSum + item.valor, 0);
      return sum + jogadorTotal;
    }, 0);
    setValorTotal(total);
  };

  const handleClosePedido = (index) => {
    const updatedJogadores = [...jogadores];
    updatedJogadores[index].isClosed = true;
    setJogadores(updatedJogadores);
  
    const itemsToUpdate = jogadores[index].items;
    
    let podeFechar = true;
  
    itemsToUpdate.forEach(item => {
      if (item.quantidade <= 0) {
        console.warn(`Quantidade insuficiente no estoque para o item ${item.nome}`);
        podeFechar = false;
      }
    });
  
    if (podeFechar) {
      itemsToUpdate.forEach(item => {
        const novaQuantidade = item.quantidade - 1;
  
        axios.put(`http://localhost:5000/estoque/${item.nome}`, { quantidade: novaQuantidade })
          .then(response => console.log(`Estoque atualizado para o item ${item.nome} para ${novaQuantidade} unidades`))
          .catch(error => console.error('Erro ao atualizar estoque:', error));
      });
  
      updateValorTotal(updatedJogadores);
    } else {
      console.error('Não foi possível fechar o pedido devido à quantidade insuficiente no estoque.');
    }
  };
  

  return (
    <div>
      {jogadores.map((jogador, index) => (
        <section key={index} id='jogador' className={`w-[300px] h-auto rounded-lg bg-white ${jogador.isClosed ? 'opacity-50 pointer-events-none' : ''}`}>
          <header className="bg-primary w-full p-3 rounded-t-lg gap-2 flex flex-col justify-center items-center text-black font-normal md:flex-col md:justify-between">
            <p className="text-black">Jogador</p>
            <div className="flex flex-col justify-center items-center gap-2 md:flex-row md:justify-between">
              <input
                type="text"
                className="text-center w-10 rounded-sm px-2 py-1"
                placeholder="N°"
                value={jogador.numero}
                onChange={(e) => handleNumeroChange(index, e)}
                disabled={jogador.isClosed}
              />
              <input
                type="text"
                className="text-center w-44 rounded-sm px-2 py-1"
                placeholder="Jogador"
                value={jogador.nome}
                onChange={(e) => handleNomeChange(index, e)}
                disabled={jogador.isClosed}
              />
              <div className="inline-flex">
                <button
                  className="bg-white hover:bg-green-600 text-black py-1 px-2 rounded-l"
                  onClick={handleAddJogador}
                >
                  +
                </button>
                <button
                  className="bg-black hover:bg-primary py-1 px-2 rounded-r text-white"
                  onClick={() => handleRemoveJogador(index)}
                >
                  -
                </button>
              </div>
            </div>
          </header>

          <div className="w-full h-auto p-2" id="itemsObrigatorio">
            <div className="p-2 flex flex-col justify-center items-center gap-2 md:flex-row md:justify-between">
              <select
                className="w-full border border-slate-400 rounded px-2 p-1 text-center"
                value={jogador.selectedItem?.nome || ''}
                onChange={(e) => handleItemSelectChange(index, e)}
                disabled={jogador.isClosed}
              >
                <option value="">Selecione o item</option>
                {estoque.map((item) => (
                  <option key={item.id} value={item.nome}>
                    {item.nome}
                  </option>
                ))}
              </select>
              <div className="inline-flex">
                <button
                  className="bg-black hover:bg-primary py-1 px-2 rounded text-white"
                  onClick={() => handleAddItem(index)}
                  disabled={jogador.isClosed}
                >
                  +
                </button>
              </div>
            </div>

            {jogador.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="p-2 flex flex-col justify-center items-center md:flex-row md:justify-between"
              >
                <div className="inline-flex">
                  <button
                    className="bg-black hover:bg-red-500 py-1 px-2 rounded text-white"
                    onClick={() => handleRemoveItem(index, itemIndex)}
                    disabled={jogador.isClosed}
                  >
                    -
                  </button>
                </div>
                <p>{item.nome}</p>
                <p>R${parseFloat(item.valor).toFixed(2)}</p> {/* Garanta que o valor é numérico */}
              </div>
            ))}
          </div>

          <div className="inline-flex p-2">
            <button
              className="w-[180px] bg-gray-300 hover:bg-red-600 text-gray-800 font-bold py-2 px-4 rounded-l"
              onClick={() => handleClosePedido(index)}
              disabled={jogador.isClosed}
            >
              Fechar Pedido
            </button>
            <p className="bg-black text-white font-bold py-2 px-4 rounded-r">
              R${valorTotal.toFixed(2)}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
