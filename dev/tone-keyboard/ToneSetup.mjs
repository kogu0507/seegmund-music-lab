// ToneSetup.mjs
class ToneSetup {
    constructor(activateButtonSection, activateButton, activateStatus, toneElements) {
        this.activateButtonSection = activateButtonSection;
        this.activateButton = activateButton;
        this.activateStatus = activateStatus;
        this.toneElements = toneElements;
        this.isActivated = false;
        this.Tone = Tone;
        this.toneLoaded = false;
        this.toneStarted = false;
        this.statusMessage = 'Initializing Tone.js...';
        this.setupEventListeners();
        this.initializeTone();
    }

    async initializeTone() {
        try {
            this.toneLoaded = true;
            this.statusMessage = 'Tone.js loaded. Click to start.';
            this.updateStatus();
        } catch (error) {
            console.error('Error initializing Tone.js:', error);
            this.statusMessage = 'Error loading Tone.js.';
            this.updateStatus();
        }
    }

    async ensureToneStarted() {
        if (!this.toneStarted) {
            if (!this.Tone) {
                console.error('Tone.js object is not initialized.');
                return;
            }
            try {
                this.statusMessage = 'Starting Tone.js...';
                this.updateStatus();

                await this.Tone.start();
                this.toneStarted = true;
                this.statusMessage = 'Tone.js started!';
                this.updateStatus();
                console.log('Tone.js started!');
            } catch (error) {
                console.error('Error starting Tone.js:', error);
                console.error('Detailed error:', error.message);
                this.statusMessage = 'Error starting Tone.js.';
                this.updateStatus();
            }
        }
        return this.Tone;
    }

    setupEventListeners() {
        this.activateButton.addEventListener('click', async () => {
            try {
                await this.ensureToneStarted();
                this.isActivated = true;
                this.activateButtonSection.classList.add('d-none'); // ボタンを非表示
                if (Array.isArray(this.toneElements)) { // toneElementsが配列であることを確認
                    this.toneElements.forEach(element => {
                        if (element instanceof NodeList) { // keyboardSectionsの場合
                            element.forEach(item => {
                                item.classList.remove('opacity-25');
                            });
                        } else { // toneDictationSectionの場合
                            element.classList.remove('opacity-25');
                        }
                    });
                }
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
    
    updateStatus() {
        if (this.activateStatus) {
            this.activateStatus.textContent = this.statusMessage;
        }
    }
}

export { ToneSetup };