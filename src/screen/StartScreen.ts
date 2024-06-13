import { Container, Sprite } from 'pixi.js';
import { Background } from '../components/Background';
import { designConfig } from '../utils/designConfig';
import { levelBoard } from '../game/LevelBoard';
import { countdownline } from '../game/Countdownline';

const innerWidth = designConfig.sixContent.width;
class StartScreen extends Container {
    public static SCREEN_ID = 'startScreen';
    /** An array of bundle IDs for dynamic asset loading. */
    public static assetBundles = ['imgAssets', 'default'];
    private logoContainer: Container;
    private innerContainer: Container;
    private bg: Background;
    constructor() {
        super();
        this.bg = new Background();
        this.addChild(this.bg);
        this.innerContainer = new Container();
        this.innerContainer.x = 100;
        this.innerContainer.y = 0;
        this.innerContainer.width = innerWidth;

        const gameTitle = Sprite.from('gameTitle');
        gameTitle.width = innerWidth;
        gameTitle.height = innerWidth * 0.23;
        this.innerContainer.addChild(gameTitle);
        this.innerContainer.addChild(levelBoard);
        this.logoContainer = new Container();
        // this.logoContainer.x = window.innerWidth * 0.85;
        // this.logoContainer.y = window.innerHeight * 1.1;
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

        this.innerContainer.addChild(this.logoContainer);
        this.addChild(this.innerContainer);
    }

    /**
     * Called every frame.
     * @param time - Ticker object with time related data.
     */
    // public update(time: Ticker) {
    //     // console.log('on ticker', time);
    // }

    public async show() {
        this.visible = true;
        countdownline.stopCount();
        // background.show();
        levelBoard.show();
    }
    // public async hide() {
    //     this.visible = false;
    //     // this.logoContainer.visible = false;
    // }
    public resize(w: number, h: number) {
        // background.resize(w, h);
        // this.innerContainer.x = 15;
        this.innerContainer.x = w * 0.5 - innerWidth * 0.5;
        this.logoContainer.y = h * 0.9;
        this.logoContainer.x = innerWidth * 0.8;
        // this.bg.anchor = 0.5;
        this.bg.resize(w, h);
        // this.bg.width = w;
        // this.bg.height = h;
        // this.bg.pivot.x = w * 0.5;
        // this.bg.pivot.y = h * 0.5;
        // this.bg.x = w * 0.5;
        // this.bg.y = h * 0.5;
    }
}
export default StartScreen;
