// ToneSetup.mjs
class ToneSetup {
    constructor(activateButton) {
        this.activateButton = activateButton;
        this.isActivated = false;
        this.Tone = Tone; // CDNから読み込んだToneを使用
        this.toneLoaded = true;
        this.toneStarted = false;
        this.setupEventListeners();
    }

    async ensureToneStarted() {
        if (!this.toneStarted) {
            if (!this.Tone) {
                console.error('Tone.js object is not initialized.');
                return;
            }
            try {
                await this.Tone.start();
                this.toneStarted = true;
                console.log('Tone.js started!');
            } catch (error) {
                console.error('Error starting Tone.js:', error);
                console.error('Detailed error:', error.message);
            }
        }
        return this.Tone;
    }

    setupEventListeners() {
        this.activateButton.addEventListener('click', async () => {
            try {
                await this.ensureToneStarted();
                this.isActivated = true;
                this.activateButton.disabled = true;
                await this.onActivation();
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    async onActivation() {
        console.log('Tone.js activated!');
    }

    getTone() {
        return this.Tone;
    }

    isToneActivated() {
        return this.isActivated;
    }
}

export { ToneSetup };