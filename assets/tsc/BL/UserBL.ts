import User from '../entity/user/User';
import Request from '../helper/Request';

export default class UserBL {

    private static session_data: User;

    public static get SessionData(){
        return this.session_data;
    }

    public static async check(){
        let me = this;
        let response = await Request.get('user_data');
        if(response.OK){
            me.session_data = response.Element;
        }
        return response;
    }

    public static async login(user: User){
        let me = this;
        let response = await Request.post('user_check', {
            username: user.username,
            password: user.password
        });
        if(response.OK){
        }
        return response;
    }
    public static async logout(){
        let response = await Request.get('user_logout');
        return response;
    }

    public static async register(user: User){
        let response = await Request.post('user_register', user);
        console.log(response);
        return response;
    }
}