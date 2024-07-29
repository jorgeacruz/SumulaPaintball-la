import React from 'react';
import NavBar from '../Componentes/Navbar';

export default function Estoque() {
  return (
    <div>
        <NavBar/>
        <section className="w-full flex flex-col items-center justify-start p-5">
          <h1 className="text-white font-bold text-2xl mt-5">Adicione seus itens ao Estoque</h1>
          
          <div className="flex flex-col lg:flex-row w-full p-2 lg:p-10 lg:mt-3 gap-2">

            <div className="w-full h-auto bg-gray-400 rounded-sm flex flex-col lg:flex-row lg:p-10 items-center justify-center p-5">
              <input id="NomeProduto" type="text" className="w-full md:w-1/2 p-1 m-1 rounded-md text-center" placeholder="Nome do produto"/>
              <input id="valorProduto" type="text" className="w-full md:w-1/2 p-1 m-1 rounded-md text-center lg:w-28" placeholder="Valor Unidade"/>
              <input id="QtdProduto" type="number" className="w-full md:w-1/2 p-1 m-1 rounded-md  text-center lg:w-28" placeholder="Quantidade"/>
              <button id="AddEstoque" className="w-full md:w-1/2 lg:w-16 bg-primary hover:bg-green-500 duration-200 sm:w-10 lg:h-10 m-1 rounded-md">
                +
              </button>
              <button id="RemoveEstoque" className="w-full md:w-1/2 lg:w-16 bg-red-600 hover:bg-black hover:text-white duration-200 sm:w-10 lg:h-10 m-1 rounded-md">
                -
              </button>
    
            </div>
            
            <div className="bg-primary w-full rounded-sm flex flex-col lg:p-5 items-center justify-center pt-5">
              <h1 className="text-black font-bold m-4">Dados do Estoque Atual</h1>

              <div className="w-full flex flex-col justify-center items-center md:flex-row md:justify-between px-3">
                <div>
                  <p className="text-black font-semibold">Item</p>
                </div>
                <div>
                  <p className="text-black font-semibold">Quantidade</p>
                </div>
                <div>
                  <p className="text-black font-semibold">Valor</p>
                </div>
              </div>
              
              <div className="w-full h-auto m-10 p-2 flex flex-col justify-center items-center md:flex-row md:items-center gap-2">
                
                <div className="w-full">
                  <p className="text-black font-semibold">Quantidade Total de itens</p>
                  <h1 className="text-2xl text-red-600 font-semibold">4.678 itens</h1>
                </div>
                <div className="w-full">
                  <p className="text-black font-semibold">Valor do Estoque</p>
                  <h1 className="text-2xl text-red-600 font-semibold">R$ 44.678,00</h1>
                </div>

              </div>
            </div>

          </div>
          
          <div className="w-full h-24 bg-third rounded-md flex justify-center md:justify-end items-center  gap-3 px-2">
              <button className="bg-black text-white p-2 rounded-sm">
                Imprimir ESTOQUE ATUAL
              </button>
              <button className="bg-red-500 text-white p-2 rounded-sm">
                Imprimir ESTOQUE TOTAL
              </button>
          </div>

        </section>
    </div>
      
  )
}
