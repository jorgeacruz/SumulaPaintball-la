
import { FaPlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

export default function cadEquipe() {
 return (
    <section className="w-full h-screen flex flex-col items-center p-5">
    <div className="flex flex-col justify-center items-center gap-2 mb-7">
      <h1 className="text-white text-4xl font-semibold m-3">Cadastro de Equipe</h1>
      <h2 className="text-white">Adicione todos os jogadores da sua equipe </h2>
      <h2 className="text-red-600">Depois de cadastrar todos os jogadores, clique em finalizar cadastro. </h2>
    </div>
     
      <div id="cadEquipe" className="p-1 w-full flex flex-col lg:flex-row justify-center items-center gap-2">

          <input type="text" placeholder="Nome e Sobrenome" id="nomeJogador" className="text-center rounded-sm p-2"/>
          <input type="email" placeholder="Email do Jogador" id="emailJogador" className="text-center rounded-sm p-2"/>
          <input type="text" placeholder="Telefone Jogador" id="telJogador" className="text-center rounded-sm p-2"/>
          <input type="text" placeholder="Idade do Jogador" id="idadeJogador" className="text-center rounded-sm p-2"/>
        
          <button className="w-[220px] lg:w-10 h-10 rounded-sm bg-primary hover:bg-green-600 duration-300 p-2 flex justify-center items-center">
            <FaPlus size={20} />
          </button>
          
      </div>

      <div className="text-white  p-1 gap-3 w-full h-[200px] flex flex-col  justify-center items-center">
        
        <div className="w-4/6 flex flex-col justify-center items-center lg:flex-row sm:justify-between ">
          <span>Jorge Cruz</span>
          <span>j.alexcruz@gmail.com</span>
          <span>(21) 98768-5024</span>
          <span>50 anos</span>

          <div className="flex flex-col lg:flex-row gap-2">
            <button className="w-[220px] lg:w-10 h-10 rounded-sm bg-white hover:bg-secondary duration-300 p-2 flex justify-center items-center">
              <FaTrashAlt color="#000" size={15}/>
            </button>
            <button className="w-[220px] lg:w-10 h-10 rounded-sm bg-white hover:bg-primary duration-300 p-2 flex justify-center items-center">
              <FaEdit color="#000" size={15}/>
            </button>
          </div>
         
        </div>

        <div className="w-4/6 flex flex-col justify-center items-center lg:flex-row sm:justify-between ">
          <span>Jorge Cruz</span>
          <span>j.alexcruz@gmail.com</span>
          <span>(21) 98768-5024</span>
          <span>50 anos</span>

          <div className="flex flex-col lg:flex-row gap-2">
            <button className="w-[220px] lg:w-10 h-10 rounded-sm bg-white hover:bg-secondary duration-300 p-2 flex justify-center items-center">
              <FaTrashAlt color="#000" size={15}/>
            </button>
            <button className="w-[220px] lg:w-10 h-10 rounded-sm bg-white hover:bg-primary duration-300 p-2 flex justify-center items-center">
              <FaEdit color="#000" size={15}/>
            </button>
          </div>

        </div>

      </div> 
      <div>
          <button className="w-[220px] lg:w-[220px] h-10 rounded-sm bg-green-600 hover:scale-110 duration-300 p-2 flex justify-center items-center">
            <span className="text-white">FINALIZAR CADASTRO</span>
          </button>
      </div> 
  </section>
 );
}