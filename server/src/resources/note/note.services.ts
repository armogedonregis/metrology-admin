import prisma from "@/utils/prisma";

interface BodyTask {
    top: string,
    bottom: string,
}


async function noteCreatePrisma(
    body: BodyTask,
) {
    const note = await prisma.note.create({
        data: { ...body },
    });
    return note;
}

async function noteDeletePrisma(id: string) {
    const note = await prisma.note.delete({
        where: { id },
    });
    return note;
}

async function noteGetAllPrisma() {
    const notes = await prisma.note.findFirst();
    return notes;
}


async function noteUpdatePrisma(
    id: string,
    top: string,
    bottom: string
) {
    const note = await prisma.note.update({
        where: { id },
        data: {
            top,
            bottom,
            updatedAt: new Date(),
        },
    });
    return note;
}

export default { noteCreatePrisma, noteDeletePrisma, noteGetAllPrisma, noteUpdatePrisma };