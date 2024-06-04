import { Container, Graphics } from 'pixi.js';
import { Head } from '../components/Head';
import { gold } from './Gold';
import gsap from 'gsap';
import { gameBoard } from './GameBoard';
import { designConfig } from '../utils/designConfig';
import { PlaceHolder } from '../components/PlaceHolder';
import { debounce_leading } from '../utils/debounce';

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
    private tl: gsap.core.Timeline;
    public onThreeRemove: () => void = () => {};
    // public debounceAdd: () => void;
    constructor() {
        super();
        this.limitNum = 7; //7 or 5
        this.tl = gsap.timeline({
            onComplete: () => {
                console.log('on tl complete');
                const next = this.hidArr.shift();

                if (next) {
                    this.addHid(next);
                    console.log('🚀 ~ Workline ~ constructor ~ next:', next);
                }

                // gameBoard.eventMode = 'static';
            },
        });
        this.size = (innerWidth - gap * (this.limitNum + 1)) / this.limitNum;
        // const width = 60 * 7;
        // const height = 60;
        this.width = innerWidth;
        this.height = coinWidth + gap * 2;
        this.y = gameBoard.row * coinWidth + (gameBoard.row + 1) * gap + 110;
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

        // this.debounceAdd = debounce_leading(this.addHid, 3000, this);
        // if (this.hidArr.length === 0) {
        //     this.addHid(hid);
        //     this.hidArr.shift();
        // } else {
        //     this.hidArr.push(hid);
        // }

        // console.log('🚀 ~ Workline ~ pushHid ~ this.hidArr:', this.hidArr);
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
    public pushHid(hid: number) {
        if (this.hidArr.length === 0) {
            this.addHid(hid);
            this.hidArr.shift();
        } else {
            this.hidArr.push(hid);
        }

        console.log('🚀 ~ Workline ~ pushHid ~ this.hidArr:', this.hidArr);
    }

    public addHid(hid: number) {
        // gameBoard.eventMode = 'none';

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
                        // 后面的移动开的动画
                        this.tl.to(item, {
                            x: this.size * (idx + 1) + gap * (idx + 2),
                            duration: 0.1,
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
        // 新的从下划上来的动画
        this.tl.fromTo(
            head,
            {
                y: 999,
            },
            {
                y: gap * 2,
                onComplete: () => {
                    if (count === 2) {
                        this.removeThree(hid, lastMatchIdx);
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
            // const tl = gsap.timeline({
            //     onComplete: () => {
            //         // gameBoard.eventMode = 'static';
            //     },
            // });
            if (item.hid === hid) {
                this.tl.to(item, {
                    x: item.x + 2009,
                    duration: 0.2,
                    onComplete: () => {
                        this.headContainer.removeChild(item);
                    },
                });
            }
            if (idx > lastMatchIdx) {
                this.tl.to(item, {
                    x: item.x - (this.size * 3 + gap * 3),
                    duration: 0.1,
                });
            }
        });

        gold.addCoin(3);
    }
}
export const workLine = new Workline();
