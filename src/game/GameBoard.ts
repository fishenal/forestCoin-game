import { Container, Graphics, Rectangle, Sprite } from 'pixi.js';
import { randomShuffle } from '../utils/random';
import { Head } from '../components/Head';
import { workLine } from './Workline';
import { gold } from './Gold';
import gsap from 'gsap';
import { designConfig } from '../utils/designConfig';

const innerWidth = designConfig.sixContent.width;
const coinWidth = designConfig.sixContent.coinWidth;
const gap = designConfig.sixContent.gap;
export class GameBoard extends Container {
    public row: number = 6;
    public col: number = 6;
    public gameNumberBoard: number[][] = [];
    public gameBoard: Head[][] = [];
    private vineContainer: Container;
    private hitLine: number; // 3 or 1
    private hitAreaSign: Graphics;
    private background: Graphics;
    // public onHeadClick: (hid: number) => void = () => {};
    // public onClearCol: () => void = () => {};
    constructor() {
        super();
        this.x = 0;
        this.y = 100;
        this.hitLine = 3;
        this.width = innerWidth;
        this.height = this.row * coinWidth + (this.row + 1) * gap;
        this.hitAreaSign = new Graphics();
        this.background = new Graphics();
        this.sortableChildren = true;
        this.vineContainer = new Container();
        this.vineContainer.x = 0;
        this.vineContainer.y = 0;
        this.vineContainer.zIndex = 5;
        // this.vineContainer.x = -9999;
        this.addChild(this.vineContainer);
        this.eventMode = 'static';
        this.init();
    }

    private init() {
        for (let i = 1; i <= this.col; i++) {
            const colArr = [];
            for (let j = 1; j <= this.row; j++) {
                colArr.push(j);
            }
            randomShuffle(colArr);
            this.gameNumberBoard.push(colArr);
        }
    }
    public show() {
        this.gameNumberBoard.forEach((col, cid) => {
            const colArr: Head[] = [];

            col.forEach((hid: number, rid: number) => {
                const head = new Head({ hid, cidx: cid });
                head.x = cid * coinWidth + gap * (cid + 1);
                head.y = rid * coinWidth + gap * (rid + 1);
                head.on('pointerdown', () => {
                    this.handleHeadClick(head, cid, rid);
                });
                head.zIndex = 4;

                colArr.push(head);
                this.addChild(head);
            });
            this.gameBoard.push(colArr);
        });
        this.renderBackground();
        this.renderHitArea();
        this.renderVine();
    }
    renderBackground() {
        this.background.roundRect(0, 0, innerWidth, this.col * coinWidth);
        this.background.fill(0xd6ad98);
        this.background.stroke({
            width: 2,
            color: 0x301f23,
        });
        this.background.width = innerWidth;
        this.background.height = this.col * coinWidth + (this.col + 1) * gap;
        // this.background.alpha = 0.5;
        this.background.zIndex = 1;
        this.addChild(this.background);
    }
    renderVine() {
        this.gameNumberBoard[0].forEach((_, rid) => {
            if (this.gameNumberBoard.length - rid > this.hitLine) {
                // render vine forbid
                const vine = Sprite.from('vine');
                // vine.x = -1 * innerWidth;
                vine.width = innerWidth;
                vine.height = coinWidth + gap;
                vine.y = rid * coinWidth + gap * (rid + 1);
                this.vineContainer.addChild(vine);
                // TODO, vine ani
                // gsap.to(vine, {
                //     x: 0,
                // });
            }
        });
    }
    renderHitArea() {
        const hitX = 0;
        const hitY = (this.gameNumberBoard.length - this.hitLine) * (coinWidth + gap);
        const hitW = innerWidth;
        const hitH = (coinWidth + gap) * this.hitLine;

        // this.hitAreaSign.roundRect(hitX, hitY, hitW, hitH);
        // this.hitAreaSign.fill(0xffffff);
        // this.hitAreaSign.stroke({
        //     width: 2,
        //     color: 0x000000,
        // });
        // this.hitAreaSign.zIndex = 3;
        // this.addChild(this.hitAreaSign);
        this.hitArea = new Rectangle(hitX, hitY, hitW, hitH);
    }
    private handleHeadClick(head: Head, colIdx: number, rowIdx: number) {
        if (rowIdx === 0) {
            gold.addCoin(5);
        }
        // this.onHeadClick(head.hid);
        workLine.pushHid(head.hid);
        gold.addCoin(1);
        head.visible = false;

        const currentCol = this.gameBoard[colIdx];

        currentCol.forEach((head, idx) => {
            if (idx === rowIdx - 1) {
                head.zIndex = 4;
            }
            if (idx < rowIdx) {
                gsap.to(head, {
                    y: head.y + coinWidth + gap,
                });
            }
        });
        // console.log('🚀 ~ GameBoard ~ handleHeadClick ~ currentCol:', currentCol);
    }
}
export const gameBoard = new GameBoard();
