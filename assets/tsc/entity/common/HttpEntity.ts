
export class HttpResponse {
    public result: boolean = false;
    public message: string = "";
    public data: any;

    public get OK(){
        return this.result;
    }
}