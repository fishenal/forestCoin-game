import { Container, Graphics, Sprite, Text } from 'pixi.js';
import { designConfig } from '../utils/designConfig';
import { gameBoard } from './GameBoard';
import { FancyButton } from '@pixi/ui';
import { buttonAnimation } from '../utils/buttonAnimation';
import { workLine } from './Workline';

const innerWidth = designConfig.sixContent.width;
const coinWidth = designConfig.sixContent.coinWidth;
const gap = designConfig.sixContent.gap;
const height = gameBoard.row * coinWidth + (gameBoard.row + 1) * gap;
const width = coinWidth;
interface ToolBarItem {
    name: string;
    spriteName: string;
    count: number;
    action: () => void;
}
export class Toolbarline extends Container {
    // private plate: Graphics;
    private toolArr: ToolBarItem[];
    // public debounceAdd: () => void;
    constructor() {
        super();
        this.width = width;
        this.height = height;
        this.y = 0;
        this.x = innerWidth + gap;
        this.toolArr = [
            {
                name: 'magic_click',
                spriteName: 'Icon_Magic',
                count: 1,
                action: this.onMagicClick,
            },
            {
                name: 'return_back',
                spriteName: 'Icon_Return',
                count: 1,
                action: this.onReturnBack,
            },
            {
                name: 'shuffle',
                spriteName: 'Icon_Helix',
                count: 1,
                action: this.onShuffle,
            },
        ];
        // this.plate = new Graphics();
        // this.addChild(this.plate);
    }

    public show() {
        // this.plate.roundRect(0, 0, width, height);
        // this.plate.fill(0xd6ad98);
        // this.plate.stroke({
        //     width: 2,
        //     color: 0x301f23,
        // });
        this.toolArr.forEach((item, idx) => {
            const container = this.renderToolItem(item);
            container.y = idx * width * 1.2 + 10;
            container.x = 10;
            this.addChild(container);
        });
    }
    private renderToolItem(item: ToolBarItem) {
        const container = new Container();
        container.x = 15;
        container.cursor = 'pointer';
        const bg = new Graphics();
        bg.circle(0, 0, 40);
        bg.fill(0xd9d9d9);
        bg.alpha = 0.6;
        bg.x = width * 0.5;
        bg.y = width * 0.5;
        container.addChild(bg);

        const spr = Sprite.from(item.spriteName);
        spr.anchor = 0.5;
        spr.width = width * 0.6;
        spr.height = width * 0.6;
        spr.x = width * 0.5;
        spr.y = width * 0.5;
        container.addChild(spr);

        const numBg = new Graphics();
        numBg.circle(0, 0, 15);
        numBg.fill(0x301f23);
        numBg.x = width * 0.8;
        numBg.y = width * 0.8;
        const text = new Text({
            text: item.count,
            style: {
                fontFamily: 'CherrySwashB',
                fill: 0xffffff,
            },
        });
        text.x = width * 0.8;
        text.y = width * 0.8;
        text.anchor = 0.5;
        container.addChild(numBg);
        container.addChild(text);

        const button = new FancyButton({
            defaultView: container,
            ...buttonAnimation,
        });
        button.onPress.connect(item.action);
        // container.eventMode = 'static';
        // container.cursor = 'pointer';
        // container.on('pointerdown', item.action);
        return button;
    }
    private onMagicClick() {
        gameBoard.clearBlocks();
    }
    private onReturnBack() {
        workLine.returnMode = true;
    }
    private onShuffle() {
        gameBoard.shuffle();
    }
}
export const toolbarline = new Toolbarline();
