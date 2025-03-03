import { NextRequest, NextResponse } from "next/server";
import FrequenciaController from "@/../controller/frequenciaController/frequenciaController";

export async function GET(req: NextRequest) {
    try {
        const turmaId = req.nextUrl.searchParams.get("turmaId");
        if (!turmaId) {
            return NextResponse.json({ error: "TurmaId é obrigatório" }, { status: 400 });
        }
        const frequencias = await FrequenciaController.getFrequenciaPorTurma(turmaId);
        return NextResponse.json(frequencias);
    } catch (error) {
        (error instanceof Error) ?
            NextResponse.json({ error: error.message }, { status: 500 }) :
            NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { alunoId, turmaId, status } = await req.json();
        const frequencia = await FrequenciaController.registrarFrequencia(alunoId, turmaId, status);
        return NextResponse.json(frequencia, { status: 201 });
    } catch (error) {
        (error instanceof Error) ?
            NextResponse.json({ error: error.message }, { status: 500 }) :
            NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
}
