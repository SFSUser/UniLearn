export class SRoute {
    public name: string = "";
    public path: string = "";
}

export class SController {
    public name: string = "";
    public routes: Array<SRoute> = [];
}