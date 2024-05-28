import { Container, Rectangle } from 'pixi.js';
import { randomShuffle } from '../utils/random';
import { Head } from '../components/Head';
import { workLine } from './Workline';
import { gold } from './Gold';

export class GameBoard extends Container {
    private row: number = 9;
    private col: number = 9;
    public gameNumberBoard: number[][] = [];
    public gameBoard: Head[][] = [];
    // public onHeadClick: (hid: number) => void = () => {};
    // public onClearCol: () => void = () => {};
    constructor() {
        super();
        this.y = 10;
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
        this.hitArea = new Rectangle(0, 8 * 60, 9 * 60, 60);

        this.gameNumberBoard.forEach((col, cid) => {
            const colArr: Head[] = [];

            col.forEach((hid: number, rid: number) => {
                const head = new Head({ hid, cidx: cid });
                head.x = cid * 60;
                head.y = rid * 60;
                head.on('pointerdown', () => {
                    this.handleFirstHeadClick(head, cid, rid);
                });

                colArr.push(head);
                this.addChild(head);
            });

            console.log('🚀 ~ GameBoard ~ this.gameNumberBoard.forEach ~ colArr:', colArr);
            this.gameBoard.push(colArr);
        });
    }
    private handleFirstHeadClick(head: Head, colIdx: number, rowIdx: number) {
        // console.log('🚀 ~ GameBoard ~ handleFirstHeadClick ~ rowIdx:', rowIdx);
        if (rowIdx === 0) {
            gold.addCoin(5);
        }
        // this.onHeadClick(head.hid);
        workLine.addHid(head.hid);
        gold.addCoin(1);
        head.visible = false;

        const currentCol = this.gameBoard[colIdx];

        currentCol.forEach((head) => {
            head.y += 60;
        });
        console.log('🚀 ~ GameBoard ~ handleFirstHeadClick ~ currentCol:', currentCol);
    }
}
export const gameBoard = new GameBoard();
