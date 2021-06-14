import Reflection from "../../helper/Reflection";

export class HttpResponse {
    public result: boolean = false;
    public message: string = "";
    public data: any;

    public get OK(){
        return this.result;
    }

    public getElement(entity: any){
        return Reflection.parseEntity(this.data, entity);
    }

    public getList(entity: any, callback: CallableFunction = () => {}){
        return Reflection.parseEntityArray(this.data, entity, callback);
    }
}