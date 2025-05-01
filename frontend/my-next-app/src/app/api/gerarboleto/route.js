export async function POST(request) {
  const { valor } = await request.json();

  // Validação do valor (fallback para 10 reais caso não venha valor válido)
  const valorReais = parseFloat(valor);
  const valorCentavos = isNaN(valorReais) || valorReais <= 0
    ? 1000 // fallback: R$10,00
    : Math.round(valorReais * 100);

  const payload = {
    apiKey: "apk_44561885-DGmmViOUtDshThlWlmMINikxjodgqocp",
    order_id: `doacao-${Date.now()}`,
    payer_email: "anonimo@doacao.com",
    payer_name: "Doador Anônimo",
    payer_cpf_cnpj: "00000000191",
    payer_phone: "11999999999",
    payer_street: "Rua Desconhecida",
    payer_number: "0",
    payer_complement: "",
    payer_district: "Centro",
    payer_city: "São Paulo",
    payer_state: "SP",
    payer_zip_code: "01001000",
    notification_url: "https://seusite.com/notification/paghiper/",
    type_bank_slip: "boletoA4",
    days_due_date: "3",
    fixed_description: true,
    late_payment_fine: "2",
    per_day_interest: true,
    items: [
      {
        description: "Doação Anônima",
        quantity: "1",
        item_id: "1",
        price_cents: `${valorCentavos}`
      }
    ]
  };

  try {
    const response = await fetch("https://api.paghiper.com/transaction/create/", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Accept-Charset": "UTF-8",
        "Accept-Encoding": "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("Resposta do PagHiper:", data);

    if (response.status === 201 && data.create_request?.result === "success") {
      return new Response(JSON.stringify({
        url_slip: data.create_request.bank_slip.url_slip,
        digitable_line: data.create_request.bank_slip.digitable_line,
        transaction_id: data.create_request.transaction_id
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      console.error("Erro ao gerar boleto:", data);
      return new Response(JSON.stringify({ error: data }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("Erro interno:", error);
    return new Response(JSON.stringify({ error: "Erro interno no servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
