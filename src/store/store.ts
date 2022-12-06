import { IUSer } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../service/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import ListService from "../service/ListService";

export default class Store {
   
    // static user: any;
//   static isAuth: any;
    // static checkAuth() {
    //   throw new Error('Method is not implemented.');
    // }
    user = {} as IUSer;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUSer) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message); 
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message); 
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUSer);
        } catch (e) {
            console.log(e.response?.data?.message); 
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response); 
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message); 
        } finally {
            this.setLoading(false);
        }
    }

    async deleteUser(id: string) {
        try {
            const response = await AuthService.delete(id);
            this.setAuth(false);
            this.setUser({} as IUSer);
        } catch (e) {
            console.log(e.response?.data?.message)
            
        }
    }





    async post(text: string, id: string) {
        try {
            const response = await ListService.post(text, id);
            console.log(response)
        } catch (e) {
            console.log(e.response?.data?.message);
            
            
        }
    }

    async getPosts(id: string) {
        try {
            const {data} = await ListService.getPosts(id);            
            return data
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async deletePost(id: string) {
        try {
            const {data} = await ListService.deletePost(id);
        } catch (e) {
            console.log(e.response?.data?.message); 
        }
    }
    async changePassword(id: string, password: string) {
        try {
            const {data} = await AuthService.changePass(id, password)
        } catch (e) {
            console.log(e.response?.data?.message);
            
        }
    
}
}