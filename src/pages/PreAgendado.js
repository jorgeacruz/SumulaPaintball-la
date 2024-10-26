
export default function PreAgendado() {

    return (
      <section className="p-4 w-full h-screen flex flex-col items-center">
       <div className="gap-2 flex flex-col lg:flex-row justify-center items-center w-auto">
           <h1 className="text-white text-3xl text-center m-5">Jogos Pre-Agendado</h1> 
       </div>
               <table className="w-full flex flex-col">
                   <thead className="bg-primary text-black">
                       <tr className="flex justify-around">
                           
                           <th className="w-full flex justify-start">Data</th>
                           <th className="w-full flex justify-start">Nome Lider</th>
                           <th className="w-full flex justify-start">Contato</th>
                           <th className="w-full flex justify-start">Ação</th>
                       </tr>
                   </thead>
                   <tbody className="">
                       <tr className="p-1 text-white flex justify-around items-center border border-gray-500">
                           <td className="w-full">12/12/2024</td>
                           <td className="w-full">João Carlos</td>
                           <td className="w-full">(21) 98768-5024</td>
                           <td className="w-full flex gap-2">
                               <button className="rounded-md bg-primary p-2 text-black  hover:bg-black duration-300 hover:text-white">
                                   Mostrar Equipe
                               </button>
                               <button className="rounded-md bg-green-600 p-2 hover:bg-black duration-300">
                                   Entrar em contato
                               </button>
                           </td>
                             
                       </tr>  
                   </tbody>
               </table>            
      </section>
    );
   }