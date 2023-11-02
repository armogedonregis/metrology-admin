import { Note } from "@prisma/client";

export default function noteModel(
    note: Note,
) {
    const noteView = {
        id: note.id,
        top: note.top,
        bottom: note.bottom,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
    };
    return noteView;
}