import {InteractiveTextBox} from "../../Iris/src/graphics/layers/interface/text-box/interactive-text-box";
import * as React from "react";
import { ContinueArrow } from "../../Iris/src/graphics/layers/interface/text-box/continue-arrow";


export class MainTextBox extends InteractiveTextBox {
    render() {
        console.log(this);
        return (
            <div className="main-text-box">
                {super.render()}
                {this.state.stopped && !this.state.locked ? <ContinueArrow></ContinueArrow> : ""}
            </div>
        );
        /*return(
            <div>
                {this.textBoxComponent}
                {this.state.stopped ? <ContinueArrow></ContinueArrow> : ""}
            </div>
        )*/
    }
}