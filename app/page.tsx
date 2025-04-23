import { CreateNoteButton } from "@/components/CreateNoteButton";
import NoteList from "@/components/NoteList";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const user = await currentUser();
  const search = await searchParams;

  return (
    <div className="relative p-6">
      {user ? (
        <NoteList query={search?.q} />
      ) : (
        <p className="text-center text-gray-500 mt-40 text-2xl">
          Login to see your notes!
        </p>
      )}
      <CreateNoteButton />
    </div>
  );
}
