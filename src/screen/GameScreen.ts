import { Container } from 'pixi.js';
import { Workline, workLine } from '../game/Workline';
import { GameBoard, gameBoard } from '../game/GameBoard';
import { Gold, gold } from '../game/Gold';
import { tool } from '../game/Tool';
class GameScreen extends Container {
    public static SCREEN_ID = 'gameScreen';
    public static assetBundles = ['imgAssets'];
    private gameBoard: GameBoard;
    private workLine: Workline;
    private gold: Gold;
    private tool: Tool;
    constructor() {
        super();
        // this.gold = gold;
        this.addChild(gold);

        // this.gameBoard = gameBoard;
        // this.gameBoard.onHeadClick = (hid: number) => {
        //     this.handleHeadClick(hid);
        // };
        // this.gameBoard.onClearCol = () => {
        //     this.gold.addCoin(5);
        // };
        this.addChild(gameBoard);

        // this.workLine = workLine;
        // this.workLine.onThreeRemove = () => {
        //     this.gold.addCoin(3);
        // };
        this.addChild(workLine);
        this.addChild(tool);
        // console.log('🚀 ~ GameScreen ~ update ~ this.width:', this.width);
    }
    public async show() {
        gameBoard.show();
        workLine.show();
        tool.show();
        // console.log('🚀 ~ GameScreen ~ update ~ this.width:', this.width);
        this.x = window.innerWidth * 0.5 - this.width * 0.5;
        this.y = 60;
    }

    // private handleHeadClick(hid: number) {
    //     // console.log('🚀 ~ GameScreen ~ handleHeadClick ~ cidx:', cidx);
    //     this.workLine.addHid(hid);
    //     this.gold.addCoin(1);
    //     // this.game.pushToWorkline(hid);
    //     // this.game.gameBoard[ridx];
    //     // this.showWorkline();
    // }
    resize(w: number, h: number) {
        // console.log('🚀 ~ GameScreen ~ resize ~ w:', w);
        // this.width = 400;
        // this.height = h;
        // console.log(this.width);
        // this.gameContainerPosition.x = w * 0.5;
        // this.gameContainerPosition.y = 0;
        // this.x = this.gameContainerPosition.x;
        // this.y = this.gameContainerPosition.y;
        // this.x = w / 2;
        // this.pivot.x = w / 2;
        // // this.x = w / 2;
        // this.x = w / 4;
        // this.y = 20;
    }
    update() {
        //this.width
        // console.log('🚀 ~ GameScreen ~ update ~ this.width:', this.width);
        // console.log('🚀 ~ GameScreen ~ update ~ this.game.worklineContainer:', this.game.worklineContainer);
        // this.addChild(this.game.worklineContainer);
        // this.game.worklineContainer.show();
    }
}

export default GameScreen;
