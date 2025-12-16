// 8-Bit Audio Synthesizer for Super Piper
// Generates sounds dynamically to avoid file dependencies

class PiperAudio {
    ctx: AudioContext | null = null;
    musicOscillators: OscillatorNode[] = [];
    isMuted: boolean = false;

    constructor() {
        if (typeof window !== 'undefined') {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            this.ctx = new AudioContext();
        }
    }

    playJump() {
        if (!this.ctx || this.isMuted) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'square';
        o.frequency.setValueAtTime(150, this.ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.1);
        g.gain.setValueAtTime(0.1, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start();
        o.stop(this.ctx.currentTime + 0.1);
    }

    playAttack() {
        if (!this.ctx || this.isMuted) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(100, this.ctx.currentTime);
        o.frequency.linearRampToValueAtTime(50, this.ctx.currentTime + 0.1);
        g.gain.setValueAtTime(0.1, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start();
        o.stop(this.ctx.currentTime + 0.1);
    }

    playExplosion() {
        if (!this.ctx || this.isMuted) return;
        // Noise buffer
        const bufferSize = this.ctx.sampleRate * 0.2; // 200ms
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const g = this.ctx.createGain();
        
        g.gain.setValueAtTime(0.2, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        
        noise.connect(g);
        g.connect(this.ctx.destination);
        noise.start();
    }

    playWin() {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;
        [440, 554, 659, 880].forEach((freq, i) => {
            const o = this.ctx!.createOscillator();
            const g = this.ctx!.createGain();
            o.type = 'square';
            o.frequency.value = freq;
            g.gain.value = 0.1;
            g.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            o.connect(g);
            g.connect(this.ctx!.destination);
            o.start(now + i * 0.1);
            o.stop(now + i * 0.1 + 0.4);
        });
    }
}

export const audio = new PiperAudio();
