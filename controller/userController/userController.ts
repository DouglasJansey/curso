/* eslint-disable import/no-anonymous-default-export */
import { db } from '../../repository/prisma';
import { createProfessor } from '../../services/professorService';
import { createTelefone } from '../../services/telefoneService';
import { createEndereco } from '../../services/enderecoService';
import { createAluno } from '../../services/alunoService';

type DataType = {
    user: {
        nome: string;
        email: string;
        idade: number;
        password?: string;
        endereco: {
            rua: string;
            numero: number;
            cidade: string;
            estado: string;
            bairro: string;
        }
        telefone: {
            ddd: number;
            numero: number;
        }

    }
};
export default class userConroller {
    async getUser() {
        const prof = await db.professor.findMany();
        return prof;
    };

    async createUser({ user, role }: { user: DataType['user'], role: 'professor' | 'aluno' }, turmaId?: string) {
        const { password } = user

        

        try {
            const createUser = await db.$transaction(async (db) => {

                const newUser = await db.user.create({
                    data: {
                        nome: user.nome,
                        email: user.email,
                        idade: user.idade,
                    }
                })
                //catch the id of the user created and connect with the other tables
                const userId = newUser.id;
                
                const promisses = [
                    role === 'professor'
                        ? await createProfessor(userId, password!)
                        : await createAluno(userId, turmaId),
                    //create a phone and connect with user
                    (user.telefone) && await createTelefone(userId, user.telefone),
                    //create a address and connect with user
                    (user.endereco) && await createEndereco(userId, user.endereco),
                ].filter(Boolean);
                await Promise.all(promisses)
                return newUser;
            })
            return createUser;
        }
        catch (err) {
            console.error("Erro ao criar professor:", err);
            throw new Error("Erro ao criar professor: " + err);
        }

    };
    async updateprof(id: string, { ...updateData }) {
        const prof = await db.professor.update({
            where: {
                id
            },
            data: {
                ...updateData
            }
        });
        const { userId } = prof
        return userId;
    };
    async deleteprof(id: string) {
        const profDelete = await db.professor.delete({
            where: {
                id
            }
        });
        return profDelete;
    };
}