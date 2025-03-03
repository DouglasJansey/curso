import { db } from "../repository/prisma";

export async function createUser(user: any) {
    return await db.user.create({
        data: {
            nome: user.nome,
            email: user.email,
            idade: user.idade,
        }
    });
}