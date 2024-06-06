import { Container, Graphics, Rectangle, Sprite } from 'pixi.js';
import { randomItem, randomShuffle } from '../utils/random';
import { Head } from '../components/Head';
import { workLine } from './Workline';
import gsap from 'gsap';
import { designConfig } from '../utils/designConfig';
import { navigation } from '../navigation';
import { WinPopup } from './WinPopup';
import { bgm, sfx } from '../utils/audio';
import { setup } from './Setup';

const innerWidth = designConfig.sixContent.width;
const coinWidth = designConfig.sixContent.coinWidth;
const gap = designConfig.sixContent.gap;
export class GameBoard extends Container {
    public row: number = 6;
    public col: number = 6;
    public gameNumberBoard: number[][] = [];
    public gameBoard: Head[][] = [];
    private blockContainer: Container;
    private coinContainer: Container<Head>;
    private hitLine: number; // 3 or 1
    private blockLine: number; // 0~n
    private background: Graphics;
    private clearBlockMode: boolean;
    // public onHeadClick: (hid: number) => void = () => {};
    // public onClearCol: () => void = () => {};
    constructor() {
        super();
        this.x = 0;
        this.y = 65;
        this.hitLine = 1;
        this.blockLine = 3;
        this.width = innerWidth;
        this.height = this.row * coinWidth + (this.row + 1) * gap;
        // this.hitAreaSign = new Graphics();
        this.background = new Graphics();
        this.sortableChildren = true;
        this.clearBlockMode = false;
        this.blockContainer = new Container();
        this.blockContainer.x = 0;
        this.blockContainer.y = 0;
        this.blockContainer.zIndex = 6;
        // this.blockContainer.x = -9999;
        this.addChild(this.blockContainer);

        this.coinContainer = new Container();
        this.coinContainer.eventMode = 'static';
        this.coinContainer.zIndex = 2;
        this.addChild(this.coinContainer);
    }

