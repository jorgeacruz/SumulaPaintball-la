import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CardVendaAvulsa() {
  const [vendas, setVendas] = useState([{ cliente: '', codigo: '1', items: [], selectedItem: '', isClosed: false }]);
  const [estoque, setEstoque] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    // Faz a requisição para obter os itens do estoque
    axios.get('http://localhost:5000/estoque')
      .then(response => setEstoque(response.data))
      .catch(error => console.error('Erro ao buscar estoque:', error));
  }, []);

  const handleAddVenda = () => {
    const newCodigo = (vendas.length + 1).toString(); // Novo código baseado no comprimento da lista
    setVendas([...vendas, { cliente: '', codigo: newCodigo, items: [], selectedItem: '', isClosed: false }]);
  };

  const handleRemoveVenda = (index) => {
    const updatedVendas = vendas.filter((_, i) => i !== index);
    setVendas(updatedVendas);
    updateValorTotal(updatedVendas);
  };

  const handleClienteChange = (index, event) => {
    const updatedVendas = [...vendas];
    updatedVendas[index].cliente = event.target.value;
    setVendas(updatedVendas);
  };

  const handleCodigoChange = (index, event) => {
    const updatedVendas = [...vendas];
    updatedVendas[index].codigo = event.target.value;
    setVendas(updatedVendas);
  };

  const handleItemSelectChange = (index, event) => {
    const updatedVendas = [...vendas];
    const selectedItem = estoque.find(item => item.nome === event.target.value);
    updatedVendas[index].selectedItem = selectedItem;
    setVendas(updatedVendas);
  };

  const handleAddItem = (index) => {
    const updatedVendas = [...vendas];
    if (updatedVendas[index].selectedItem) {
      const selectedItem = { ...updatedVendas[index].selectedItem };

      // Certifique-se de que `valor` seja numérico
      selectedItem.valor = parseFloat(selectedItem.valor) || 0;

      updatedVendas[index].items.push(selectedItem);
      updatedVendas[index].selectedItem = ''; // Reset the selected item
      setVendas(updatedVendas);
      updateValorTotal(updatedVendas);
    }
  };

  const handleRemoveItem = (vendaIndex, itemIndex) => {
    const updatedVendas = [...vendas];
    updatedVendas[vendaIndex].items.splice(itemIndex, 1);
    setVendas(updatedVendas);
    updateValorTotal(updatedVendas);
  };

  const updateValorTotal = (updatedVendas) => {
    const total = updatedVendas.reduce((sum, venda) => {
      const vendaTotal = venda.items.reduce((itemSum, item) => itemSum + item.valor, 0);
      return sum + vendaTotal;
    }, 0);
    setValorTotal(total);
  };

  const handleClosePedido = (index) => {
    const updatedVendas = [...vendas];
    updatedVendas[index].isClosed = true;
    setVendas(updatedVendas);
  
    const itemsToUpdate = vendas[index].items;
  
    const itemCountMap = itemsToUpdate.reduce((acc, item) => {
      acc[item.nome] = (acc[item.nome] || 0) + 1;
      return acc;
    }, {});
  
    Object.keys(itemCountMap).forEach(nome => {
      const quantidadeParaSubtrair = itemCountMap[nome];
  
      axios.put(`http://localhost:5000/estoque/${nome}`, { quantidade: -quantidadeParaSubtrair })
        .then(response => console.log(`Estoque atualizado para o item ${nome} com quantidade ${quantidadeParaSubtrair}`))
        .catch(error => console.error('Erro ao atualizar estoque:', error));
    });
  
    updateValorTotal(updatedVendas);
  };
  

  return (
    <div>
      {vendas.map((venda, index) => (
        <section key={index} id='Avulso' className={`w-[300px] h-auto rounded-lg bg-white ${venda.isClosed ? 'opacity-50 pointer-events-none' : ''}`}>
          <header className="bg-secondary w-full p-3 rounded-t-lg gap-2 flex flex-col justify-center items-center text-black font-normal md:flex-col md:justify-between">
            <p className="text-white">Venda AVULSA</p>
            <div className="flex flex-col justify-center items-center gap-2 md:flex-row md:justify-between">
              <input
                id='numJogador'
                type="text"
                className="text-center w-12 px-2 py-1 rounded-sm"
                placeholder="Cod"
                value={venda.codigo}
                onChange={(e) => handleCodigoChange(index, e)}
                disabled={venda.isClosed}
              />
              <input
                id='nomeJogador'
                type="text"
                className="text-center w-44 px-2 py-1 rounded-sm"
                placeholder="Cliente"
                value={venda.cliente}
                onChange={(e) => handleClienteChange(index, e)}
                disabled={venda.isClosed}
              />
              <div className="inline-flex">
                <button
                  className="bg-white hover:bg-green-600 text-black py-1 px-2 rounded-l"
                  onClick={handleAddVenda}
                >
                  +
                </button>
                <button
                  className="bg-black hover:bg-primary py-1 px-2 rounded-r text-white"
                  onClick={() => handleRemoveVenda(index)}
                >
                  -
                </button>
              </div>
            </div>
          </header>

          <div className="p-2 flex flex-col justify-center items-center gap-2 md:flex-row md:justify-between">
            <select
              className="w-full border border-slate-400 rounded px-2 p-1 text-center"
              value={venda.selectedItem?.nome || ''}
              onChange={(e) => handleItemSelectChange(index, e)}
              disabled={venda.isClosed}
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
                disabled={venda.isClosed}
              >
                +
              </button>
            </div>
          </div>

          {venda.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="p-2 flex flex-col justify-center items-center md:flex-row md:justify-between"
            >
              <div className="inline-flex">
                <button
                  className="bg-black hover:bg-red-500 py-1 px-2 rounded text-white"
                  onClick={() => handleRemoveItem(index, itemIndex)}
                  disabled={venda.isClosed}
                >
                  -
                </button>
              </div>
              <p>{item.nome}</p>
              <p>R${parseFloat(item.valor).toFixed(2)}</p> {/* Garanta que o valor é numérico */}
            </div>
          ))}

          <div className="inline-flex p-2">
            <button
              className="w-[180px] bg-gray-300 hover:bg-red-600 text-gray-800 font-bold py-2 px-4 rounded-l"
              onClick={() => handleClosePedido(index)}
              disabled={venda.isClosed}
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
