import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IUSer } from "../models/IUser";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUSer[]>>  {
    return $api.get<IUSer[]>('/users')
  }
}
