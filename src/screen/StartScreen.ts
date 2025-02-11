import { Container, Sprite } from 'pixi.js';
import { Background } from '../components/Background';
import { designConfig } from '../utils/designConfig';
import { levelBoard } from '../game/LevelBoard';
import { countdownline } from '../game/Countdownline';

const innerWidth = designConfig.content.innerWidth;
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
        const logo = Sprite.from('fishenalLogo');
        logo.width = 147;
        logo.height = 107;
        logo.anchor.y = 0.5;
        this.logoContainer.addChild(logo);

        // const cLogo = Sprite.from('crazyGameLogo');
        // cLogo.width = 165;
        // cLogo.height = 60;
        // cLogo.anchor.y = 0.5;
        // cLogo.x = -170;
        // this.logoContainer.addChild(cLogo);

        this.innerContainer.addChild(this.logoContainer);
        this.addChild(this.innerContainer);
    }

    public async show() {
        this.visible = true;
        countdownline.stopCount();
        levelBoard.show();
    }
    public resize(w: number, h: number) {
        this.innerContainer.x = w * 0.5 - innerWidth * 0.5;
        this.logoContainer.y = h * 0.9;
        this.logoContainer.x = innerWidth * 0.8;
        this.bg.resize(w, h);
    }
}
export default StartScreen;
