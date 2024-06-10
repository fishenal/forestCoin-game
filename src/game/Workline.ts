import { Container, Graphics } from 'pixi.js';
import { Head } from '../components/Head';
import gsap from 'gsap';
import { gameBoard } from './GameBoard';
import { PlaceHolder } from '../components/PlaceHolder';
import { sfx } from '../utils/audio';
import { setup } from './Setup';
import { FailPopup } from './FailPopup';
import { navigation } from '../navigation';
import { gameStatus } from './GameStatus';

export class Workline extends Container {
    private limitNum!: number;
    private size!: number;
    private headContainer!: Container<Head>;
    private placeholderContainer!: Container<PlaceHolder>;
    private plate!: Graphics;
    private returnMode!: boolean;

    private innerWidth!: number;
    private gap!: number;
    public onThreeRemove: () => void = () => {};
    constructor() {
        super();
    }

    private init() {
        const { innerWidth, coinWidth, gap, row } = setup.getConfigData();
        this.innerWidth = innerWidth;
        this.gap = gap;

        this.limitNum = 7; //7 or 5
        this.returnMode = false;
        this.size = (this.innerWidth - gap * (this.limitNum + 1)) / this.limitNum;
        this.width = this.innerWidth;
        this.height = this.size + gap * 2;
        this.y = row * coinWidth + (row + 1) * gap + 80;
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
        this.init();
        this.plate.roundRect(0, 0, this.innerWidth, this.size + this.gap * 2);
        this.plate.fill(0x69a5c9);
        this.plate.stroke({
            width: 2,
            color: 0x301f23,
        });

        this.renderPlaceholder();
    }

    public setReturnMode(val: boolean) {
        this.returnMode = val;
        if (this.returnMode) {
            this.headContainer.children.forEach((head) => {
                head.eventMode = 'static';
                gsap.fromTo(
                    head,
                    {
                        x: '-=2',
                        rotation: '-0.1',
                        yoyo: true,
                        yoyoEase: 'power2',
                        repeat: -1,
                        duration: 0.1,
                    },
                    {
                        x: '+=4',
                        rotation: '0.1',
                        yoyo: true,
                        yoyoEase: 'power2',
                        repeat: -1,
                        duration: 0.1,
                    },
                );
            });
        }
    }
    renderPlaceholder() {
        for (let i = 0; i < this.limitNum; i++) {
            const placeholder = new PlaceHolder({ number: i + 1, size: this.size });
            placeholder.x = this.size * i + this.gap * (i + 1);
            placeholder.y = this.gap;
            this.placeholderContainer.addChild(placeholder);
        }
    }
    handleHeadClick(head: Head) {
        if (this.returnMode) {
            gameBoard.returnToGameboard(head.hid);
            gsap.to(head, {
                alpha: 0,
                duration: 0.2,
                onComplete: () => {
                    this.removeOneHead(head);
                    this.returnMode = false;
                },
            });
        }
    }
    private renderHeadAtPostion(hid: number, xx: number) {
        // console.log(`insert new head ${hid} at ${xx}`);
        const head = new Head({ hid, xx, width: this.size, height: this.size });
        head.eventMode = 'none';
        head.x = this.size * xx + this.gap * (xx + 1) + this.size / 2;
        head.y = this.gap + this.size / 2;
        // head.alpha = 0;
        // head.rotation = 12;
        head.on('pointerdown', () => {
            this.handleHeadClick(head);
        });
        this.headContainer.addChildAt(head, xx);
        gsap.from(head, {
            rotation: 4,
        });
    }
    private removeOneHead(head: Head) {
        let afterRemove = false;
        // sfx.play('audio/remove.mp3');
        this.headContainer.children.forEach((item) => {
            gsap.killTweensOf(item);
            item.eventMode = 'none';
            if (item.hid === head.hid && item.xx === head.xx) {
                gsap.to(item, {
                    alpha: 0,
                    duration: 0.2,
                    onComplete: () => {
                        this.headContainer.removeChild(item);
                    },
                });
                afterRemove = true;
            }
            if (afterRemove) {
                gsap.to(item, {
                    x: `-=${this.size + this.gap}`,
                    ease: 'bounce.out',
                    duration: 0.4,
                    onComplete: () => {
                        item.xx -= 1;
                    },
                });
            }
        });
    }
    private removeHead(hid: number, removeNumber: number) {
        let afterRemove = false;
        sfx.play('audio/remove.mp3');
        // const _children = [...this.headContainer.children];
        this.headContainer.children.forEach((item) => {
            if (item.hid === hid) {
                gsap.to(item, {
                    alpha: 0,
                    duration: 0.2,
                    onComplete: () => {
                        this.headContainer.removeChild(item);
                    },
                });
                afterRemove = true;
            }
            if (afterRemove && item.hid !== hid) {
                // item.x = item.x - (this.size * 3 + this.gap * 3);
                gsap.to(item, {
                    x: item.x - (this.size * removeNumber + this.gap * removeNumber),
                    ease: 'bounce.out',

                    duration: 0.4,
                    onComplete: () => {
                        item.xx -= removeNumber;
                    },
                });
            }
        });
    }
    public async addHid(hid: number) {
        let count = 0;

        let alreadyHave = false;
        let xxPosition = this.headContainer.children.length;
        // check remove 3 match
        this.headContainer.children.forEach((item, idx) => {
            if (item.hid === hid) {
                xxPosition = idx + 1;
                count++;
                alreadyHave = true;
            }
            if (alreadyHave && item.hid !== hid) {
                item.x = this.size * (idx + 1) + this.gap * (idx + 2) + this.size / 2;
                item.xx = idx + 1;
                //console.log(`move item ${item.hid} to x ${item.x}, after item.xx is ${item.xx}`);
            }
        });
        this.renderHeadAtPostion(hid, xxPosition);

        // console.log(`after move count is ${count}`);

        if (count === 2) {
            this.removeHead(hid, 3);
        }
        if (this.headContainer.children.length >= this.limitNum) {
            gameStatus.setStatus('end');
            navigation.showOverlay(FailPopup);
        }
    }
}
export const workLine = new Workline();
