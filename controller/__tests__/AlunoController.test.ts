import { mockDeep } from "jest-mock-extended";
import { createAluno } from "../../services/alunoService";
import {db} from "../../repository/prisma";

jest.mock("../../repository/prisma", () => {
    return {
        db: mockDeep<typeof db>()
    };
});
const dbMock = db as jest.Mocked<typeof db>;

describe('AlunoController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        dbMock.$transaction.mockImplementation(async (callback : any) => {
          return callback(dbMock); // Passa o mock para a transação
        });
        
      });
    describe('addAlunoNaTurma', () => {
        it('should add aluno to turma', async () => {
            
            const alunoId = '1';
            const turmaId = '1';

           (dbMock.aluno.create as jest.Mock).mockResolvedValue({alunoId, turmaId});

            const mockAluno = {alunoId, turmaId};
            const result = await createAluno(alunoId, turmaId);

            expect(dbMock.aluno.create).toHaveBeenCalledWith({
                data: {
                    userId: alunoId,
                    turmaId: turmaId
                }
            });
            expect(result).toEqual(mockAluno);
        });
    });
})
