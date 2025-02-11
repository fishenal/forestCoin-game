import { Container, Graphics, Sprite, Text } from 'pixi.js';
import { gameBoard } from './GameBoard';
import { FancyButton } from '@pixi/ui';
import { buttonAnimation } from '../utils/buttonAnimation';
import { workLine } from './Workline';
import { setup } from './Setup';
import { emitter } from '../store/emitter';

interface ToolBarItem {
    name: string;
    spriteName: string;
    count: number;
    action: () => void;
}
export class Toolbarline extends Container {
    private toolArr!: ToolBarItem[];
    public used: boolean;
    private countTextArr!: Text[];
    private disableCover!: Graphics;
    constructor() {
        super();
        this.used = false;
    }
    private init() {
        this.used = false;
        const { innerWidth, gap } = setup.getConfigData();
        this.width = 60;
        this.y = 0;
        this.x = innerWidth + gap;
        this.toolArr = [
            {
                name: 'magic_click',
                spriteName: 'Icon_Magic',
                count: 1,
                action: () => {
                    this.onMagicClick();
                },
            },
            {
                name: 'return_back',
                spriteName: 'Icon_Return',
                count: 1,
                action: () => {
                    this.onReturnBack();
                },
            },
            {
                name: 'shuffle',
                spriteName: 'Icon_Helix',
                count: 1,
                action: () => {
                    this.onShuffle();
                },
            },
        ];
        this.countTextArr = [];
        this.disableCover = new Graphics();
        this.disableCover.circle(0, 0, 30);
        this.disableCover.fill(0x000000);
        this.disableCover.alpha = 0.6;
        this.disableCover.x = 60 * 0.5;
        this.disableCover.y = 60 * 0.5;

        emitter.on('workLineCheck', (len: number) => {
            this.handleWorklineChange(len);
        });
    }
    handleWorklineChange(length: number) {
        if (length > 0) {
            this.setToolDisable('return_back', true);
        } else {
            this.setToolDisable('return_back', false);
        }
    }

    private setToolDisable(toolName: string, status: boolean) {
        let index: number | undefined;
        this.toolArr.forEach((item, idx) => {
            if (toolName === item.name) {
                index = idx;
            }
        });
        if (index) {
            const tool: FancyButton = this.getChildAt(index);
            if (status) {
                tool.defaultView?.removeChild(this.disableCover);
                tool.eventMode = 'static';
            } else {
                tool.defaultView?.addChild(this.disableCover);
                tool.eventMode = 'none';
            }
        }
    }
    public show() {
        this.removeChildren();
        this.init();
        this.toolArr.forEach((item, idx) => {
            const container = this.renderToolItem(item);
            container.y = idx * 70 + 60;
            container.x = 10;
            if (item.name === 'return_back') {
                container?.defaultView?.addChild(this.disableCover);
            }
            this.addChild(container);
        });
    }
    private renderToolItem(item: ToolBarItem) {
        const container = new Container();
        container.x = 15;
        // container.cursor = 'pointer';
        const bg = new Graphics();
        bg.circle(0, 0, 30);
        bg.fill(0xd9d9d9);
        bg.alpha = 0.6;
        bg.x = 60 * 0.5;
        bg.y = 60 * 0.5;
        container.addChild(bg);

        const spr = Sprite.from(item.spriteName);
        spr.anchor = 0.5;
        spr.width = 60 * 0.6;
        spr.height = 60 * 0.6;
        spr.x = 60 * 0.5;
        spr.y = 60 * 0.5;
        container.addChild(spr);

        const numBg = new Graphics();
        numBg.circle(0, 0, 12);
        numBg.fill(0x301f23);
        numBg.x = 60 * 0.8;
        numBg.y = 60 * 0.8;
        const text = new Text({
            text: item.count,
            style: {
                fontFamily: 'CherrySwashB',
                fill: 0xffffff,
                fontSize: 16,
            },
        });
        text.x = 60 * 0.8;
        text.y = 60 * 0.8;
        text.anchor = 0.5;
        this.countTextArr.push(text);
        container.addChild(numBg);
        container.addChild(text);

        // container.addChild(disableCover);

        const button = new FancyButton({
            defaultView: container,
            ...buttonAnimation,
        });

        button.eventMode = item.name === 'return_back' ? 'none' : 'static';
        button.onPress.connect(item.action);
        return button;
    }
    private onMagicClick() {
        this.used = true;
        const magicTool = this.toolArr.find((item) => item.name === 'magic_click');

        if (magicTool && magicTool.count > 0) {
            magicTool.count -= 1;
            this.countTextArr[0].text = magicTool.count;
            gameBoard.clearBlocks();
        }
    }
    private onReturnBack() {
        this.used = true;
        const returnTool = this.toolArr.find((item) => item.name === 'return_back');

        if (returnTool && returnTool.count > 0) {
            returnTool.count -= 1;
            this.countTextArr[1].text = returnTool.count;
            workLine.setReturnMode(true);
        }
    }
    private onShuffle() {
        this.used = true;
        const shuffleTool = this.toolArr.find((item) => item.name === 'shuffle');

        if (shuffleTool && shuffleTool.count > 0) {
            shuffleTool.count -= 1;
            this.countTextArr[2].text = shuffleTool.count;
            gameBoard.shuffle();
        }
    }
}
export const toolbarline = new Toolbarline();
