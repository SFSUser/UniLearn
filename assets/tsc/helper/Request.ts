import axios from 'axios';
import { HttpResponse } from '../entity/common/HttpEntity';
import Reflection from './Reflection';
import SRouter from './SRouter';

export default class Request {
    public static async get(route: string, data: any) {
        let path = SRouter.get(route);
        let result = await axios.get(path, data);
        return Reflection.parseEntity(result.data, HttpResponse);
    }

    public static async post(route: string, data: any) {
        let path = SRouter.get(route);
        let formData = Reflection.toFormData(data);
        let result = await axios.post(path, formData);
        return Reflection.parseEntity(result.data, HttpResponse);
    }
}