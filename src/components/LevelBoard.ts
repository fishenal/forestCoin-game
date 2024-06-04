import { Container, Graphics, Text } from 'pixi.js';
import { designConfig } from '../utils/designConfig';
import { Stars } from './Stars';
import { FancyButton } from '@pixi/ui';
import { navigation } from '../navigation';
import GameScreen from '../screen/GameScreen';

const innerWidth = designConfig.sixContent.width;

export class Level extends Container {
    private levelNum: number;
    private lightenNum: number;
    private gap: number;
    constructor(levelNum: number, lightenNum: number) {
        super();
        const width = innerWidth / 3;
        this.levelNum = levelNum;
        this.lightenNum = lightenNum;
        this.gap = 30;
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = 200;
    }
    getButtonView(color: number) {
        const container = new Container();
        const stars = new Stars(this.lightenNum);
        stars.show();
        stars.x = 16;
        stars.y = 8;
        const fullWidth = innerWidth / 3;
        const width = fullWidth - 2 * this.gap;
        const height = width;
        const radius = 15;
        const darkColor = 0x301f23;
        const button = new Graphics().roundRect(0, 0, width, height, radius).fill(color).stroke({
            width: 4,
            color: darkColor,
        });
        container.addChild(button);
        container.addChild(stars);
        return container;
    }
    show() {
        const color = 0xc97d70;
        const hoverColor = 0xdcaa4f;
        const darkColor = 0x301f23;

        const button = new FancyButton({
            defaultView: this.getButtonView(color),
            hoverView: this.getButtonView(hoverColor),
            pressedView: this.getButtonView(color),
            text: new Text({
                text: String(this.levelNum + 1),
                style: {
                    fontFamily: 'CherrySwashB',
                    fill: darkColor,
                    fontSize: 60,
                },
            }),
            padding: 15,
            offset: {
                default: { y: 0 },
                // hover: { y: 5 },
            },
            textOffset: {
                x: 0,
                y: 0,
            },

            animations: {
                hover: {
                    props: {
                        scale: { x: 1.03, y: 1.03 },
                        y: -1,
                    },
                    duration: 100,
                },
                pressed: {
                    props: {
                        scale: { x: 0.95, y: 0.95 },
                        y: 5,
                    },
                    duration: 100,
                },
            },
        });
        button.x = this.gap;
        button.y = this.gap;
        button.onPress.connect(this.handleOnPress);
        this.addChild(button);
        // const width = innerWidth / 3;
        // const gap = 30;
        // const board = new Graphics();
        // board.x = gap;
        // board.y = gap;
        // board.roundRect(0, 0, width - 2 * gap, width - 2 * gap);
        // board.fill(0xc97d70);
        // board.stroke({
        //     width: 4,
        //     color: 0x301f23,
        // });
        // this.addChild(board);

        // const text = new Text({
        //     text: String(this.levelNum + 1),
        //     style: {
        //         fontFamily: 'CherrySwashB',
        //         fill: 0x301f23,
        //         fontSize: 60,
        //     },
        // });
        // text.anchor = 0.5;
        // text.x = width / 2;
        // text.y = width / 2;
        // this.addChild(text);
    }
    handleOnPress() {
        navigation.goToScreen(GameScreen);
    }
}

export class LevelBoard extends Container {
    constructor() {
        super();
        this.x = 0;
        this.y = 100;
        this.width = innerWidth;
        this.height = 400;
    }
    show() {
        const board = new Graphics();
        board.roundRect(0, 0, innerWidth, 600);
        board.fill(0xd6ad98);
        board.stroke({
            width: 4,
            color: 0x301f23,
        });
        this.addChild(board);

        for (let i = 0; i < 5; i++) {
            const level = new Level(i, 1);
            level.y = Math.floor(i / 3) * 150;
            level.x = (i % 3) * 190;
            this.addChild(level);
            level.show();
        }
    }
    resize(w: number, h: number) {
        // this.width = w;
        // this.height = h;
        // this.x = w * 0.5 - this.width * 0.5;
    }
}
export const levelBoard = new LevelBoard();
