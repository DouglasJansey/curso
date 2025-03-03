import { NextRequest, NextResponse } from "next/server";
import TurmaController from "@/../controller/turmaController/turmaController";

export async function GET() {
    try {
        const turmas = await TurmaController.getTurmas();
        return NextResponse.json(turmas);
    } catch (error) {
         (error instanceof Error) ?
          NextResponse.json({ error: error.message }, { status: 500 }) :
          NextResponse.json({ error: "Unknown error" }, { status: 500 });
           
    }
}

export async function POST(req: NextRequest) {
    try {
        const { professorId, cursoId } = await req.json();
        const turma = await TurmaController.createTurma(professorId, cursoId);
        return NextResponse.json(turma, { status: 201 });
    } catch (error) {
        (error instanceof Error) ?
        NextResponse.json({ error: error.message }, { status: 500 }) :
        NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
}
