'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function createNote({
  title,
  content,
  pinned,
}: {
  title: string;
  content: string;
  pinned?: boolean;
}) {
  const { userId } = await auth();

  if (!userId) throw new Error('Unauthorized');

  return await prisma.note.create({
    data: {
      title,
      content,
      pinned: pinned ?? false,
      userID: userId,
    },
  });
}

export async function getNotes(query?: string) {
    const { userId } = await auth();
    if (!userId) return [];
  
    return prisma.note.findMany({
      where: {
        userID: userId,
        ...(query && {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        }),
      },
      orderBy: [
        { pinned: "desc" },
        { createdAt: "desc" },
      ],
    });
}

export async function togglePinNote(id: string, pinned: boolean) {
    try {
      return await prisma.note.update({
        where: { id },
        data: { pinned },
      });
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
}

export async function deleteNote(noteId: string) {
    const { userId } = await auth();
    if (!userId) return;
  
    const note = await prisma.note.findUnique({ where: { id: noteId } });
    if (!note || note.userID !== userId) return;
  
    await prisma.note.delete({ where: { id: noteId } });
}

export async function updateNote(id: string, title: string, content: string) {
  const { userId } = await auth();
  if (!userId) return null;

  return prisma.note.update({
    where: {
      id,
      userID: userId,
    },
    data: {
      title,
      content,
    },
  });
}
