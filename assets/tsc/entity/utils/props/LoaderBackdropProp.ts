import IProp from '../../../core/IProp';

export default class LoaderBackdropProp implements IProp {
    public visible: boolean = false;
    public message: string = "";
    public translucid?: boolean = true;
}