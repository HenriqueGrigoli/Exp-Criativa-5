import axios from 'axios';

export async function POST(request) {
  const dados = await request.json();

  const boletoData = {
    apiKey: 'apk_44561885-DGmmViOUtDshThlWlmMINikxjodgqocp',
    token: 'FWYOTDMBS8FY28JFVWYGWZN6F26NA8AGX8T1V126QE9V',
    order_id: Date.now().toString(),
    payer_email: dados.email,
    payer_name: dados.nome,
    payer_cpf_cnpj: dados.cpf,
    payer_phone: dados.telefone,
    payer_street: dados.rua,
    payer_number: dados.numero,
    payer_complement: dados.complemento,
    payer_district: dados.bairro,
    payer_city: dados.cidade,
    payer_state: dados.estado,
    payer_zip_code: dados.cep,
    notification_url: 'https://seusite.com/notificacao',
    type_bank_slip: 'boletoA4',
    days_due_date: '3',
    items: [
      {
        description: 'Doação Voluntária',
        quantity: 1,
        item_id: '1',
        price_cents: 1000, // R$10,00
      },
    ],
  };

  try {
    const response = await axios.post(
      'https://api.paghiper.com/transaction/create/',
      boletoData
    );

    return Response.json(response.data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
