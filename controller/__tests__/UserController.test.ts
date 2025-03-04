/* eslint-disable import/no-anonymous-default-export */
import { mockDeep } from 'jest-mock-extended'
import { createProfessor } from '../../services/professorService'
import { createAluno } from '../../services/alunoService'
import { createTelefone } from '../../services/telefoneService'
import { createEndereco } from '../../services/enderecoService'
import { db } from "../../repository/prisma"
import UserController from "../../controller/userController/userController"

// Mock do Prisma
jest.mock("../../services/professorService", () => ({
  createProfessor: jest.fn(),
}));
jest.mock("../../services/alunoService", () => ({
  createAluno: jest.fn().mockResolvedValue({ id: "aluno-mock" }),
}));
jest.mock("../../services/telefoneService", () => ({
  createTelefone: jest.fn(),
}));
jest.mock("../../services/enderecoService", () => ({
  createEndereco: jest.fn(),
}));

jest.mock("../../repository/prisma", () => ({
  db: mockDeep<typeof db>()
}));
const dbMock = db as jest.Mocked<typeof db>;

describe("UserController - createUser", () => {
  const userController = new UserController();
  beforeEach(() => {
    jest.clearAllMocks();
    dbMock.$transaction.mockImplementation(async (callback : any) => {
      return callback(dbMock); // Passa o mock para a transação
    });
    
  });

  it("should create a teacher with phone and address", async () => {
    const userData = {
      nome: "John Doe",
      email: "jhon@gmail.com",
      idade: 30,
      password: "123456",
      telefone: {
        ddd: 11,
        numero: 999999999
      },
      endereco: {
        rua: "Rua 1",
        numero: 100,
        cidade: "São Paulo",
        estado: "SP",
        bairro: "Centro"
      },
    };
    const mockUser = {id: 'user-1', ...userData};
    (dbMock.user.create as jest.Mock).mockResolvedValue(mockUser as any);

    (createProfessor as jest.Mock).mockResolvedValue({id: 'professor-1'});
    (createTelefone as jest.Mock).mockResolvedValue({id: 'telefone-1'});
    (createEndereco as jest.Mock).mockResolvedValue({id: 'endereco-1'});

    const result = await userController.createUser({ user: userData, role: 'professor' });
    expect(dbMock.user.create).toHaveBeenCalledWith({
      data: {
        nome: userData.nome,
        email: userData.email,
        idade: userData.idade,
      }
    })
    expect(createProfessor).toHaveBeenCalledWith('user-1', userData.password);
    expect(createTelefone).toHaveBeenCalledWith('user-1', userData.telefone);
    expect(createEndereco).toHaveBeenCalledWith('user-1', userData.endereco);
    expect(result).toEqual(mockUser);
  })

   it("should create a student with phone and address", async () => {
    const dataUser = {
      nome: "John Doe",
      email: "john@gmail.com",
      idade: 30,
      telefone: {
        ddd: 11,
        numero: 999999999,
      },
      endereco: {
        rua: "Rua 1",
        numero: 100,
        cidade: "São Paulo",
        estado: "SP",
        bairro: "Centro",
      },
    };
    const mockUser = { id: "user-2", ...dataUser };
    (dbMock.user.create as jest.Mock).mockResolvedValue(mockUser as any);

    (createAluno as jest.Mock).mockResolvedValue({ id: "aluno-2" });
    (createTelefone as jest.Mock).mockResolvedValue({ id: "telefone-2" });
    (createEndereco as jest.Mock).mockResolvedValue({ id: "endereco-2" });

    const turmaId = "turma-2";
    const result = await userController.createUser(
      { user: dataUser, role: "aluno" },
      turmaId
    );

    expect(dbMock.user.create).toHaveBeenCalledWith({
      data: {
        nome: dataUser.nome,
        email: dataUser.email,
        idade: dataUser.idade,
      },
    });

    expect(createAluno).toHaveBeenCalledWith("user-2", turmaId);
    expect(createTelefone).toHaveBeenCalledWith("user-2", dataUser.telefone);
    expect(createEndereco).toHaveBeenCalledWith("user-2", dataUser.endereco);
    expect(result).toEqual(mockUser);
  });
});

