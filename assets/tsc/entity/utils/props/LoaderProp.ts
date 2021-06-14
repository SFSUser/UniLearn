import IProp from '../../../core/IProp';

export default class LoaderProp implements IProp {
    public visible: boolean = false;
    public message: string = "";
    public translucid: boolean = true;
}