export default function ResumoGame() {
    return (
       <section className="bg-black flex flex-col justify-center items-center pt-10">
           <h1 className="text-white text-3xl font-semibold">Resumo da Partida</h1>
           <div className="w-1/2 h-auto pt-10">
               <div className="grid grid-flow-row md:grid-cols-2 gap-2">
                   <div className="bg-primary rounded-md w-full h-30 flex flex-col justify-center items-center py-14">
                       <h1 className="text-2xl font-bold">Data Partida</h1>
                       <h2 id="datapartida" className="text-3xl font-semibold">12/12/2024</h2>
                   </div>
                   <div className="bg-primary rounded-md w-full h-30 flex flex-col justify-center items-center py-14">
                       <h1 className="text-2xl font-bold">Total Jogadores</h1>
                       <h2 id="totalJogadores" className="text-3xl font-semibold">44</h2>
                   </div>
               </div>
               <div className="bg-primary rounded-md w-full h-auto p-5 mt-3 gap-4 flex flex-col justify-center items-center">
                   <h1 className="text-2xl font-bold">Formas de pagamento</h1>
                   <div className="w-full px-3">
                       <div className="flex flex-row justify-around items-start">
                           <p className="text-xl font-semibold">Crédito</p>
                           <p id="credito">R$200,00</p>
                       </div>
                       <div className="flex flex-row justify-around items-start">
                           <p className="text-xl font-semibold">Debito</p>
                           <p>R$200,00</p>
                       </div>
                       <div className="flex flex-row justify-around items-start">
                           <p className="text-xl font-semibold">Avulso</p>
                           <p>R$200,00</p>
                       </div>
                       <div className="flex flex-row justify-around items-start">
                           <p className="text-xl font-semibold">Pix</p>
                           <p>R$200,00</p>
                       </div>
                   </div>
               </div>
               <div className="grid grid-flow-row md:grid-cols-2 gap-2 mt-3">
                   <div className="bg-[#1D0C82] rounded-md w-full h-30 flex flex-col justify-center items-center py-14">
                       <h1 className="text-white text-2xl font-bold">Data Partida</h1>
                       <h2 id="datapartida" className="text-primary text-3xl font-semibold">12/12/2024</h2>
                   </div>
                   <div className="bg-[#1D0C82] rounded-md w-full h-30 flex flex-col justify-center items-center py-14">
                       <h1 className="text-white text-2xl font-bold">Total Jogadores</h1>
                       <h2 id="totalJogadores" className="text-primary text-3xl font-semibold">44</h2>
                   </div>
               </div>
               <div className="grid grid-flow-row md:grid-cols-2 p-2 gap-2">
                   <button className="bg-primary hover:bg-green-700 duration-300 text-black hover:text-white font-semibold p-5 rounded-md">
                       <p>Imprimir Resumo</p>
                   </button>
                   <button className="bg-white hover:bg-red-700 duration-300 text-black hover:text-white font-semibold p-5 rounded-md">
                       <p>Fechar Partida</p>
                   </button>
               </div>
           </div>
       </section>
    );
   }