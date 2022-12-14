import * as React from 'react';

export type Instruments = 'Kick' | 'Snare' | 'HiHat' | 'Clap' 

export class Container extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children, child => {
            if (typeof child === 'object' && child != null && child.key) {
                if (child.key === this.props.selectedInstrument) {
                    return React.cloneElement(child, { steps: this.props.steps, selected: true });
                } else {
                    return React.cloneElement(child, { steps: null, selected: false });
                }
                
            }
            return child; 
        });
        
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                {childrenWithProps}
            </div>
        )
    }
}