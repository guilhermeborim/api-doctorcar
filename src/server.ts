import { app } from "./app";

const port = 3334;

app.listen(port, () => {
  console.log("Aplicação executando na porta ", port);
});
