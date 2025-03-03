import {db} from "../repository/prisma";

export async function createTurma(professorId: string, cursoId?: any) {
    const turma = await db.turma.create({
        data: {
            professorId,
            cursoId: cursoId
         }
    });
    return turma
}