import {db} from "../../repository/prisma";

export default class CursoController {
    static async createCurso(nome: string, descricao: string) {
        try {
            const curso = await db.curso.create({
                data: { nome, descricao }
            });
            return curso;
        } catch (error) {
            throw new Error("Erro ao criar curso: " + error);
        }
    }

    static async getCursos() {
        return await db.curso.findMany();
    }

    // static async updateCurso(id: string, data: Partial<{ nome: string; descricao: string }>) {
    //     try {
    //         return await db.curso.update({
    //             where: { id },
    //             data
    //         });
    //     } catch (error) {
    //         throw new Error("Erro ao atualizar curso: " + error);
    //     }
    // }

    // static async deleteCurso(id: string) {
    //     try {
    //         return await db.curso.delete({ where: { id } });
    //     } catch (error) {
    //         throw new Error("Erro ao excluir curso: " + error);
    //     }
    // }
}
