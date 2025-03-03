import CursoController from "../../controller/cursoController/cursoController";
import {db} from "../../repository/prisma";

jest.mock("../../repository/prisma",()=>{
    return {
        db: {
            curso: {
                create: jest.fn(),
            },
        },
    };
});

describe("CursoController", () => {
            beforeEach(() => {
                jest.clearAllMocks();
            })
        it("should create a new Curso", async () => {
            const cursoMock = {
                id: '1',
                nome: "Curso 1",
                descricao: "Curso de teste",
            };
            (db.curso.create as jest.Mock).mockResolvedValue(cursoMock);
            const curso = await CursoController.createCurso("Curso 1", "Curso de teste");
            expect(curso).toEqual(cursoMock);
            expect(db.curso.create).toHaveBeenCalledTimes(1);
        });
    it("should return a error when create a new curso without name", async () => {
        try {
            await CursoController.createCurso("", "Curso de teste");
        } catch (error) {
            expect(error).toEqual(new Error("Erro ao criar curso: Error: Invalid name"));
        }
    });
})