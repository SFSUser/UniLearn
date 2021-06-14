import IState from "../../../core/IState";
import User from "../../user/User";

export default class LoginState implements IState {
    public busy: boolean = false;
    public register:boolean = false;
    public user: User = new User();
    public error: string = "";
    public message: string = "";
    public login: boolean = false;
}