import {db} from "../repository/prisma";

export async function createAluno(userId: string, turmaId?: any) {
    return await db.aluno.create({
        data: {
            userId,
            turmaId: turmaId
         }
    });
}