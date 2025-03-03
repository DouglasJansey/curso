import {db} from "../../repository/prisma";

export default class FrequenciaController {
    static async registrarFrequencia(alunoId: string, turmaId: string, status: string) {
        try {
            return await db.frequencia.create({
                data: { alunoId, turmaId, status }
            });
        } catch (error) {
            throw new Error("Erro ao registrar frequência: " + error);
        }
    }

    static async getFrequenciaPorTurma(turmaId: string) {
        return await db.frequencia.findMany({
            where: { turmaId },
            include: { aluno: true, turma: true }
        });
    }

}
