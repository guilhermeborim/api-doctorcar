import { app } from "./app";
import { pool } from "./config/database";

pool.query("SELECT $1::int AS number", ["2"], function (err: any, res: any) {
  if (err) {
    return console.error("error running query, postgres isnt work", err);
  }
  console.log("test database passed, number:", res.rows[0].number);
});

const port = 3334;

app.listen(port, () => {
  console.log("Aplicação executando na porta ", port);
});
