import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CardJogador() {
  const [jogadores, setJogadores] = useState([{ nome: '', numero: '1', items: [], selectedItem: '', isClosed: false }]);
  const [estoque, setEstoque] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(''); // Estado para forma de pagamento
  const [showPaymentModal, setShowPaymentModal] = useState(false); // Controle do modal
  const [jogadorIndexForPayment, setJogadorIndexForPayment] = useState(null); // Para saber qual jogador está fechando o pedido

  useEffect(() => {
    axios.get('http://localhost:5000/estoque')
      .then(response => setEstoque(response.data))
      .catch(error => console.error('Erro ao buscar estoque:', error));
  }, []);

  const handleAddJogador = () => {
    const newNumero = (jogadores.length + 1).toString();
    setJogadores([...jogadores, { nome: '', numero: newNumero, items: [], selectedItem: '', isClosed: false }]);
  };

  const handleRemoveJogador = (index) => {
    const updatedJogadores = jogadores.filter((_, i) => i !== index);
    setJogadores(updatedJogadores);
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
      selectedItem.valor = parseFloat(selectedItem.valor) || 0;
      updatedJogadores[index].items.push(selectedItem);
      updatedJogadores[index].selectedItem = ''; // Limpa a seleção após adicionar
      setJogadores(updatedJogadores);
    }
  };

  const handleRemoveItem = (jogadorIndex, itemIndex) => {
    const updatedJogadores = [...jogadores];
    updatedJogadores[jogadorIndex].items.splice(itemIndex, 1);
    setJogadores(updatedJogadores);
  };

  const handleClosePedido = (index) => {
    setJogadorIndexForPayment(index); // Define o jogador atual para pagamento
    setShowPaymentModal(true); // Abre o modal de pagamento
  };

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleConfirmPayment = () => {
    const jogador = jogadores[jogadorIndexForPayment];
    const itemsToUpdate = jogador.items;

    const itemCountMap = itemsToUpdate.reduce((acc, item) => {
      acc[item.nome] = (acc[item.nome] || 0) + 1;
      return acc;
    }, {});

    let podeFechar = true;

    const promises = Object.keys(itemCountMap).map(nome => {
      const quantidadeParaSubtrair = itemCountMap[nome];
      return axios.get(`http://localhost:5000/estoque/${nome}`)
        .then(response => {
          const quantidadeAtual = response.data.quantidade;
          if (quantidadeAtual < quantidadeParaSubtrair) {
            console.warn(`Quantidade insuficiente no estoque para o item ${nome}`);
            podeFechar = false;
          } else {
            const novaQuantidade = quantidadeAtual - quantidadeParaSubtrair;
            return axios.put(`http://localhost:5000/estoque/${nome}`, { quantidade: novaQuantidade })
              .then(() => console.log(`Estoque atualizado para o item ${nome} com nova quantidade ${novaQuantidade}`))
              .catch(error => console.error('Erro ao atualizar estoque:', error));
          }
        })
        .catch(error => console.error('Erro ao obter quantidade atual do estoque:', error));
    });

    Promise.all(promises).then(() => {
      if (!podeFechar) {
        console.error('Não foi possível fechar o pedido devido à quantidade insuficiente no estoque.');
      } else {
        axios.post('http://localhost:5000/pedidos', {
          nomeJogador: jogador.nome,
          items: jogador.items,
          formaPagamento: selectedPayment,
        })
        .then(() => console.log('Pedido e pagamento cadastrados com sucesso!'))
        .catch(error => console.error('Erro ao cadastrar pedido:', error));

        setShowPaymentModal(false); // Fecha o modal após confirmar
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-4">
      {jogadores.map((jogador, index) => {
        const valorTotalJogador = jogador.items.reduce((sum, item) => sum + item.valor, 0);
        return (
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
                  <p>R${parseFloat(item.valor).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="inline-flex gap-4 justify-around w-full items-center mt-4">
              <h1 className="text-md font-semibold">
                Total: R${valorTotalJogador.toFixed(2)}
              </h1>
            </div>

            <div className="flex justify-center items-center mt-2">
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-lg"
                onClick={() => handleClosePedido(index)}
                disabled={jogador.isClosed}
              >
                Fechar Pedido
              </button>
            </div>
          </section>
        );
      })}

      {/* Modal para selecionar a forma de pagamento */}
      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Selecione a forma de pagamento</h2>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              onChange={(e) => handlePaymentSelection(e.target.value)}
              value={selectedPayment}
            >
              <option value="">Selecione</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao">Cartão</option>
              <option value="pix">PIX</option>
            </select>
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-lg w-full"
              onClick={() => handleConfirmPayment()}
            >
              Confirmar Pagamento
            </button>
          </div>
        </div>
      )}
    </div>
  );
}