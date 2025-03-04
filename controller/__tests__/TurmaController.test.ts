import { mockDeep } from "jest-mock-extended";
import { db } from "../../repository/prisma";
import { createProfessor } from "../../services/professorService";
import { createCurso } from "../../services/cursoService";
import TurmaController from "../../controller/turmaController/turmaController";


jest.mock("../../services/turmaService", () => ({
    createTurma: jest.fn(),
}))
jest.mock("../../services/professorService", () => ({
    createProfessor: jest.fn(),
}))

jest.mock("../../services/cursoService", () => ({
    createCurso: jest.fn(),
}))

jest.mock("../../repository/prisma", () => ({
    db: mockDeep<typeof db>()
}))
const dbMock = db as jest.Mocked<typeof db>;

describe("TurmaController - createTurma", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        dbMock.$transaction.mockImplementation(async (callback : any) => {
          return callback(dbMock); // Passa o mock para a transação
        });
        
      });
    it("should create a turma", async () => {
        const turmaData = {
            nome: "Turma 1",
            professorId: "professor-1",
            cursoId: "curso-1"
        }
        const mockTurma = {id: 'turma-1', ...turmaData};
        (dbMock.turma.create as jest.Mock).mockResolvedValue(mockTurma as any);
       
    
        (createProfessor as jest.Mock).mockResolvedValue({id: 'professor-1'});
        (createCurso as jest.Mock).mockResolvedValue({id: 'curso-1'});
        
        const result = await TurmaController.createTurma(turmaData.professorId, turmaData.cursoId);
        expect(dbMock.turma.create).toHaveBeenCalledWith({
            data:{
                professorId: turmaData.professorId,
                cursoId: turmaData.cursoId
            }
        })
        expect(result).toEqual(mockTurma);
    })
    it("should add a student to a turma", async () => {
        const turmaData = {
            nome: "Turma 1",
            professorId: "professor-1",
            cursoId: "curso-1"
        }
        const mockTurma = {id: 'turma-1', ...turmaData};
        (dbMock.turma.create as jest.Mock).mockResolvedValue(mockTurma as any);
       
    
        (createProfessor as jest.Mock).mockResolvedValue({id: 'professor-1'});
        (createCurso as jest.Mock).mockResolvedValue({id: 'curso-1'});
        

     
       
    })
})