import { Container, Sprite, Ticker } from 'pixi.js';
import gsap from 'gsap';
import { sfx } from '../utils/audio';
import { navigation } from '../navigation';
import IndicatorCover from './IndicatorCover';
import { background } from '../components/Background';
import { title } from '../components/Title';
import { designConfig } from '../utils/designConfig';
import { levelBoard } from '../components/LevelBoard';

const innerWidth = designConfig.sixContent.width;
class StartScreen extends Container {
    public static SCREEN_ID = 'startScreen';
    /** An array of bundle IDs for dynamic asset loading. */
    public static assetBundles = ['imgAssets'];
    private logoContainer: Container;
    private innerContainer: Container;
    constructor() {
        super();
        this.addChild(background);
        this.innerContainer = new Container();
        this.innerContainer.x = 100;
        this.innerContainer.y = 0;
        this.innerContainer.width = innerWidth;
        console.log('🚀 ~ StartScreen ~ constructor ~ innerWidth:', innerWidth);

        this.innerContainer.addChild(title);
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
    public update(time: Ticker) {
        // console.log('on ticker', time);
    }

    public async show() {
        this.visible = true;
        await title.show();
        await background.show();
        await levelBoard.show();
    }
    public async hide() {
        this.visible = false;
        // this.logoContainer.visible = false;
    }
    public resize(w: number, h: number) {
        background.resize(w, h);
        // this.innerContainer.x = 15;
        this.innerContainer.x = w * 0.5 - innerWidth * 0.5;
        this.innerContainer.y = 60;
        this.logoContainer.y = h * 0.8;
        this.logoContainer.x = innerWidth * 0.8;
    }
}
export default StartScreen;
