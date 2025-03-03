import {db} from "../repository/prisma";

export async function createFrequencia(alunoId: string, turmaId: string, status: string) {
    return await db.frequencia.create({
        data: {
            alunoId,
            turmaId,
            status,

        }
    });
}