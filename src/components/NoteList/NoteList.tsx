import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";

import styles from "./NoteList.module.css";

export interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.listItem}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>

          <div className={styles.footer}>
            {/* ❗ Тепер tag відображається правильно */}
            <span className={styles.tag}>{note.tag}</span>

            <button
              className={styles.button}
              onClick={() => handleDelete(note.id)}
              disabled={mutation.isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
