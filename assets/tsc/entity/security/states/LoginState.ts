import { IState } from "../../../core/IState";
import User from "../../user/User";

export default class LoginState implements IState {
    public register:boolean = false;
    public user: User = new User();
    public error: string = "";
}