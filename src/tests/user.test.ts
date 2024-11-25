import { create, login } from "../controllers/user";
import { prismaMock } from "../singleton";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("Create User", () => {
  test("should create new user", async () => {
    const user = {
      id: "1",
      name: "Teste",
      email: "teste1234@gmail.com",
      password: "teste123",
      createdAt: new Date(),
      updatedAt: new Date(),
      profile_picture: "teste",
    };

    prismaMock.user.create.mockResolvedValue(user);

    await expect(create(user)).resolves.toEqual(
      expect.objectContaining({
        status: 200,
        message: "Conta criada com sucesso",
        data: expect.objectContaining({
          email: "teste1234@gmail.com",
          name: "Teste",
        }),
      }),
    );
  });

  test("should handle an error for duplicate email", async () => {
    const user = {
      id: "1",
      name: "Teste",
      email: "teste543@gmail.com",
      password: "teste123",
      createdAt: new Date(),
      updatedAt: new Date(),
      profile_picture: "teste",
    };

    prismaMock.user.findUnique.mockResolvedValue(user);

    await expect(create(user)).resolves.toEqual(
      expect.objectContaining({
        status: 400,
        message: "Email já está em uso",
        data: null,
      }),
    );
  });

  test("should handle error when creating a new user", async () => {
    const user = {
      id: "1",
      name: "Teste",
      email: "teste1234@gmail.com",
      password: "teste123",
      createdAt: new Date(),
      updatedAt: new Date(),
      profile_picture: "teste",
    };

    const mockError = new Error("Database connection error");
    prismaMock.user.create.mockRejectedValue(mockError);

    await expect(create(user)).resolves.toEqual(
      expect.objectContaining({
        status: 500,
        message: "Erro no servidor",
        data: "Database connection error",
      }),
    );

    expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        email: "teste1234@gmail.com",
        name: "Teste",
      }),
    });
  });
});

describe("Login User", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return error when user is not found", async () => {
    const user = {
      email: "naoexiste123@gmail.com",
      password: "senha123",
    };

    prismaMock.user.findUnique.mockResolvedValue(null);

    const result = await login(user);

    expect(result).toEqual({
      status: 400,
      message: "Usuário não encontrado",
      data: null,
    });
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: user.email,
      },
    });
    expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  // test("should return error for invalid password", async () => {
  //   const user = {
  //     email: "teste@gmail.com",
  //     password: "errada",
  //   };

  //   const foundUser = {
  //     name: "guilherme",
  //     id: "1",
  //     email: "teste@gmail.com",
  //     password: await bcrypt.hash("correta", 10),
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     profile_picture: "teste",
  //   };

  //   prismaMock.user.findUnique.mockResolvedValue(foundUser);

  //   (bcrypt.compare as jest.Mock).mockResolvedValue(false);

  //   const result = await login(user);

  //   expect(result).toEqual({
  //     status: 400,
  //     message: "Senha inválida",
  //     data: null,
  //   });

  //   expect(bcrypt.compare).toHaveBeenCalledWith(
  //     user.password,
  //     foundUser.password,
  //   );
  //   expect(bcrypt.compare).toHaveBeenCalledTimes(1);
  // });

  // test("should return success when login is valid", async () => {
  //   const user = {
  //     email: "teste@gmail.com",
  //     password: "correta",
  //   };

  //   const foundUser = {
  //     name: "guilherme",
  //     id: "1",
  //     email: "teste@gmail.com",
  //     password: await bcrypt.hash("correta", 10),
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     profile_picture: "teste",
  //   };

  //   prismaMock.user.findUnique.mockResolvedValue(foundUser);

  //   (bcrypt.compare as jest.Mock).mockResolvedValue(true);

  //   const mockToken = "mocked-jwt-token";
  //   (jwt.sign as jest.Mock).mockReturnValue(mockToken);

  //   const result = await login(user);

  //   expect(result).toEqual({
  //     status: 200,
  //     message: "Login bem-sucedido",
  //     data: mockToken,
  //   });
  //   expect(bcrypt.compare).toHaveBeenCalledTimes(1);
  //   expect(bcrypt.compare).toHaveBeenCalledWith(
  //     user.password,
  //     foundUser.password,
  //   );
  //   expect(jwt.sign).toHaveBeenCalledTimes(1);
  //   expect(jwt.sign).toHaveBeenCalledWith(
  //     { id: foundUser.id },
  //     process.env.JWT_SECRET,
  //     { expiresIn: "7d" },
  //   );
  // });

  // test("should handle error when login user", async () => {
  //   const user = {
  //     email: "teste@gmail.com",
  //     password: "correta",
  //   };

  //   const foundUser = {
  //     name: "guilherme",
  //     id: "1",
  //     email: "teste@gmail.com",
  //     password: await bcrypt.hash("correta", 10),
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     profile_picture: "teste",
  //   };

  //   prismaMock.user.findUnique.mockResolvedValue(foundUser);

  //   (bcrypt.compare as jest.Mock).mockResolvedValue(true);

  //   const mockError = new Error("Database connection error");
  //   prismaMock.user.findUnique.mockRejectedValue(mockError);

  //   await expect(login(user)).resolves.toEqual(
  //     expect.objectContaining({
  //       status: 500,
  //       message: "Erro no servidor",
  //       data: "Database connection error",
  //     }),
  //   );

  //   expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
  //   expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
  //     where: {
  //       email: user.email,
  //     },
  //   });
  // });
});
