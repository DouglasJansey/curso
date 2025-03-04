import {db} from "../repository/prisma";

export async function createCurso(cursoInfo: any) {
    return await db.curso.create({
        data: {
            ...cursoInfo
         }
    });
}