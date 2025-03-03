import {db} from "../repository/prisma";

export async function createCurso(cursoInfo: any) {
    const Curso = await db.curso.create({
        data: {
            ...cursoInfo
         }
    });
}