    public show() {
        for (let i = 1; i <= this.col; i++) {
            const colArr: number[] = [];
            for (let j = 1; j <= this.row; j++) {
                colArr.push(j);
            }
            randomShuffle(colArr);
            colArr.forEach((hid, idx) => {
                this.renderHead(hid, i - 1, idx);
            });
            //this.gameNumberBoard.push(colArr);
        }
        this.renderBackground();
        // this.renderHitArea();
        // this.renderVineBlock();
    }
    renderHead(hid: number, xx: number, yy: number) {
        const head = new Head({ hid, xx, yy });
        head.on('pointerdown', () => {
            this.handleHeadClick(head);
        });
        head.x = xx * setup.coinWidth + setup.gap * (xx + 1);
        head.y = yy * setup.coinWidth + setup.gap * (yy + 1);
        head.zIndex = 4;
        this.coinContainer.addChild(head);
        gsap.from(head, {
            alpha: 0,
        });
        return head;
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
    renderVineBlock() {
        this.gameNumberBoard[0].forEach((_, rid) => {
            if (rid + 1 <= this.blockLine) {
                const block = Sprite.from('blockline');
                block.x = 0;
                block.alpha = 0;
                block.width = innerWidth;
                block.height = coinWidth + gap;
                block.y = rid * coinWidth + gap * (rid + 1);
                this.blockContainer.addChild(block);
                this.blockContainer.x = 0;
                gsap.to(block, {
                    alpha: 1,
                });
            } else if (this.gameNumberBoard.length - rid > this.hitLine) {
                // render vine forbid
                const vine = Sprite.from('vine');
                vine.x = 0;
                vine.alpha = 0;
                vine.width = innerWidth;
                vine.height = coinWidth + gap;
                vine.y = rid * coinWidth + gap * (rid + 1);
                this.blockContainer.addChild(vine);
                this.blockContainer.x = 0;
                gsap.to(vine, {
                    alpha: 1,
                });
            }
        });
    }
    renderHitArea() {
        const hitX = 0;
        const hitY = (this.gameNumberBoard.length - this.hitLine) * (coinWidth + gap);
        const hitW = innerWidth;
        const hitH = (coinWidth + gap) * this.hitLine;
        this.hitArea = new Rectangle(hitX, hitY, hitW, hitH);
    }
    public clearBlocks() {
        // open hitarea
        gsap.fromTo(
            this.blockContainer,
            {
                alpha: 1,
            },
            {
                alpha: 0,
                onComplete: () => {
                    const hitX = 0;
                    const hitY = 0;
                    const hitW = innerWidth;
                    const hitH = (coinWidth + gap) * this.gameNumberBoard.length;
                    this.hitArea = new Rectangle(hitX, hitY, hitW, hitH);
                    this.clearBlockMode = true;
                },
            },
        );
    }
    public resetBlocks() {
        gsap.to(this.blockContainer, {
            alpha: 1,
            onComplete: () => {
                this.renderHitArea();
                this.clearBlockMode = false;
            },
        });
    }
    public returnToGameboard(hid: number) {
        // get availble col
        const availbleCol: number[] = [];
        const currentCol: number[] = [];
        for (let i = 0; i < this.col; i++) {
            currentCol.push(0);
        }

        this.coinContainer.children.forEach((head) => {
            currentCol[head.xx] += 1; // [6,6,4,3,5,6]
        });

        currentCol.forEach((number, colIdx) => {
            if (number < this.row) {
                availbleCol.push(colIdx);
            }
        });
        // console.log('🚀 ~ GameBoard ~ returnToGameboard ~ availbleCol:', currentCol);
        // console.log('🚀 ~ GameBoard ~ returnToGameboard ~ availbleCol:', availbleCol);
        if (availbleCol.length > 0) {
            const randomCol = randomItem<number[]>(availbleCol) as number;
            // console.log('🚀 ~ GameBoard ~ returnToGameboard ~ randomCol:', randomCol);
            const xx = randomCol;
            const yy = this.row - currentCol[randomCol] - 1;
            // console.log('🚀 ~ GameBoard ~ returnToGameboard ~ this.row:', this.row);
            this.renderHead(hid, xx, yy);
            // const rowIdx = this.row - this.gameBoard[colIdx].length - 1;
            // const newHead = this.renderHead(head.hid, rowIdx, colIdx);
            // this.gameBoard[colIdx].push(newHead);
        }

        // this.gameBoard.forEach((colArr, colIdx) => {
        //     if (colArr.length < this.col) {
        //         availbleCol.push(colIdx);
        //     }
        // });
        // if (availbleCol.length > 0) {
        //     const colIdx = randomItem<number[]>(availbleCol) as number;
        //     const rowIdx = this.row - this.gameBoard[colIdx].length - 1;

        //     const newHead = this.renderHead(head.hid, rowIdx, colIdx);
        //     this.gameBoard[colIdx].push(newHead);
        // }
        // console.log('🚀 ~ GameBoard ~ returnToGameboard ~ availbleCol:', availbleCol);
    }

    private handleHeadClick(clickHead: Head) {
        sfx.play('audio/collect.mp3');
        if (this.clearBlockMode) {
            this.resetBlocks();
        }
        workLine.addHid(clickHead.hid);
        gsap.to(clickHead, {
            alpha: 0,
            duration: 0.1,
            onComplete: () => {
                this.coinContainer.removeChild(clickHead);
                if (this.coinContainer.children.length === 0) {
                    navigation.showOverlay(WinPopup);
                    return;
                }
                this.coinContainer.children.forEach((head: Head) => {
                    if (head.xx === clickHead.xx && head.yy < clickHead.yy) {
                        gsap.to(head, {
                            y: head.y + coinWidth + gap,
                            duration: 0.4,
                            ease: 'bounce.out',
                            onComplete: () => {
                                head.yy += 1;
                            },
                        });
                    }
                });
            },
        });
    }
}
export const gameBoard = new GameBoard();
