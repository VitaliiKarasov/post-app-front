import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse> { 
        return $api.post<AuthResponse>('/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse> { 
        return $api.post<AuthResponse>('/registration', {email, password})
    }

    static async logout(): Promise<void> { 
        return $api.post('/logout')
    }

    static async delete(id:string): Promise<AxiosResponse> {
        return $api.delete(`/users/${id}`)
    }
    static async changePass(id: string, password: string): Promise<AxiosResponse> {
        return $api.put(`/users/${id}`, {password})
    }
    
}
