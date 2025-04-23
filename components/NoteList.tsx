import { getNotes } from "@/actions/note.action";
import { NoteCardClientWrapper } from "./NoteCardClientWrapper";

// type Props = {
//   searchParams?: { q?: string };
// };

export default async function NoteList({ query = "" }: { query?: string }) {
  // const query = searchParams.q || "";
  const notes = await getNotes(query);

  if (!notes.length) {
    return (
      <p className="text-center text-muted-foreground mt-10">
        No notes yet. Click the + button to create one!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {notes.map((note) => (
        <NoteCardClientWrapper key={note.id} note={note} />
      ))}
    </div>
  );
}
