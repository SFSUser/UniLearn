import axios from 'axios';
import { SController, SRoute } from '../entity/security/SecurityEntity';
import Reflection from './Reflection';

export default class SRouter {
    private static _controllers: Array<SController> = [];
    public static async load(){
        let me = this;

        if(me._controllers.length > 0){
            return;
        }
        let result = await axios.get('/api/system/routes');
        console.log("result", result);
        let data = result.data.data;

        let controllers = Reflection.parseEntityArray(data, SController, (c:any) => {
            c.routes = Reflection.parseEntityArray(c.routes, SRoute);
        });

        console.log("Routes", controllers);
        me._controllers = controllers;
    }

    public static get(routeName: string){
        let me = this;
        me.load();
        let path = "";
        me._controllers.forEach( controller => {
            controller.routes.forEach( route => {
                if(route.name == routeName){
                    path = route.path
                }
            })
        });
        return path;
    }
}

