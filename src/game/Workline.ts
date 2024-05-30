import { Container, Graphics } from 'pixi.js';
import { Head } from '../components/Head';
import { gold } from './Gold';
import gsap from 'gsap';

export class Workline extends Container {
    private hidArr: number[] = [];
    private headContainer: Container<Head>;
    private plate: Graphics;
    public onThreeRemove: () => void = () => {};
    constructor() {
        super();
        const width = 60 * 7;
        const height = 60;
        this.width = width;
        this.height = height;
        this.y = 60 * 9 + 20;
        this.x = 0;
        this.headContainer = new Container<Head>();
        this.headContainer.x = 5;
        this.headContainer.y = 5;
        this.plate = new Graphics();
        this.plate.roundRect(-5, 0, width + 5, height);
        this.plate.fill(0x000);
        // this.plate.alpha = 0.5;

        this.addChild(this.plate);
        this.addChild(this.headContainer);
    }
    public show() {
        this.headContainer.removeChildren();
        this.hidArr.map((hid, idx) => {
            const head = new Head({ hid });
            head.x = 60 * idx;
            this.headContainer.addChild(head);
        });
        if (this.hidArr.length >= 7) {
            window.alert('loss');
        }
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
    public addHid(hid: number) {
        const head = new Head({ hid });
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
                            x: item.x + 60,
                        });
                    }
                });
            }

            lastMatchIdx += 1;
        } else {
            lastMatchIdx = this.headContainer.children.length;
        }

        head.x = lastMatchIdx * 60;
        this.headContainer.addChildAt(head, lastMatchIdx);
        gsap.fromTo(
            head,
            {
                y: 999,
            },
            {
                y: 0,
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
            if (item.hid === hid) {
                gsap.to(item, {
                    x: item.x + 2009,
                    onComplete: () => {
                        this.headContainer.removeChild(item);
                    },
                });
            }
            if (idx > lastMatchIdx) {
                console.log('🚀 ~ Workline ~ this.headContainer.children.forEach ~ item:', item.x);
                gsap.to(item, {
                    x: item.x - 60 * 3,
                });
            }
        });

        gold.addCoin(3);
    }
}
export const workLine = new Workline();
