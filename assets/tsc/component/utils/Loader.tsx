import React, { Component } from "react";
import LoaderProp from "../../entity/utils/props/LoaderProp";
import loader from '../../../img/loaders/loader_1.gif';

export default class Loader extends Component<LoaderProp> {
    render() {
        let me = this;
        return (
            me.props.visible ? 
                <div className={`loader ${me.props.translucid ? 'loader__translucid' : ''}`}>
                    <img src={loader}/>
                    <h3>{me.props.message}</h3>
                </div>
            : 
            <></>
        );
    }
}