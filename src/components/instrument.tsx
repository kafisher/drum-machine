import * as React from 'react';
import { Kick } from '../sound-generators/kick';
import { Snare } from '../sound-generators/snare';
import { Clap } from '../sound-generators/clap';
import { HiHat } from '../sound-generators/hat';
import { Time, Transport } from 'tone';
import { Instruments } from './container';
import * as Tone from 'tone';

export interface InstrumentProps {
    generator: Instruments;
    steps?: boolean[];
    selected?: boolean;
    ctx: AudioContext;
    handleClick?: (generator: string, steps: boolean[]) => void;
    handleActiveStepChange?: (id: number) => void;
}

export class Instrument extends React.Component<InstrumentProps, any> {
    private sound: any;
    private loopId: number;

    constructor(props: any ) {
        super(props);
        switch (props.generator) {
            case 'Kick':
                this.sound = new Kick(this.props.ctx);
                break;
            case 'Snare':
                this.sound = new Snare(this.props.ctx);
                break;
            case 'HiHat':
                this.sound = new HiHat(this.props.ctx);
                break;
            case 'Clap':
                this.sound = new Clap(this.props.ctx);
                break;
        }
        this.state = {
            steps: [false, false, false, false, false, false, false, 
                false, false, false, false, false, false, false, 
                false, false],
        }
        // Transport.bpm.value = 120;
        this.loopId = 0;
    }

    componentDidUpdate() {

        if (this.props.steps && !areEqual(this.props.steps, this.state.steps)) {
            this.setState({
                steps: this.props.steps.slice(0),
            });
            this.createLoop();
        }
    }

    createLoop = () => {
 
        // let beat = 0;
        console.log('starting loop ');
        if (!this.props.steps) { return; }
        Transport.clear(this.loopId);
        const loop = (time: number) => {
            this.state.steps.forEach((s, i) => {
                if (s) {
                    this.sound.trigger(time + i * Time('16n').toSeconds())
                }
            });
          
            const seq = new Tone.Sequence((time, note) => {
                this.handleActiveStepChange(note);
                // subarray subdivision to make 16th notes
            }, [[0,1], [2,3],[4,5],[6,7],[8,9],[10,11],[12,13],[14,15]]).start(0);
        }
        
        this.loopId = Transport.schedule(loop, "0");
      
        Tone.start();
        this.props.ctx.resume();
    }

    handleActiveStepChange = (i: number) => {
        if (this.props.handleActiveStepChange) this.props.handleActiveStepChange(i);
    }

    handleClick = () => {
        console.log(this.props);
        if (this.props.handleClick) this.props.handleClick(this.props.generator, this.state.steps.slice(0));
    }

    render() {
        const InstrumentStyle = {
            height: '3em',
            margin: '0.2em',
            borderRadius: 10,
            padding: 5,
            backgroundColor: this.props.selected ? '#2AC7DC' : '#696969',
            color: 'white',
            boxShadow: '2px 2px 5px #222',
        }
        return (
            <div style={InstrumentStyle} onClick={this.handleClick}>
                <p>{this.props.generator}</p>
            </div >
        )
    }
}

export const areEqual = (ar1, ar2) => {
    if (ar1.length !== ar2.length) return false;
    let equal = true;
    ar1.forEach((el, idx) => {
        if (el !== ar2[idx]) equal = false;
    });
    return equal;
}