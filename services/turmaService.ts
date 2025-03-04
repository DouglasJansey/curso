import {db} from "../repository/prisma";

export async function createTurma(professorId: string, cursoId?: any) {
    return await db.turma.create({
        data: {
            professorId,
            cursoId: cursoId
         }
    });
}