import { SoundGenerator } from "./sound-generators";

export class Kick implements SoundGenerator {
    private ctx: AudioContext;
    public tone: number;
    public decay: number;
    private osc!: OscillatorNode;
    private oscEnvelope!: GainNode;
    public volume: number;

    constructor(ctx: AudioContext) {
        this.ctx = ctx;
        this.tone = 167.1;
        this.decay = 0.5;
        this.volume = 1;
    }

    setup() {
        this.osc = this.ctx.createOscillator();
        this.oscEnvelope = this.ctx.createGain();

        this.osc.connect(this.oscEnvelope);
        this.oscEnvelope.connect(this.ctx.destination);
    }

    trigger(time: number) {
        if (this.volume == 0) { return };
        this.setup();

        this.osc.frequency.setValueAtTime(this.tone, time + 0.001);
        this.oscEnvelope.gain.linearRampToValueAtTime(this.volume, time + 0.1)

        this.osc.frequency.exponentialRampToValueAtTime(1, time + this.decay);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01 * this.volume, time + this.decay);
        this.oscEnvelope.gain.linearRampToValueAtTime(0, time + this.decay + 0.1)

        this.osc.start(time);

        this.osc.stop(time + this.decay + 0.1);
    }

    setTone = (tone: number) => {
        this.tone = tone;
    }

    setVolume = (vol: number) => {
        this.volume = vol;
    }
}