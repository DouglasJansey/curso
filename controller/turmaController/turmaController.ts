import {db} from "../../repository/prisma";

export default class TurmaController {
    static async createTurma(professorId: string, cursoId: string) {
        try {
            const turma = await db.turma.create({
                data: { professorId, cursoId }
            });
            return turma;
        } catch (error) {
            throw new Error("Erro ao criar turma: " + error);
        }
    }

    static async getTurmas() {
        return await db.turma.findMany({ include: { curso: true, professores: true, alunos: true } });
    }

    static async addAlunoTurma(alunoId: string, turmaId: string) {
        try {
            return await db.aluno.update({
                where: { id: alunoId },
                data: { turmaId }
            });
        } catch (error) {
            throw new Error("Erro ao adicionar aluno na turma: " + error);
        }
    }

    static async deleteTurma(id: string) {
        try {
            return await db.turma.delete({ where: { id } });
        } catch (error) {
            throw new Error("Erro ao excluir turma: " + error);
        }
    }
}
