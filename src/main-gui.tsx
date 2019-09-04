import * as React from "react";
import { MainTextBox } from "./main-text-box";
import { FormattedText } from "../../Iris/src/graphics/layers/interface/formatted-text";
import { FormattedButton } from "../../Iris/src/graphics/layers/interface/formatted-button";
import { ShadowedElement } from "./shadowed-element";

interface MainGUIProps {
    textBoxContent: {
        story: {[index: string]: FormattedText}
        startPosition: string
    }
}

interface MainGUIState {
    choicesOut: {
        text: string,
        destination: string
    }[]
}

export class MainGUI extends React.Component<MainGUIProps, MainGUIState> {
    mainTextBox: MainTextBox;
    constructor(props: MainGUIProps) {
        super(props);

        this.state = {
            choicesOut: []
        }
    }
    render() {
        console.log(this);
        return(<div>
            <div className="main-text-box-container">
                <ShadowedElement>
                    <MainTextBox content={this.props.textBoxContent} ref={(mainTextBox) => {
                        this.mainTextBox = mainTextBox;
                    }}
                    textBoxProps={{
                        textFunctions: {
                            branchChoices: (args: {choices: {text: string, destination: string}[]}) => {
                                this.setState({choicesOut: args.choices});
                                this.mainTextBox.setState({locked: true});
                            }
                        }
                    }}
                    ></MainTextBox>
                </ShadowedElement>
                
                {this.state.choicesOut.map((choice, index) =>
                    <ShadowedElement key={index} className="choice">
                        <FormattedButton formattedText={FormattedText.parse(choice.text)}  selectedCallback={() => this.selectChoiceBranch(choice.destination)}></FormattedButton>
                    </ShadowedElement>
                )}
            </div>
        </div>);
    }
    selectChoiceBranch(destination: string) {
        this.mainTextBox.jump(destination);
        this.mainTextBox.setState({locked: false});
        this.setState({choicesOut: []})
    }
    componentDidMount() {
        window.addEventListener("click", () => {
            this.attemptToAdvance(this.mainTextBox);
        });
        window.addEventListener("touchstart", () => {
            this.attemptToAdvance(this.mainTextBox);
        });
    }
    attemptToAdvance(mainTextBox: MainTextBox) {
        if (mainTextBox.state.stopped && !mainTextBox.state.locked) {
            mainTextBox.textBox.start();
        }
    }
}
