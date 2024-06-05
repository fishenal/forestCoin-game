import { Container, Graphics } from 'pixi.js';
import { Head } from '../components/Head';
import gsap from 'gsap';
import { gameBoard } from './GameBoard';
import { designConfig } from '../utils/designConfig';
import { PlaceHolder } from '../components/PlaceHolder';

const innerWidth = designConfig.sixContent.width;
const coinWidth = designConfig.sixContent.coinWidth;
const gap = designConfig.sixContent.gap;
export class Workline extends Container {
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
        this.addChild(this.plate);
        this.addChild(this.headContainer);
        this.addChild(this.placeholderContainer);
    }
    public show() {
        this.plate.roundRect(0, 0, innerWidth, coinWidth + gap * 2);
        this.plate.fill(0x69a5c9);
        this.plate.stroke({
            width: 2,
            color: 0x301f23,
        });
        this.renderPlaceholder();
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

    public async addHid(hid: number) {
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
                        item.x = this.size * (idx + 1) + gap * (idx + 2) + this.size / 2;
                    }
                });
            }

            lastMatchIdx += 1;
        } else {
            lastMatchIdx = this.headContainer.children.length;
        }

        const head = new Head({ hid });
        head.width = this.size;
        head.height = this.size;
        head.x = this.size * lastMatchIdx + gap * (lastMatchIdx + 1) + this.size / 2;
        head.y = gap * 2 + this.size / 2;
        head.anchor = 0.5;
        head.alpha = 0;
        head.rotation = 12;
        this.headContainer.addChildAt(head, lastMatchIdx);
        gsap.to(head, {
            rotation: 1,
            alpha: 1,
            duration: 0.4,
            onComplete: () => {
                if (count === 2) {
                    const _children = [...this.headContainer.children];
                    _children.forEach((item, idx) => {
                        if (item.hid === hid) {
                            gsap.to(item, {
                                alpha: 0,
                                duration: 0.2,
                                onComplete: () => {
                                    this.headContainer.removeChild(item);
                                },
                            });
                        }
                        if (idx > lastMatchIdx) {
                            // item.x = item.x - (this.size * 3 + gap * 3);
                            gsap.to(item, {
                                x: item.x - (this.size * 3 + gap * 3),
                                ease: 'power2.inOut',
                                delay: 0.2,
                                duration: 0.2,
                            });
                        }
                    });
                }
            },
        });
    }
}
export const workLine = new Workline();
