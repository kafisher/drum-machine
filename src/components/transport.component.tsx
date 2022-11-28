import * as React from 'react';
import { Container } from './container';
import { Instrument } from './instrument';
import { Steps } from './steps';
import { Transport } from 'tone';
import { PlayPause } from './playpause';
import * as Tone from 'tone';

export class TransportComponent extends React.Component<any, any> {
    // private ctx: AudioContext;    
    constructor(props) {
        super(props);
        this.state = {
            steps: [false, false, false, false, false, false, false, 
                false, false, false, false, false, false, false, 
                false, false],
                selected: null, 
                bpm: 120,
        }
        Transport.loop = true;
        Transport.loopEnd = '1m'
        // this.ctx = new AudioContext();
    }

    //Hack to get audio to work 
    async componentDidMount() {
        await Tone.start()
        console.log('audio is ready')
    }

    pause = () => {
        Transport.stop();
    }

    play = () => {
        Transport.start();
      
    }

    private handleStepChange = (id: number) => {
        const s = this.state.steps;
        s[id] = !s[id];
        this.setState({
            steps: s,
        })
    }

    private selectInstrument = (selected: string, steps: boolean[]) => {
        if (this.state.selected === selected) {
            this.setState({
                selected: null, steps: [false, false, false, false, false, false, false, false,
                    false, false, false, false, false, false, false, false]
            })
        } else {
            this.setState({ selected, steps })
        }
    }

    // handleBPMChange = (bpm: number) => {
    //     Transport.bpm.value = bpm;
    //     this.setState({ bpm });
    // }

    render() {
        return (
            <div>
                <h1 style={{ color: 'red'}}>Web Drum Machine</h1>
                <div style={{ display: 'block' }}>
                    {/* <BPM handleChange={this.handleBPMChange} value={this.state.bpm} /> */}
                    <PlayPause play={this.play} pause={this.pause} />
                </div>
                <Container steps={this.state.steps} selectedInstrument={this.state.selected}>
                    <Instrument ctx={this.props.ctx} key="Kick" generator="Kick" handleClick={this.selectInstrument}/>
                    <Instrument ctx={this.props.ctx} key="Snare" generator="Snare" handleClick={this.selectInstrument} />
                    <Instrument ctx={this.props.ctx} key="Clap" generator="Clap" handleClick={this.selectInstrument} />
                    <Instrument ctx={this.props.ctx} key="HiHat" generator="HiHat" handleClick={this.selectInstrument} />
                </Container>
                <Steps handleStepChange={this.handleStepChange} steps={this.state.steps} />
            </div>
        )
    }
}