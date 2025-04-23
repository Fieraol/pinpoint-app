"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteNote, togglePinNote, updateNote } from "@/actions/note.action";
import { NoteCard } from "./NoteCard";
import { useState } from "react";
import EditNoteModal from "./EditNoteModal";

type Note = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
};

export function NoteCardClientWrapper({ note }: { note: Note }) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    await deleteNote(note.id);
    toast.success("Note Successfuly Deleted");
    router.refresh();
  };

  const handlePinToggle = async () => {
    await togglePinNote(note.id, !note.pinned);
    toast.success(
      note.pinned ? "Note Successfuly Unpinned" : "Note Successfuly Pinned"
    );
    router.refresh();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedTitle: string, updatedContent: string) => {
    await updateNote(note.id, updatedTitle, updatedContent);
    toast.success("Note Successfully Updated");
    router.refresh();
  };

  return (
    <>
      <NoteCard
        id={note.id}
        title={note.title}
        content={note.content}
        pinned={note.pinned}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTogglePin={handlePinToggle}
      />
      <EditNoteModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        initialTitle={note.title}
        initialContent={note.content}
      />
    </>
  );
}
