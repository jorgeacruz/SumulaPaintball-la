export default function StatusGame(){
    return(
        <section className="bg-third w-[250px] h-auto rounded-md flex justify-center p-3">
            <div className="w-[280px] flex flex-col justify-start items-end gap-4">
               <div className="flex flex-col items-end">
                    <p className="font-semibold">Data da Partida</p>
                    <p id="dataPartida" className="font-semibold text-3xl">22/02/2024</p>
               </div>
               <div className="flex flex-col items-end">
                    <p className="font-semibold">Jogadores Ativos</p>
                    <p id="playerAtivo" className="font-semibold text-3xl">20</p>
               </div>
               <div className="flex flex-col items-end">
                    <p className="font-semibold">Jogadores Finalizados</p>
                    <p id="playerInativo" className="font-semibold text-3xl">0</p>
               </div>
               <div className="flex flex-col items-end">
                    <p className="font-semibold">Bolinhas Estoque</p>
                    <p id="playerInativo" className="font-semibold text-3xl">20.000</p>
               </div>
            </div>
        </section>
    )
}