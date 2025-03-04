import {db} from "../../repository/prisma";

export default class AlunoController {
    
     static async addAlunoNaTurma (alunoId: string, turmaId: string) {
        return await db.aluno.create({
            data: {
                userId: alunoId,
                turmaId: turmaId
            }
        });
      
      };
}