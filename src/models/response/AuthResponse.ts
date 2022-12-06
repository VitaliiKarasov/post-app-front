import { IUSer } from "../IUser";

export interface AuthResponse { 
    accessToken: string;
    refreshToken: string;
    user: IUSer;
}