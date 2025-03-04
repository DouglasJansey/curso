import {db} from "../repository/prisma";

export async function createAluno(userId: string, turmaId?: any) {
    return await db.aluno.create({
        data: {
            userId,
            turmaId
         }
    });
}
// export async function addAlunoNaTurma(alunoId: string, turmaId: string) {
//     return await db.aluno.update({
//         where: { id: alunoId },
//         data: { turmaId }
//     });
// }