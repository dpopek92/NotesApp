import axios, { AxiosResponse } from "axios";
import {
  ISearchParams,
  ISearchResult,
} from "common/interfaces/Search.interface";
import { INote } from "../interfaces/Notes.interface";

export interface INewNote extends Pick<INote, "title" | "content"> {}
export interface IUpdateNote extends INewNote {}
export interface ISearchNotes extends ISearchParams {
  title?: string;
}

export const notesApi = {
  create: async (data: INewNote): Promise<AxiosResponse<INote>> => {
    return axios.post(`/notes`, data);
  },
  getAll: async (
    params: ISearchNotes
  ): Promise<AxiosResponse<ISearchResult<INote>>> => {
    return axios.get(`/notes`, { params });
  },
  get: async (id?: string): Promise<AxiosResponse<INote>> => {
    if (!id) throw new Error(`Wrong id param: ${id}`);
    return axios.get(`/notes/${id}`);
  },
  update: async (
    id: string | undefined,
    data: IUpdateNote
  ): Promise<AxiosResponse<INote>> => {
    if (!id) throw new Error(`Wrong id param: ${id}`);
    return axios.put(`/notes/${id}`, data);
  },
  remove: async (id?: string): Promise<AxiosResponse<boolean>> => {
    if (!id) throw new Error(`Wrong id param: ${id}`);
    return axios.delete(`/notes/${id}`);
  },
};
