import Layout from "../Componentes/layout";

export default function TermosDeUso() {
    return (
        <Layout>
            <div className="bg-white">
                <div className="bg-white py-20 px-8 max-w-5xl mx-auto text-gray-800 space-y-6">
                    <h1 className="text-3xl font-bold text-blue-700">Termos de Uso</h1>

                    <p>
                        Estes termos regulam o uso do site da IRIS e seus serviços relacionados. Ao acessar nosso site, você concorda com estas condições.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">1. Aceitação dos Termos</h2>
                    <p>
                        Ao utilizar este site, você declara que leu, compreendeu e aceitou os termos aqui descritos.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">2. Serviços Oferecidos</h2>
                    <p>
                        O site da IRIS permite doações, cadastro de voluntários, acesso a informações institucionais e recursos educativos.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">3. Cadastro e Responsabilidades</h2>
                    <p>
                        O usuário deve fornecer informações verídicas e manter seus dados atualizados. O uso indevido do site pode resultar em bloqueio ou exclusão.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">4. Propriedade Intelectual</h2>
                    <p>
                        Todo o conteúdo do site, incluindo textos, imagens e logotipos, pertence à IRIS e não pode ser reproduzido sem autorização.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">5. Limitação de Responsabilidade</h2>
                    <p>
                        A IRIS não se responsabiliza por danos causados por interrupções no serviço, falhas técnicas ou uso indevido da plataforma por terceiros.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">6. Modificações no Conteúdo</h2>
                    <p>
                        Podemos alterar ou descontinuar funcionalidades do site a qualquer momento, sem aviso prévio.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">7. Legislação Aplicável</h2>
                    <p>
                        Estes termos são regidos pela legislação brasileira, especialmente pela Lei Geral de Proteção de Dados (LGPD).
                    </p>
                </div>
            </div>
        </Layout>
    );
}
