import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
  data: Note[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export interface CreateNoteResponse {
  data: Note;
}

export interface DeleteNoteResponse {
  data: Note;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function fetchNotes(
  page: number,
  search?: string
): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("", {
    params: {
      page,
      perPage: 12,
      search,
    },
  });

  return response.data;
}

export async function createNote(
  payload: CreateNotePayload
): Promise<Note> {
  const response = await api.post<CreateNoteResponse>("", payload);
  return response.data.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<DeleteNoteResponse>(`/${id}`);
  return response.data.data;
}
