import { Container, Graphics, Rectangle } from 'pixi.js';
import { randomShuffle } from '../utils/random';
import { Head } from '../components/Head';
import { workLine } from './Workline';
import { gold } from './Gold';
import gsap from 'gsap';

export class GameBoard extends Container {
    private row: number = 9;
    private col: number = 9;
    public gameNumberBoard: number[][] = [];
    public gameBoard: Head[][] = [];
    private hitLine: number;
    private hitAreaSign: Graphics;
    private background: Graphics;
    // public onHeadClick: (hid: number) => void = () => {};
    // public onClearCol: () => void = () => {};
    constructor() {
        super();
        this.y = 10;
        this.hitLine = this.row - 1;
        this.hitAreaSign = new Graphics();
        this.background = new Graphics();
        this.sortableChildren = true;
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
                head.x = cid * 60;
                head.y = rid * 60;
                head.on('pointerdown', () => {
                    this.handleHeadClick(head, cid, rid);
                });
                if (rid === this.hitLine) {
                    head.zIndex = 4;
                } else {
                    head.zIndex = 0;
                }

                colArr.push(head);
                this.addChild(head);
            });
            this.gameBoard.push(colArr);
        });
        this.renderBackground();
        this.renderHitArea();
    }
    renderBackground() {
        this.background.roundRect(-5, -5, this.row * 60, this.col * 60);
        this.background.fill(0x000000);
        this.background.alpha = 0.5;
        this.background.zIndex = 1;
        this.addChild(this.background);
    }
    renderHitArea() {
        const hitX = -5;
        const hitY = this.hitLine * 60 - 5;
        const hitW = this.col * 60;
        const hitH = 60;

        this.hitAreaSign.roundRect(hitX, hitY, hitW, hitH);
        this.hitAreaSign.fill(0xffffff);
        this.hitAreaSign.stroke({
            width: 2,
            color: 0x000000,
        });
        this.hitAreaSign.zIndex = 3;
        this.addChild(this.hitAreaSign);
        this.hitArea = new Rectangle(hitX, hitY, hitW, hitH);
    }
    private handleHeadClick(head: Head, colIdx: number, rowIdx: number) {
        if (rowIdx === 0) {
            gold.addCoin(5);
        }
        // this.onHeadClick(head.hid);
        workLine.addHid(head.hid);
        gold.addCoin(1);
        head.visible = false;

        const currentCol = this.gameBoard[colIdx];

        currentCol.forEach((head, idx) => {
            if (idx === rowIdx - 1) {
                head.zIndex = 4;
            }
            if (idx < rowIdx) {
                gsap.to(head, {
                    y: head.y + 60,
                });
            }
        });
        // console.log('🚀 ~ GameBoard ~ handleHeadClick ~ currentCol:', currentCol);
    }
}
export const gameBoard = new GameBoard();
