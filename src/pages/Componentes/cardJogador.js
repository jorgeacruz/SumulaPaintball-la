

export default function CardJogador() {
 return (
   <div>
    <section id='jogador' className="w-[300px] h-auto rounded-lg bg-white">

<header className="bg-primary w-full p-3 rounded-t-lg gap-2 flex flex-col justify-center items-center text-black font-normal md:flex-col md:justify-between">
<p className="text-black">Jogador</p>
    <div className="flex flex-col justify-center items-center gap-2 md:flex-row md:justify-between">
        <input id='numJogador' type="text" className=" text-center w-10 rounded-sm px-2 py-1" placeholder="N°"/>
        <input id='nomeJogador' type="text" className="text-center w-44 rounded-sm px-2 py-1" placeholder="Jogador"/>
        <div class="inline-flex">
          <button class="bg-white hover:bg-green-600 text-black py-1 px-2 rounded-l">
            +
          </button>
          <button class="bg-black hover:bg-primary py-1 px-2 rounded-r text-white">
            -
          </button>
        </div>
    </div>
</header>
  {
    // Itens Obrigatorio
  }
<div className="w-full h-auto p-2" id="itemsObrigatorio">
<div className="p-2 flex flex-col justify-center items-center gap-2 md:flex-row md:justify-between">
  <input type="text" className="w-full border border-slate-400 rounded px-2 p-1 text-center" placeholder="Selecione o item"/>
  <div class="inline-flex">
    <button class="bg-black hover:bg-primary py-1 px-2 rounded text-white">
      +
    </button>
  </div>
</div>
{
  // items adicionados
}
  <div className="p-2 flex flex-col justify-center items-center md:flex-row md:justify-between">
    <div class="inline-flex">
      <button class="bg-black hover:bg-red-500 py-1 px-2 rounded text-white">
        -
      </button>
    </div>
    <p>Recarga 50</p>
    <p>R$25,00</p>
  </div>
  <div className="p-2 flex flex-col justify-center items-center md:flex-row md:justify-between">
    <div class="inline-flex">
      <button class="bg-black hover:bg-red-500 py-1 px-2 rounded text-white">
        -
      </button>
    </div>
    <p>Recarga 50</p>
    <p>R$25,00</p>
  </div>
</div>

{
  // fecha pedido individual
  // valor total
}
<div class="inline-flex p-2">
  <button class="w-[180px] bg-gray-300 hover:bg-red-600 text-gray-800 font-bold py-2 px-4 rounded-l">
    Fechar Pedido
  </button>
  <p class="bg-black text-white font-bold py-2 px-4 rounded-r ">
    R$150,00
  </p>
</div>
</section>
   </div>
 );
}