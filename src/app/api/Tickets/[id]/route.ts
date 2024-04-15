import Ticket from "@/Models/Ticket";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params}: {params: {id: string}}) {
    try {
        const { id } = params;        
        await Ticket.findByIdAndDelete(id);
        return NextResponse.json({ message: "Ticket deleted!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

export async function GET(req: Request, {params}: {params: {id: string}}) {
    try {
        const { id } = params; 
        const ticket = await Ticket.findOne({ _id: id });
        return NextResponse.json({ ticket }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

export async function PUT(req: Request, {params}: {params: {id: string}}) {
    try {
        const { id } = params; 
        const body = await req.json();
        const ticketData = body.formData;
        
        await Ticket.findByIdAndUpdate(id, {
            ...ticketData,
        });
        return NextResponse.json({ message: "Ticket Updated" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}