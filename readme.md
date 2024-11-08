CONFIGURAÇÕES DE RETORNO API

- STATUS: 200
- MESSAGE: MENSAGEM COM BASE NO QUE FOI FEITO
- DATA: O DADO DO RETORNO DO QUE FOI FEITO

return response.json({
status: 200,
message: "Vehicle created",
data: registerSaved,
});
