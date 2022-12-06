import $api from "../http";
import { AxiosResponse } from "axios";
import { ListResponse } from "../models/response/ListResponse";

export default class ListService {
    static async post(text: string, id: string): Promise<AxiosResponse> {
        return $api.post<ListResponse>(`/post/${id}`, {text})
    }
    static async getPosts(id: string): Promise<AxiosResponse> {
        return $api.get<ListResponse>(`/posts/${id}`)
    }
    static async deletePost(id: string): Promise<AxiosResponse> {
        return $api.delete<ListResponse>(`/post/${id}`)
    }
}
