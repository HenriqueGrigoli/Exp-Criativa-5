import Layout from "../Componentes/layout";

export default function PoliticaPrivacidade() {
    return (
        <Layout>
            <div className="bg-white">
                <div className="py-20 px-8 max-w-5xl mx-auto text-gray-800 space-y-6">
                    <h1 className="text-3xl font-bold text-blue-700">Política de Privacidade</h1>

                    <p>
                        Esta política explica como a IRIS coleta, utiliza, armazena e protege os dados pessoais e sensíveis dos usuários que interagem com nosso site e nossos serviços, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD – Lei nº 13.709/2018).
                    </p>

                    <h2 className="text-xl font-semibold mt-8">1. Dados Coletados</h2>
                    <p>
                        Coletamos dados pessoais como nome, e-mail, telefone, endereço e histórico de doações. Também coletamos dados sensíveis, como informações de saúde dos refugiados, com a finalidade de oferecer assistência adequada. Além disso, são coletados dados de navegação (IP, cookies, tipo de navegador) para análise e melhoria da plataforma.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">2. Finalidade do Uso</h2>
                    <p>
                        Utilizamos os dados para:
                        <ul className="list-disc list-inside mt-2">
                            <li>Processar doações e emitir boletos;</li>
                            <li>Realizar triagens sociais e acolhimento adequado dos refugiados;</li>
                            <li>Enviar comunicações informativas e institucionais;</li>
                            <li>Personalizar e melhorar a experiência do usuário no site.</li>
                        </ul>
                    </p>

                    <h2 className="text-xl font-semibold mt-8">3. Consentimento</h2>
                    <p>
                        O tratamento de dados sensíveis, como informações de saúde, será realizado com consentimento explícito do titular ou seu responsável legal, conforme Art. 11 da LGPD.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">4. Compartilhamento de Dados</h2>
                    <p>
                        Podemos compartilhar dados com prestadores de serviços como gateways de pagamento, serviços de triagem social ou parceiros de acolhimento, sempre mediante contrato que assegure confidencialidade e segurança das informações.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">5. Armazenamento e Segurança</h2>
                    <p>
                        Os dados são armazenados em servidores com medidas técnicas e administrativas adequadas para evitar acessos não autorizados, vazamentos ou alterações indevidas.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">6. Tempo de Retenção</h2>
                    <p>
                        Os dados serão mantidos pelo tempo necessário para atingir as finalidades descritas nesta política ou conforme exigido por obrigações legais e regulatórias.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">7. Direitos do Titular</h2>
                    <p>
                        O usuário pode solicitar:
                        <ul className="list-disc list-inside mt-2">
                            <li>Acesso aos dados pessoais;</li>
                            <li>Correção de dados incompletos ou desatualizados;</li>
                            <li>Revogação do consentimento;</li>
                            <li>Exclusão dos dados, exceto quando a lei exigir sua manutenção.</li>
                        </ul>
                        Para exercer seus direitos, envie uma solicitação para <strong>contato@iris.org.br</strong>.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">8. Uso de Cookies</h2>
                    <p>
                        Utilizamos cookies para melhorar a experiência de navegação e análise de uso do site. Você pode configurar seu navegador para recusá-los, mas isso pode afetar algumas funcionalidades.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">9. Atualizações</h2>
                    <p>
                        Esta política pode ser atualizada periodicamente. Recomendamos a leitura regular desta seção para se manter informado sobre alterações.
                    </p>
                </div>
            </div>
        </Layout>
    );
}