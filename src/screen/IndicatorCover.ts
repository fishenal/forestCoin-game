import { Container, Graphics, Sprite, Text } from 'pixi.js';
import { designConfig } from '../utils/designConfig';
import { toolbarline } from '../game/Toolbarline';

const learnedLskey = 'learnedIndicator';

const innerWidth = designConfig.content.innerWidth;
export class IndicatorCover extends Container {
    public static SCREEN_ID = 'indicatorCover';
    private cover: Graphics;
    private step1: Container;
    private step2: Container;
    private step3: Container;
    private currentStep: number = 1;
    private showTool: boolean = false;
    constructor() {
        super();
        this.cover = new Graphics().rect(0, 0, window.innerWidth, window.innerHeight).fill(0x000000);
        this.cover.alpha = 0.1;
        this.visible = false;
        this.addChild(this.cover);
        this.step1 = new Container();
        this.step2 = new Container();
        this.step3 = new Container();
        this.step1.visible = false;
        this.step2.visible = false;
        this.step3.visible = false;

        this.renderStep1();
        this.renderStep2();
        this.renderStep3();

        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.on('pointerdown', () => {
            if (this.showTool) {
                this.hide();
                return;
            }
            if (this.currentStep < 3) {
                this.currentStep += 1;
                this.step1.visible = false;
                this.step2.visible = false;
                this.step3.visible = false;
                if (this.currentStep === 2) {
                    this.step2.visible = true;
                }
                if (this.currentStep === 3) {
                    this.showToolPop();
                }
            } else {
                this.hide();
            }
        });
    }
    public prepare(data: { showTool: boolean }) {
        this.showTool = data.showTool;
    }
    renderStep1() {
        const rect1 = new Graphics().roundRect(-3, 350, innerWidth, 280).stroke({
            width: 6,
            color: 0x56c0ff,
        });
        rect1.x = window.innerWidth * 0.5 - innerWidth * 0.5;

        const indicator = Sprite.from('indicator');
        indicator.width = 100;
        indicator.height = 100;
        indicator.x = window.innerWidth * 0.5 - innerWidth * 0.5;
        indicator.y = 350;
        const info = new Text({
            text: `Click Coins on Board, 
            Move them to bottom Package`,
            style: {
                fill: 0x56c0ff,
                fontFamily: 'CherrySwashB',
                fontSize: 30,
                stroke: {
                    width: 3,
                    color: 0x301f23,
                },
            },
        });
        info.x = 300;
        info.y = 450;

        const arrow = Sprite.from('Icon_ArrowDown');
        arrow.width = 60;
        arrow.height = 60;
        arrow.x = window.innerWidth * 0.5 - innerWidth * 0.5 + 250;
        arrow.y = 550;

        this.step1.addChild(indicator);
        this.step1.addChild(info);

        this.step1.addChild(rect1);
        this.step1.addChild(arrow);
        this.addChild(this.step1);
    }

    renderStep2() {
        const rect1 = new Graphics().roundRect(-3, 650, innerWidth, 100).stroke({
            width: 6,
            color: 0x56c0ff,
        });
        rect1.x = window.innerWidth * 0.5 - innerWidth * 0.5;

        const info = new Text({
            text: `3 same Coin will be elimated, Never exceed 7!`,
            style: {
                fill: 0x56c0ff,
                fontFamily: 'CherrySwashB',
                fontSize: 30,
                stroke: {
                    width: 3,
                    color: 0x301f23,
                },
            },
        });
        info.x = 300;
        info.y = 760;

        this.step2.addChild(info);
        this.step2.addChild(rect1);
        this.addChild(this.step2);
    }

    renderStep3() {
        const container = new Container();
        container.y = 60;
        container.x = window.innerWidth * 0.5 - innerWidth * 0.5;

        const rect1 = new Graphics().roundRect(0, 60, innerWidth, 600).fill(0xfdf7f0).stroke({
            width: 6,
            color: 0x56c0ff,
        });
        container.addChild(rect1);

        const title = new Text({
            text: 'Use Tools to Power-up',
            style: {
                fill: 0x56c0ff,
                fontFamily: 'CherrySwashB',
                fontSize: 30,
                stroke: {
                    width: 3,
                    color: 0x301f23,
                },
            },
        });
        title.x = 120;
        title.y = 80;
        container.addChild(title);

        toolbarline.toolArr.forEach((item, idx) => {
            const toolLine = new Container();
            toolLine.y = idx * 70 + 120;
            toolLine.x = 10;

            const desc = new Text({
                text: item.desc,
                style: {
                    fill: 0x56c0ff,
                    fontFamily: 'CherrySwashR',
                    fontSize: 26,
                    stroke: {
                        width: 2,
                        color: 0x301f23,
                    },
                },
            });
            desc.x = 70;
            desc.y = 18;
            toolLine.addChild(desc);

            const spr = Sprite.from(item.spriteName);
            spr.anchor = 0.5;
            spr.width = 60 * 0.6;
            spr.height = 60 * 0.6;
            spr.x = 60 * 0.5;
            spr.y = 60 * 0.5;
            toolLine.addChild(spr);
            container.addChild(toolLine);
        });

        this.step3.addChild(container);
        this.addChild(this.step3);
    }
    public showToolPop() {
        this.visible = true;
        this.step3.visible = true;
    }
    public async show() {
        if (this.showTool) {
            this.showToolPop();
            return;
        }
        const learned = window.localStorage.getItem(learnedLskey);
        if (!learned) {
            this.visible = true;
            this.step1.visible = true;
        }
    }
    public async hide() {
        window.localStorage.setItem(learnedLskey, 'learned');
        this.visible = false;
    }
}
