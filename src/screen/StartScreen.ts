import { Container, Sprite, Ticker } from 'pixi.js';
import { CommonButton } from '../ui/CommonButton';
import gsap from 'gsap';
import { sfx } from '../utils/audio';
import { navigation } from '../navigation';
import IndicatorCover from './IndicatorCover';
class StartScreen extends Container {
    public static SCREEN_ID = 'startScreen';
    /** An array of bundle IDs for dynamic asset loading. */
    public static assetBundles = ['preload'];
    private title: Sprite;
    private startButton: CommonButton;
    // private logo: Sprite;
    // private cLogo: Sprite;
    private logoContainer: Container;
    private outX: number;
    public onStartClick: () => void;
    constructor() {
        super();
        this.onStartClick = () => {};
        this.title = Sprite.from('title');
        this.outX = window.innerWidth + 1500;
        this.title.x = this.outX;

        this.addChild(this.title);

        this.startButton = new CommonButton({
            text: 'Start',
            radius: 15,
            onPress: () => {
                sfx.play('audio/click.wav');
                this.hide();
                this.onStartClick();
            },
        });
        this.startButton.pivot.x = this.startButton.width / 2;
        this.startButton.x = this.outX;

        this.addChild(this.startButton);

        this.logoContainer = new Container();
        this.logoContainer.x = window.innerWidth * 0.85;
        this.logoContainer.y = window.innerHeight * 1.1;
        const logo = Sprite.from('fishenalLogo');
        logo.width = 147;
        logo.height = 107;
        logo.anchor.y = 0.5;
        this.logoContainer.addChild(logo);

        const cLogo = Sprite.from('crazyGameLogo');
        cLogo.width = 165;
        cLogo.height = 60;
        cLogo.anchor.y = 0.5;
        cLogo.x = -170;
        this.logoContainer.addChild(cLogo);

        this.addChild(this.logoContainer);
    }

    /**
     * Called every frame.
     * @param time - Ticker object with time related data.
     */
    public update(time: Ticker) {
        // console.log('on ticker', time);
    }

    public async show() {
        this.visible = true;
        this.startButton.visible = true;
        await gsap.to(this.title, {
            x: 0,
            duration: 0.6,
            ease: 'back.out',
        });
        await gsap.to(this.startButton, {
            x: window.innerWidth / 2 + this.startButton.width / 2,
            duration: 0.8,
            ease: 'power2.out',
        });
        this.logoContainer.visible = true;
        navigation.showOverlay(IndicatorCover, {});
    }
    public async hide() {
        this.visible = false;
        await gsap.to(this.title, {
            x: this.outX * -1,
            duration: 0.6,
            ease: 'back.in',
        });
        await gsap.to(this.startButton, {
            x: this.outX * -1,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                this.startButton.visible = false;
            },
        });

        this.logoContainer.visible = false;
    }
    public resize(w: number, h: number) {
        this.title.width = w;
        this.title.height = (w * 371) / 1954;
        this.title.y = h / 5;
        this.startButton.width = w / 4;
        this.startButton.height = this.startButton.width / 3;
        this.startButton.y = (h * 2) / 3;
        this.logoContainer.x = w * 0.85;
        this.logoContainer.y = h * 0.9;
        if (this.visible) {
            this.show();
        }
    }
}
export default StartScreen;
