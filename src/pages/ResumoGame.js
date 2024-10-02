import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResumoGame() {
    const navigate = useNavigate();
    const [jogo, setJogo] = useState({});
    const [pagamentos, setPagamentos] = useState([]);
    const [formasPagamento, setFormasPagamento] = useState({
        cartao: 0,
        dinheiro: 0,
        avulso: 0,
        pix: 0,
    });

    useEffect(() => {
        const storedData = localStorage.getItem('dataJogo');
        const storedHora = localStorage.getItem('horaJogo');

        if (storedData) {
            setJogo({ data: storedData, hora: storedHora });
        }

        const pagamentosArmazenados = JSON.parse(localStorage.getItem('pagamentos')) || [];
        setPagamentos(pagamentosArmazenados);

        // Calcula o total por forma de pagamento
        const totais = pagamentosArmazenados.reduce((acc, pagamento) => {
            const forma = pagamento.formaPagamento.toLowerCase();
            const valor = parseFloat(pagamento.valorTotal);
            if (forma in acc) {
                acc[forma] += valor;
            } else {
                acc[forma] = valor;
            }
            return acc;
        }, {
            cartao: 0,
            dinheiro: 0,
            avulso: 0,
            pix: 0,
        });

        setFormasPagamento(totais);
    }, []);

    // Função de impressão
    const imprimirResumo = () => {
        const conteudo = document.getElementById('resumo-partida').innerHTML;
        const janelaImpressao = window.open('', '', 'height=600,width=800');
        janelaImpressao.document.write('<html><head><title>Resumo da Partida</title>');
        janelaImpressao.document.write('<style>');
        janelaImpressao.document.write(`
            body { font-family: Arial, sans-serif; }
            .container { display: flex; justify-content: center; }
            .section { margin: 10px; padding: 10px; }
            h1, h2, p { text-align: center; }
            .summary-box { border: 1px solid black; padding: 20px; margin-bottom: 20px; }
        `);
        janelaImpressao.document.write('</style></head><body>');
        janelaImpressao.document.write(conteudo);
        janelaImpressao.document.write('</body></html>');
        janelaImpressao.document.close();
        janelaImpressao.focus();
        janelaImpressao.print();
        janelaImpressao.close();
    };

    const fecharPartida = () => {
        // Remove cada item individualmente
        localStorage.removeItem('pagamentos');
        localStorage.removeItem('dataJogo');
        localStorage.removeItem('horaJogo');
        
        navigate('/estoque'); // Redireciona para a página de estoque
    };

    return (
        <section id="resumo-partida" className="bg-black flex flex-col justify-center items-center pt-10">
            <h1 className="text-white text-3xl font-semibold">Resumo da Partida</h1>
            <div className="w-1/2 h-auto pt-10">
                <div className="grid grid-flow-row md:grid-cols-2 gap-2">
                    <div className="bg-primary rounded-md w-full h-30 flex flex-col justify-center items-center py-14">
                        <h1 className="text-2xl font-bold">Data Partida</h1>
                        <h2 id="datapartida" className="text-3xl font-semibold">{jogo.data || 'Carregando...'}</h2>
                    </div>
                    <div className="bg-primary rounded-md w-full h-30 flex flex-col justify-center items-center py-14">
                        <h1 className="text-2xl font-bold">Total Jogadores</h1>
                        <h2 id="totalJogadores" className="text-3xl font-semibold">{pagamentos.length}</h2>
                    </div>
                </div>
                <div className="bg-primary rounded-md w-full h-auto p-5 mt-3 gap-4 flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold">Formas de pagamento</h1>
                    <div className="w-full px-3">
                        <div className="flex flex-row justify-around items-start">
                            <p className="text-xl font-semibold">Crédito</p>
                            <p id="cartao">R${formasPagamento.cartao.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-row justify-around items-start">
                            <p className="text-xl font-semibold">Débito</p>
                            <p id="dinheiro">R${formasPagamento.dinheiro.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-row justify-around items-start">
                            <p className="text-xl font-semibold">Avulso</p>
                            <p id="avulso">R${formasPagamento.avulso.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-row justify-around items-start">
                            <p className="text-xl font-semibold">Pix</p>
                            <p id="pix">R${formasPagamento.pix.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-flow-row md:grid-cols-2 gap-2 mt-3">
                    <div className="bg-[#1D0C82] rounded-md w-full h-30 flex flex-col justify-center items-center py-14">
                        <h1 className="text-white text-2xl font-bold">Avulso</h1>
                        <h2 id="avulsoTotal" className="text-primary text-3xl font-semibold">R${formasPagamento.avulso.toFixed(2)}</h2>
                    </div>
                    <div className="bg-[#1D0C82] rounded-md w-full h-30 flex flex-col justify-center items-center py-14">
                        <h1 className="text-white text-2xl font-bold">Valor da Partida</h1>
                        <h2 id="valorPartida" className="text-primary text-3xl font-semibold">
                            R${Object.values(formasPagamento).reduce((acc, val) => acc + val, 0).toFixed(2)}
                        </h2>
                    </div>
                </div>
                <div className="grid grid-flow-row md:grid-cols-2 p-2 gap-2">
                    <button
                        onClick={imprimirResumo}
                        className="bg-primary hover:bg-green-700 duration-300 text-black hover:text-white font-semibold p-5 rounded-md"
                    >
                        <p>Imprimir Resumo</p>
                    </button>
                    <button 
                        onClick={fecharPartida} 
                        className="bg-white hover:bg-red-700 duration-300 text-black hover:text-white font-semibold p-5 rounded-md">
                        <p>Fechar Partida</p>
                    </button>
                </div>
            </div>
        </section>
    );
}
