import {db} from "../repository/prisma";

export async function createTelefone(userId: string, telefone: any) {
    return await db.telefone.create({
        data: {
            ddd: telefone.ddd,
            numero: telefone.numero,
            userId
        }
    });
}