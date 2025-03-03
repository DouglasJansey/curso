import { NextRequest, NextResponse } from "next/server";
import CursoController from "@/../controller/cursoController/cursoController";

export async function GET() {
    try {
        const cursos = await CursoController.getCursos();
        return NextResponse.json(cursos);
    } catch (error) {
        (error instanceof Error) ?
        NextResponse.json({ error: error.message }, { status: 500 }) :
        NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { nome, descricao } = await req.json();
        const curso = await CursoController.createCurso(nome, descricao);
        return NextResponse.json(curso, { status: 201 });
    } catch (error) {
        (error instanceof Error) ?
          NextResponse.json({ error: error.message }, { status: 500 }) :
          NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
}
