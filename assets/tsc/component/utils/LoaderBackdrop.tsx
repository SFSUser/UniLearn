import React, { Component } from "react";
import LoaderBackdropProp from "../../entity/utils/props/LoaderBackdropProp";
import loader from '../../../img/loaders/loader_1.gif';

export default class LoaderBackdrop extends Component<LoaderBackdropProp> {

    get Translucid(){
        let me = this;
        if(me.props.translucid == false){
            return false;
        }
        return true;
    }

    render() {
        let me = this;
        return (
            me.props.visible ? 
                <div className={`loader ${me.Translucid ? 'loader__translucid' : ''}`}>
                    <img src={loader}/>
                    <h3>{me.props.message}</h3>
                </div>
            : 
            <></>
        );
    }
}