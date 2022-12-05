import * as React from 'react';

export interface StepProps{
    id: number;
    onClick: (id: number) => void;
    on: boolean;
    active: boolean;
}

export class Step extends React.Component<StepProps> {
    calculateColor = () => {
        let color = '#CBCBCB';
        if (this.props.on && this.props.active) {
            color = '#8B8000'
        }
        else if (this.props.on) {
            color = '#2AC7DC';
        }
        else if (this.props.active) {
            color = '#FFF000';
        }
        return color;
    }
    
    render() { 
        const style = {
            width: '2em',
            height: '3em',
            backgroundColor: this.calculateColor(),
            borderRadius: '5px',
            margin: 5,
            display: 'inline-block'
        }
        return (
            <div style={style} onClick={this.handleClick}></div>
        )
    }

    private handleClick = () => {
        this.props.onClick(this.props.id);
    }
    
}