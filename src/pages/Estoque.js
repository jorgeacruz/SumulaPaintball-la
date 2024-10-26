import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../pages/Componentes/Navbar';
import { useNavigate } from 'react-router-dom';

//icons
import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

export default function Estoque() {
  const navigate = useNavigate();
  const [estoque, setEstoque] = useState([]);
  const [inputs, setInputs] = useState({});
  const [editMode, setEditMode] = useState({});
  

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      navigate("/");  
    }
  }, [navigate]);
  
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

  const toggleEditMode = (nome) => {
    setEditMode(prev => ({ ...prev, [nome]: !prev[nome] }));
  };

  const totalQuantidade = estoque.reduce((total, item) => total + item.quantidade, 0);
  const totalValor = estoque.reduce((total, item) => total + item.valor * item.quantidade, 0);

  
  const formatEstoqueToText = () => {
    return estoque.map(item => 
      `Produto: ${item.nome}, Quantidade: ${item.quantidade}, Valor: R$${item.valor}, Valor Total: R$${(item.valor * item.quantidade).toFixed(2)}`
    ).join('\n');
  };

  
  const saveEstoqueToFile = () => {
    const estoqueText = formatEstoqueToText();
    const blob = new Blob([estoqueText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'estoque.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const printEstoque = () => {
    const estoqueText = formatEstoqueToText();
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write('<pre>' + estoqueText + '</pre>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <NavBar />
      <section className="w-full max-w-4xl flex flex-col items-center justify-center p-5">
        <h1 className="text-white font-bold text-2xl mt-5 mb-10">Gerenciamento de Estoque</h1>
        
        <div className="w-full h-auto bg-gray-400 rounded-sm flex flex-col p-5 items-center justify-center mb-5">
          <h2 className="text-black font-bold mb-5">Adicionar/Remover Itens</h2>
          <input id="NomeProduto" type="text" className="w-full md:w-1/2 p-2 m-2 rounded-md text-center" placeholder="Nome do produto" />
          <input id="valorProduto" type="text" className="w-full md:w-1/2 p-2 m-2 rounded-md text-center" placeholder="Valor Unidade" />
          <input id="QtdProduto" type="number" className="w-full md:w-1/2 p-2 m-2 rounded-md text-center" placeholder="Quantidade" />
          <div className="flex space-x-4 mt-3">
            <button id="AddEstoque" className="bg-primary hover:bg-green-500 duration-200 p-2 rounded-md" onClick={addEstoque}>
              Adicionar
            </button>
            <button id="RemoveEstoque" className="bg-red-600 hover:bg-black hover:text-white duration-200 p-2 rounded-md" onClick={removeEstoque}>
              Remover
            </button>
          </div>
        </div>

        {
          /*
            Desconto Programado
          */
        }
          <div className="w-full h-auto bg-red-600 rounded-sm flex flex-col p-5 items-center justify-center mb-5 ">
                    <h2 className="font-bold mb-5 text-white">Desconto Programado</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center">
                      <input id="NomeProduto" type="text" className="w-full md:w-1/2 p-2 m-2 rounded-md text-center" placeholder="Nome do Desconto" />
                      <input id="valorProduto" type="text" className="w-full md:w-1/2 p-2 m-2 rounded-md text-center" placeholder="Percentagem do desconto" />

                      <button id="AddEstoque" className="bg-primary hover:bg-green-500 duration-200 w-auto p-3 h-10 rounded-md flex items-center justify-center" >
                        <FaPlus/> Adicionar
                      </button>
                      <button id="RemoveEstoque" className="bg-red-600  hover:bg-black text-white duration-200 w-auto p-3 h-10 rounded-md flex items-center justify-center m-3" >
                      <FaRegEdit/> Editar
                      </button>
                    </div>
              </div>
        {
          /*
            Desconto Programado
          */
        }

        <div className="bg-primary w-full max-w-4xl rounded-sm flex flex-col p-5 items-center justify-center">
          <h2 className="text-black font-bold mb-5">Estoque Atual</h2>
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-between px-3">
              <p className="text-black font-semibold w-1/4 text-center">Item</p>
              <p className="text-black font-semibold w-1/4 text-center">Quantidade</p>
              <p className="text-black font-semibold w-1/4 text-center">Valor Unidade</p>
              <p className="text-black font-semibold w-1/4 text-center">Valor Total</p>
            </div>
            {estoque.map((item, index) => (
              <div key={index} className="w-full flex justify-between items-center px-3 py-2 border-t border-gray-300">
                <div className="w-1/4 text-center">
                  <p className="text-black font-semibold">{item.nome}</p>
                </div>
                <div className="w-1/4 text-center">
                  <div className="flex items-center justify-center">
                    <p className="text-black font-semibold">{item.quantidade}</p>
                    {editMode[item.nome] && (
                      <input
                        type="number"
                        value={inputs[item.nome]?.quantidade || ''}
                        onChange={(e) => handleInputChange(item.nome, 'quantidade', e.target.value)}
                        className="w-24 p-1 m-1 rounded-md text-center"
                        placeholder="Nova qtd"
                        onBlur={() => {
                          if (inputs[item.nome]?.quantidade) {
                            updateQuantidade(item.nome, inputs[item.nome].quantidade);
                            toggleEditMode(item.nome);
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="w-1/4 text-center">
                  <div className="flex items-center justify-between">
                    <p className="text-black font-semibold w-full">{item.valor}</p>
                    {editMode[item.nome] && (
                      <input
                        type="number"
                        value={inputs[item.nome]?.valor || ''}
                        onChange={(e) => handleInputChange(item.nome, 'valor', e.target.value)}
                        className="w-24 p-1 m-1 rounded-md text-center"
                        placeholder="Novo valor"
                        onBlur={() => {
                          if (inputs[item.nome]?.valor) {
                            updateValor(item.nome, inputs[item.nome].valor);
                            toggleEditMode(item.nome); 
                          }
                        }}
                      />
                    )}
                    <button 
                      className="ml-6 text-blue-500 hover:text-blue-700"
                      onClick={() => toggleEditMode(item.nome)}
                    >
                      {editMode[item.nome] ? 'Cancelar' : 'Editar'}
                    </button>
                  </div>
                </div>
                <div className="w-1/4 text-center">
                  <p className="text-black font-semibold">R${(item.valor * item.quantidade).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-between px-3 py-5 mt-5 border-t border-gray-300">
            <div className="w-1/3 text-center">
              <p className="text-black text-lg font-semibold">Qtd Total de itens:</p>
              <p className="text-red-500 text-lg font-bold">{totalQuantidade}</p>
            </div>
            <div className="w-1/3 text-center">
              <p className="text-black text-lg font-semibold">Valor Total:</p>
              <p className="text-red-500 text-lg font-bold">R${totalValor.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="w-full h-24 bg-third rounded-md flex justify-center md:justify-end items-center gap-3 px-2 mt-5">
          <button 
            className="bg-yellow-500 text-white p-2 rounded-sm"
            onClick={printEstoque}
          >
            Imprimir ESTOQUE ATUAL
          </button>
          <button 
            className="bg-red-500 text-white p-2 rounded-sm"
            onClick={saveEstoqueToFile}
          >
            Salvar ESTOQUE EM ARQUIVO
          </button>
        </div>
      </section>
    </div>
  );
}
