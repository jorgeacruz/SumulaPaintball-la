import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../pages/Componentes/Navbar';

export default function Estoque() {
  const [estoque, setEstoque] = useState([]);
  const [inputs, setInputs] = useState({});

  const fetchEstoque = () => {
    axios.get('http://localhost:5000/estoque')
      .then(response => {
        setEstoque(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar estoque:', error);
      });
  };

  useEffect(() => {
    fetchEstoque();
  }, []);

  const addEstoque = () => {
    const nomeProduto = document.getElementById('NomeProduto').value;
    const valorProduto = document.getElementById('valorProduto').value;
    const qtdProduto = document.getElementById('QtdProduto').value;
    
    axios.post('http://localhost:5000/estoque', { item: nomeProduto, valor: valorProduto, quantidade: qtdProduto })
      .then(response => {
        fetchEstoque();
        // Limpar os campos após adicionar
        document.getElementById('NomeProduto').value = '';
        document.getElementById('valorProduto').value = '';
        document.getElementById('QtdProduto').value = '';
      })
      .catch(error => {
        console.error('Erro ao adicionar item ao estoque:', error);
      });
  };

  const removeEstoque = () => {
    const nomeProduto = document.getElementById('NomeProduto').value;

    axios.delete(`http://localhost:5000/estoque/${nomeProduto}`)
      .then(response => {
        fetchEstoque();
        // Limpar o campo após remover
        document.getElementById('NomeProduto').value = '';
      })
      .catch(error => {
        console.error('Erro ao remover item do estoque:', error);
      });
  };

  const updateQuantidade = (nome, novaQuantidade) => {
    axios.put(`http://localhost:5000/estoque/${nome}`, { quantidade: novaQuantidade })
      .then(response => {
        fetchEstoque();
        // Limpar o campo de quantidade após atualizar
        setInputs(prev => ({ ...prev, [nome]: { ...prev[nome], quantidade: '' } }));
      })
      .catch(error => {
        console.error('Erro ao atualizar quantidade do item:', error);
      });
  };

  const updateValor = (nome, novoValor) => {
    axios.put(`http://localhost:5000/estoque/${nome}`, { valor: novoValor })
      .then(response => {
        fetchEstoque();
        // Limpar o campo de valor após atualizar
        setInputs(prev => ({ ...prev, [nome]: { ...prev[nome], valor: '' } }));
      })
      .catch(error => {
        console.error('Erro ao atualizar valor do item:', error);
      });
  };

  const handleInputChange = (nome, tipo, valor) => {
    setInputs(prev => ({
      ...prev,
      [nome]: {
        ...prev[nome],
        [tipo]: valor
      }
    }));
  };

  const totalQuantidade = estoque.reduce((total, item) => total + item.quantidade, 0);
  const totalValor = estoque.reduce((total, item) => total + item.valor * item.quantidade, 0);

  return (
    <div className="bg-black min-h-screen">
      <NavBar />
      <section className="w-full flex flex-col items-center justify-start p-5">
        <h1 className="text-white font-bold text-2xl mt-5">Adicione seus itens ao Estoque</h1>
        <div className="flex flex-col lg:flex-row w-full p-2 lg:p-10 lg:mt-3 gap-2">
          <div className="w-full h-auto bg-gray-400 rounded-sm flex flex-col lg:flex-row lg:p-10 items-center justify-center p-5">
            <input id="NomeProduto" type="text" className="w-full md:w-1/2 p-1 m-1 rounded-md text-center" placeholder="Nome do produto" />
            <input id="valorProduto" type="text" className="w-full md:w-1/2 p-1 m-1 rounded-md text-center lg:w-28" placeholder="Valor Unidade" />
            <input id="QtdProduto" type="number" className="w-full md:w-1/2 p-1 m-1 rounded-md text-center lg:w-28" placeholder="Quantidade" />
            <button id="AddEstoque" className="w-full md:w-1/2 lg:w-16 bg-primary hover:bg-green-500 duration-200 sm:w-10 lg:h-10 m-1 rounded-md" onClick={addEstoque}>
              +
            </button>
            <button id="RemoveEstoque" className="w-full md:w-1/2 lg:w-16 bg-red-600 hover:bg-black hover:text-white duration-200 sm:w-10 lg:h-10 m-1 rounded-md" onClick={removeEstoque}>
              -
            </button>
          </div>
          <div className="bg-primary w-full rounded-sm flex flex-col lg:p-5 items-center justify-center pt-5">
            <h1 className="text-black font-bold m-4">Dados do Estoque Atual</h1>
            <div className="w-full flex flex-col md:flex-row md:justify-between px-3">
              <div className="w-full md:w-1/3 text-center">
                <p className="text-black font-semibold">Item</p>
              </div>
              <div className="w-full md:w-1/3 text-center">
                <p className="text-black font-semibold">Quantidade</p>
              </div>
              <div className="w-full md:w-1/3 text-center">
                <p className="text-black font-semibold">Valor</p>
              </div>
            </div>
            {estoque.map((item, index) => (
              <div key={index} className="w-full flex flex-col md:flex-row md:justify-between px-3 py-2">
                <div className="w-full md:w-1/3 text-center">
                  <p className="text-black font-semibold">{item.nome}</p>
                </div>
                <div className="w-full md:w-1/3 text-center">
                  <p className="text-black font-semibold">{item.quantidade}</p>
                  <input
                    type="number"
                    value={inputs[item.nome]?.quantidade || ''}
                    onChange={(e) => handleInputChange(item.nome, 'quantidade', e.target.value)}
                    className="w-full md:w-1/2 p-1 m-1 rounded-md text-center lg:w-28"
                    placeholder="Nova qtd"
                    onBlur={() => {
                      if (inputs[item.nome]?.quantidade) {
                        updateQuantidade(item.nome, inputs[item.nome].quantidade);
                      }
                    }}
                  />
                </div>
                <div className="w-full md:w-1/3 text-center">
                  <p className="text-black font-semibold">{item.valor}</p>
                  <input
                    type="number"
                    value={inputs[item.nome]?.valor || ''}
                    onChange={(e) => handleInputChange(item.nome, 'valor', e.target.value)}
                    className="w-full md:w-1/2 p-1 m-1 rounded-md text-center lg:w-28"
                    placeholder="Novo valor"
                    onBlur={() => {
                      if (inputs[item.nome]?.valor) {
                        updateValor(item.nome, inputs[item.nome].valor);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="w-full flex flex-col md:flex-row md:justify-between px-3 py-2">
              <div className="w-full md:w-1/3 text-center">
                <p className="text-black text-lg font-semibold">Qtd Total de itens:</p>
                <p className="text-red-500 text-lg font-bold">{totalQuantidade}</p>
              </div>
              <div className="w-full md:w-1/3 text-center">
                <p className="text-black text-lg font-semibold">Valor Total:</p>
                <p className="text-red-500 text-lg font-bold">R${totalValor}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-24 bg-third rounded-md flex justify-center md:justify-end items-center gap-3 px-2">
          <button className="bg-yellow-500 text-white p-2 rounded-sm">
            Imprimir ESTOQUE ATUAL
          </button>
          <button className="bg-red-500 text-white p-2 rounded-sm">
            Imprimir ESTOQUE TOTAL
          </button>
        </div>
      </section>
    </div>
  );
}
