"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PinIcon, PencilIcon, TrashIcon } from "lucide-react";

type NoteCardProps = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
};

export function NoteCard({
  id,
  title,
  content,
  pinned,
  onEdit,
  onDelete,
  onTogglePin,
}: NoteCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-200 border border-border bg-card hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-black/40",
        pinned && "border-yellow-400 ring-2 ring-yellow-300"
      )}
    >
      <CardHeader className="flex flex-row justify-between items-start">
        <CardTitle className="text-lg font-semibold truncate w-4/5">
          {title || "Untitled Note"}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onTogglePin}
          className={pinned ? "text-yellow-500" : "text-muted-foreground"}
        >
          <PinIcon size={18} />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-4">{content}</p>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <PencilIcon className="w-4 h-4 mr-1" /> Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <TrashIcon className="w-4 h-4 mr-1" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
