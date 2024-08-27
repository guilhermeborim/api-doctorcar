import { app } from "./app";

const PORT = 33458;

const server = app.listen(PORT, () =>
  console.log(`App ouvindo na porta ${PORT}`),
);

process.on("SIGINT", () => {
  server.close();
  console.log("App finalizado");
});
