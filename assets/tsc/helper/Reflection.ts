export default class Reflection {
    public static parseEntity(data: any, entity: any, callback: CallableFunction = () => {}) {
        let element = new entity();
        Object.assign(element, data);
        callback && callback(element);
        return element;
    } 

    public static parseEntityArray(data: Array<any>, entity: any, callback: CallableFunction = () => {}) {
        let me = this;
        let list: Array<any> = [];
        data.forEach( element => {
            list.push(me.parseEntity(element, entity, callback));
        });
        return list;
    }

    public static set(key:string, value: string, element: any) {
        let object: {[index: string]:any} = {};
        object[key] =  value;
        Object.assign(element, object);
        return element;
    }

    public static toFormData(element: any): FormData {
        let formData = new FormData();
        Object.keys(element).forEach( key => {
            formData.set(key, element[key]);
        })
        return formData;
    }
}