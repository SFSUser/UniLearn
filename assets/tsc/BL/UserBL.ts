import User from '../entity/user/User';
import Request from '../helper/Request';

export default class UserBL {
    public static login(){
        //Request.get();
    }

    public static register(user: User){
        let response = Request.post('user_register', user);
        console.log(response);
        return response;
    }
    
}