import request from "supertest";
import { app } from "../app"; // Caminho para o arquivo principal do Express
import { pool } from "../config/database"; // A conexão com o banco de dados

// Mockar o pool de conexão e a função de autenticação
jest.mock("../config/database", () => ({
  pool: {
    query: jest.fn(),
  },
}));

jest.mock("../middleware/auth", () =>
  jest.fn((req, res, next) => {
    req.tokenData = { id: "738cb54a-b59d-452e-99bd-4e24ab8dacdc" }; // Simular token decodificado
    next();
  }),
);

describe("GET /user", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpar mocks antes de cada teste
  });

  it("should return a user successfully", async () => {
    const userId = "738cb54a-b59d-452e-99bd-4e24ab8dacdc";

    (pool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: userId, name: "Guilherme Machado Borim" }],
    });

    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer fakeToken`)
      .send();
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toBe(userId);
    expect(response.body.data.name).toBe("Guilherme Machado Borim");
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(pool.query).toHaveBeenCalledWith(
      `SELECT * FROM "user" WHERE id = '${userId}'`,
    );
  });
});
