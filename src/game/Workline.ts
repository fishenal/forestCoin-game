import { Container, Graphics } from 'pixi.js';
import { Head } from '../components/Head';
import { gold } from './Gold';
import gsap from 'gsap';
import { gameBoard } from './GameBoard';
import { designConfig } from '../utils/designConfig';
import { PlaceHolder } from '../components/PlaceHolder';

const innerWidth = designConfig.sixContent.width;
const coinWidth = designConfig.sixContent.coinWidth;
const gap = designConfig.sixContent.gap;
export class Workline extends Container {
    private hidArr: number[] = [];
    private limitNum: number;
    private size: number;
    private headContainer: Container<Head>;
    private placeholderContainer: Container<PlaceHolder>;
    private plate: Graphics;
    public onThreeRemove: () => void = () => {};
    constructor() {
        super();
        this.limitNum = 7; //7 or 5
        this.size = (innerWidth - gap * (this.limitNum + 1)) / this.limitNum;
        // const width = 60 * 7;
        // const height = 60;
        this.width = innerWidth;
        this.height = coinWidth + gap * 2;
        this.y = gameBoard.row * coinWidth + (gameBoard.row + 1) * gap + 20;
        this.x = 0;
        this.headContainer = new Container();
        this.headContainer.x = 0;
        this.headContainer.y = 0;
        this.headContainer.zIndex = 5;
        this.placeholderContainer = new Container();
        this.placeholderContainer.x = 0;
        this.placeholderContainer.y = 0;
        this.plate = new Graphics();

        // this.plate.alpha = 0.5;

        this.addChild(this.plate);
        this.addChild(this.headContainer);
        this.addChild(this.placeholderContainer);
    }
    public show() {
        // this.headContainer.removeChildren();
        // this.hidArr.map((hid, idx) => {
        //     const head = new Head({ hid });
        //     head.x = coinWidth * idx;
        //     this.headContainer.addChild(head);
        // });

        this.plate.roundRect(0, 0, innerWidth, coinWidth + gap * 2);
        this.plate.fill(0x69a5c9);
        this.plate.stroke({
            width: 2,
            color: 0x301f23,
        });
        this.renderPlaceholder();
        // const lText = new Text({
        //     text: String(this.hidArr.length),
        //     style: {
        //         fontFamily: 'Shrikhand',
        //         fill: 0x000000,
        //     },
        // });
        // lText.y = 100;
        // lText.x = 100;

        // this.headContainer.addChild(lText);
    }
    renderPlaceholder() {
        for (let i = 0; i < this.limitNum; i++) {
            const placeholder = new PlaceHolder({ number: i + 1 });

            placeholder.x = this.size * i + gap * (i + 1);
            placeholder.y = gap * 2;
            placeholder.width = this.size;
            placeholder.height = this.size;
            this.placeholderContainer.addChild(placeholder);
        }
    }
    public addHid(hid: number) {
        gameBoard.eventMode = 'none';

        let count = 0;
        let lastMatchIdx = 0;

        let alreadyHave = false;
        // check remove 3 match
        this.headContainer.children.forEach((item, idx) => {
            if (item.hid === hid) {
                lastMatchIdx = idx;
                count++;
                alreadyHave = true;
            }
        });
        if (alreadyHave) {
            if (lastMatchIdx < this.headContainer.children.length - 1) {
                this.headContainer.children.forEach((item, idx) => {
                    if (idx > lastMatchIdx) {
                        gsap.to(item, {
                            x: item.x + coinWidth,
                        });
                    }
                });
            }

            lastMatchIdx += 1;
        } else {
            lastMatchIdx = this.headContainer.children.length;
        }

        const head = new Head({ hid });
        head.x = this.size * lastMatchIdx + gap * (lastMatchIdx + 1);
        head.width = this.size;
        head.height = this.size;
        this.headContainer.addChildAt(head, lastMatchIdx);
        gsap.fromTo(
            head,
            {
                y: 999,
            },
            {
                y: gap * 2,
                onComplete: () => {
                    if (count === 2) {
                        this.removeThree(hid, lastMatchIdx);
                    } else {
                        gameBoard.eventMode = 'static';
                    }
                },
            },
        );
        // this.hidArr.push(hid);
        // this.removeThree(hid);
        // this.show();
    }
    private removeThree(hid: number, lastMatchIdx: number) {
        this.headContainer.children.forEach((item, idx) => {
            const tl = gsap.timeline({
                onComplete: () => {
                    gameBoard.eventMode = 'static';
                },
            });
            if (item.hid === hid) {
                tl.to(item, {
                    x: item.x + 2009,
                    onComplete: () => {
                        this.headContainer.removeChild(item);
                    },
                });
            }
            if (idx > lastMatchIdx) {
                tl.to(item, {
                    x: item.x - (this.size * 3 + gap * 3),
                });
            }
        });

        gold.addCoin(3);
    }
}
export const workLine = new Workline();
