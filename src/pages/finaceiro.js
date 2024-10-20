import { useState } from "react"; 
import Datepicker from "react-tailwindcss-datepicker";

export default function Financeiro() {

    const [value, setValue] = useState({ 
        startDate: null, 
         endDate: null
      });

 return (
   <section className="p-4 w-full h-screen flex flex-col items-center">
    
     <div className="flex flex-col lg:flex-row justify-center items-center w-1/2">
        <h1 className="text-white text-3xl text-center m-5">Departamento Financeiro</h1>
        
        <div className="w-1/2">
            <Datepicker
                displayFormat="DD/MM/YYYY"
                placeholder="Selecione a data"
                separator="a"  
                value={value}  
                onChange={newValue => setValue(newValue)}
                primaryColor={"yellow"}
                useRange={true}
                asSingle={false}
                showFooter={true}
                showShortcuts={true}
                configs={{
                    shortcuts:{
                        today:"Hoje",
                        yesterday:"Ontem",
                        currentMonth: "Mês Atual",
                        pastMonth: "Mês Passado"
                    },
                    footer: {
                        cancel: "Cancelar",
                        apply: "Aplicar"
                    }
                }}
            />
        </div>
     </div>

            <table className="w-full flex flex-col">
                <thead className="bg-primary text-black">
                    <tr className="flex justify-around">
                        <th className="w-full flex justify-start">Numero</th>
                        <th className="w-full flex justify-start">Data</th>
                        <th className="w-full flex justify-start">Débito</th>
                        <th className="w-full flex justify-start">Crédito</th>
                        <th className="w-full flex justify-start">Pix</th>
                        <th className="w-full flex justify-start">Dinheiro</th>
                        <th className="w-full flex justify-start">Total</th>
                    </tr>
                </thead>
                <tbody className="">
                    <tr className="p-1 text-white flex justify-around hover:bg-green-700 duration-300 border border-gray-500">
                        <td className="w-full">0001</td>
                        <td className="w-full">12/12/2024</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>   
                    </tr>
                    <tr className="p-1 text-white flex justify-around hover:bg-green-700 duration-300 border border-gray-500">
                        <td className="w-full">0001</td>
                        <td className="w-full">12/12/2024</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>   
                    </tr>
                    <tr className="p-1 text-white flex justify-around hover:bg-green-700 duration-300 border border-gray-500">
                        <td className="w-full">0001</td>
                        <td className="w-full">12/12/2024</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>   
                    </tr>
                    <tr className="p-1 text-white flex justify-around hover:bg-green-700 duration-300 border border-gray-500">
                        <td className="w-full">0001</td>
                        <td className="w-full">12/12/2024</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>
                        <td className="w-full">R$250</td>   
                    </tr>
                    
                </tbody>
            </table>            
   </section>
 );
}