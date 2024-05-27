import { Container } from 'pixi.js';
import { Workline } from '../game/Workline';
import { GameBoard } from '../game/GameBoard';
class GameScreen extends Container {
    public static SCREEN_ID = 'gameScreen';
    public static assetBundles = ['imgAssets'];
    private gameBoard: GameBoard;
    private workLine: Workline;
    constructor() {
        super();
        this.gameBoard = new GameBoard();
        this.gameBoard.onHeadClick = (hid: number) => {
            this.handleHeadClick(hid);
        };
        this.addChild(this.gameBoard);
        this.workLine = new Workline();
        this.addChild(this.workLine);
    }
    public async show() {
        this.gameBoard.show();
        this.workLine.show();
    }

    private handleHeadClick(hid: number) {
        // console.log('🚀 ~ GameScreen ~ handleHeadClick ~ cidx:', cidx);
        this.workLine.addHid(hid);
        // this.game.pushToWorkline(hid);
        // this.game.gameBoard[ridx];
        // this.showWorkline();
    }

    update() {
        // console.log('🚀 ~ GameScreen ~ update ~ this.game.worklineContainer:', this.game.worklineContainer);
        // this.addChild(this.game.worklineContainer);
        // this.game.worklineContainer.show();
    }
}

export default GameScreen;
