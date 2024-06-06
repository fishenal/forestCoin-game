import { Container, Graphics, Rectangle, Sprite } from 'pixi.js';
import { randomShuffle } from '../utils/random';
import { Head } from '../components/Head';
import { workLine } from './Workline';
import gsap from 'gsap';
import { designConfig } from '../utils/designConfig';
import { navigation } from '../navigation';
import { WinPopup } from './WinPopup';
import { bgm, sfx } from '../utils/audio';

const innerWidth = designConfig.sixContent.width;
const coinWidth = designConfig.sixContent.coinWidth;
const gap = designConfig.sixContent.gap;
export class GameBoard extends Container {
    public row: number = 6;
    public col: number = 6;
    public gameNumberBoard: number[][] = [];
    public gameBoard: Head[][] = [];
    private blockContainer: Container;
    private coinContainer: Container;
    private hitLine: number; // 3 or 1
    private blockLine: number; // 0~n
    private background: Graphics;
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
                this.coinContainer.addChild(head);
            });
            this.gameBoard.push(colArr);
        });
        this.renderBackground();
        this.renderHitArea();
        this.renderVineBlock();
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
    private handleHeadClick(head: Head, colIdx: number, rowIdx: number) {
        sfx.play('audio/collect.mp3');
        workLine.addHid(head.hid);
        gsap.to(head, {
            alpha: 0,
            duration: 0.1,
            onComplete: () => {
                this.coinContainer.removeChild(head);
                if (this.coinContainer.children.length === 0) {
                    navigation.showOverlay(WinPopup);
                    return;
                }
                const currentCol = this.gameBoard[colIdx];

                currentCol.forEach((head, idx) => {
                    if (idx === rowIdx - 1) {
                        head.zIndex = 4;
                    }
                    if (idx < rowIdx) {
                        gsap.to(head, {
                            y: head.y + coinWidth + gap,
                            duration: 0.4,
                            ease: 'bounce.out',
                        });
                    }
                });
            },
        });
    }
}
export const gameBoard = new GameBoard();
