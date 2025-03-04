import { mockDeep } from "jest-mock-extended";
import FrequenciaController from "../../controller/frequenciaController/frequenciaController";
import { db } from "../../repository/prisma"

jest.mock("../../services/frequenciaService", () => {
    return {
        db: {
            frequencia: {
                registrarFrequencia: jest.fn(),
            }
        }
    }
})
jest.mock("../../repository/prisma", () => ({
    db: mockDeep<typeof db>()
}))
const dbMock = db as jest.Mocked<typeof db>;
describe("FrequenciaController - createFrequencia", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    describe("frequenciaController - Aluno Frequencia", () => {
        it("should create a frequencia", async () => {
            const frequenciaData = {
                alunoId: "aluno-1",
                turmaId: "turma-1",
                status: "presente",
            };
            (dbMock.frequencia.create as jest.Mock).mockResolvedValue(frequenciaData);

            const frequenciaMock = { id: 'frequencia-1', ...frequenciaData };

            (dbMock.frequencia.create as jest.Mock).mockResolvedValue(frequenciaMock as any);
           
            const result = await FrequenciaController.registrarFrequencia(frequenciaData.alunoId, frequenciaData.turmaId, frequenciaData.status);
            expect(dbMock.frequencia.create).toHaveBeenCalledWith({
                data: {
                    alunoId: "aluno-1",
                    turmaId: "turma-1",
                    status: "presente",
                }
            })
            expect(result).toEqual(frequenciaMock);
        })
    })
})