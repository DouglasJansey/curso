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
 
}
