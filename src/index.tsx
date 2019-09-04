import * as Iris from "../../Iris/src";
import { Layer } from "../../Iris/src/graphics/layers/layer";
import { MainTextBox } from "./main-text-box";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { FormattedText } from "../../Iris/src/graphics/layers/interface/formatted-text";
import { MainGUI } from "./main-gui";

//Create a new instance of the App class
export const app = new Iris.App();

//Create an empty layer
const layer = new Layer();

//Create an export an empty story
export const story: {[index: string]: FormattedText} = {
    
};
const segments = ["beginning", "lay-back-down", "sit-up", "stare", "window-transition", "window"];

const promises = segments.map((segment) => 
    app.localizer.loadAsset(`story/${segment}.iris-story`).then((text) => story[segment] = FormattedText.parse(text))
);

Promise.all(promises).then(() => {
    //story.beginning = FormattedText.parse(text)

    //Render the main text box into this empty layer
    ReactDOM.render(<MainGUI textBoxContent={{
        story: story,
        startPosition: "beginning"
    }}></MainGUI>, layer.element);
    
});


app.layers.push(layer);
document.body.appendChild(app.element);