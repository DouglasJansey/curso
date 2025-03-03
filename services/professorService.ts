import {db} from "../repository/prisma";
import bcrypt from "bcrypt";

export async function createProfessor(userId: string, password: string) {
    if (!password) throw new Error("Professor precisa de uma senha");

    const salt = 10;
    const passwordHash = await bcrypt.hash(password, salt);

    return await db.professor.create({
        data: { userId, password: passwordHash }
    });
}