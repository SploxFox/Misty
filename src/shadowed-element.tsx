import * as React from "react";

export class ShadowedElement extends React.Component<{className?: string}> {
    render() {
        return <div className={(this.props.className ? this.props.className : "") + " shadowed-element-container"}>
            <div className="shadowed-element-children">
                {this.props.children}
            </div>
            <div className="shadowed-element-shadow"></div>
        </div>
    }
}