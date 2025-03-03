import {db} from "../repository/prisma";

export async function createEndereco(userId: string, endereco: any) {
    return await db.endereco.create({
        data: {
            ...endereco,
            userId
        }
    });
}