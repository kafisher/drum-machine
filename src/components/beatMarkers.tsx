import * as React from 'react';
import { Time } from 'tone';

export class BeatMarkers extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    private sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    private startBeatMarkers = () => {
        // // this.sleep(Time('16n').toSeconds());
        
        // if (!play) {
        //     this.setState({beats: [true, false, false, false, false, false, false, 
        //             false, false, false, false, false, false, false, 
        //             false, false],});
        //     return;
        // }
        let i = 0;
        console.log("starting beats");
        console.log(this.props.isPlaying);
        console.log(this.props);
        while (this.props.isPlaying) {
            this.props.beatMarkers[i] = true;
            if (i == 0) {
                this.props.beatMarkers[-1] = false;
                i += 1;
            }
            else if (i == 15) {
                this.props.beatMarkers[i-1] = false;
                i = 0;
            }
            else {
                this.props.beatMarkers[i-1] = false;
                i += 1
            }
            this.setState({beats: this.props.beatMarkers});
            console.log(this.props.beatMarkers);
            this.sleep(Time('16n').toSeconds());
        }
        // this.setState({beats: [true, false, false, false, false, false, false, 
        //     false, false, false, false, false, false, false, 
        //     false, false],});
    }

    componentDidMount() {
        this.startBeatMarkers();
    }

    // componentDidUpdate() {
    //     this.startBeatMarkers();
    // }
    
    render() {
        return (
            <div style={{ flex: 1, flexDirection: 'row' }}>
                {this.props.beatMarkers.map((beat, idx) => {
                    return (
                        <BeatMarker on={beat} key={idx} id={idx} />
                    )
                })}
            </div>
        )
    }
}