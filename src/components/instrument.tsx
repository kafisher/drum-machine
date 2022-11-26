import * as React from 'react';
import { SoundGenerator } from '../sound-generators/sound-generators';
import { Kick } from '../sound-generators/kick';
import { Snare } from '../sound-generators/snare';
import { Clap } from '../sound-generators/clap';
import { HiHat } from '../sound-generators/hat';
import { Time, Transport } from 'tone';
import { Instruments } from './container';
import * as Tone from 'tone';

export interface InstrumentProps {
    // key: string;
    generator: Instruments;
    steps?: boolean[];
    selected?: boolean;
    handleClick?: (generator: string, steps: boolean[]) => void;
}

export class Instrument extends React.Component<InstrumentProps, any> {
    private sound: any;
    private ctx: AudioContext;
    private loopId: number;

    constructor(props: any ) {
        super(props);
        this.ctx = new AudioContext;
        // this.sound = new Kick(this.ctx);
        switch (props.generator) {
            case 'Kick':
                this.sound = new Kick(this.ctx);
                break;
            case 'Snare':
                this.sound = new Snare(this.ctx);
                break;
            case 'HiHat':
                this.sound = new HiHat(this.ctx);
                break;
            case 'Clap':
                this.sound = new Clap(this.ctx);
                break;
        }
        this.state = {
            steps: [false, false, false, false, false, false, false, 
                false, false, false, false, false, false, false, 
                false, false],
        }

        

        Transport.bpm.value = 120;
        this.loopId = 0;


        // Transport.loop = true;
        // Transport.loopEnd = '1m';
        // Transport.start();
    }

    componentDidUpdate() {
        // Tone.start();
        // this.ctx.resume();
        if (this.props.steps && !areEqual(this.props.steps, this.state.steps)) {
            this.setState({
                steps: this.props.steps.slice(0),
            });
            this.createLoop();
        }
    }

    createLoop = () => {
        console.log('staring loop ');
        if (!this.props.steps) { return; }
        Transport.clear(this.loopId);
        const loop = (time: number) => {
            this.state.steps.forEach((s, i) => {
                if (s) {
                    this.sound.trigger(time + i * Time('16n').toSeconds())
                }
            });
        }
        this.loopId = Transport.schedule(loop, "0");


        Tone.start();
        this.ctx.resume();
 
        
    }

    handleClick = () => {
        console.log(this.props);
        if (this.props.handleClick) this.props.handleClick(this.props.generator, this.state.steps.slice(0));
    }
    // public handleClick = () => {
    //     // this.kick.trigger(this.ctx.currentTime);
    //     // this.ctx = new AudioContext();
    //     // this.kick = new Kick(this.ctx);
    //     // this.ctx.resume();
    //     Tone.start();
    //     this.createLoop();
    //     Transport.start();
    //     // Transport.debug = true;
    //     // console.log(Transport);
    // }

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
    // return JSON.stringify(ar1)==JSON.stringify(ar2);
    if (ar1.length !== ar2.length) return false;
    let equal = true;
    ar1.forEach((el, idx) => {
        if (el !== ar2[idx]) equal = false;
    });
    return equal;
}