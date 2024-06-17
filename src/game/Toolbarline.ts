import { Container, Graphics, Sprite, Text } from 'pixi.js';
import { gameBoard } from './GameBoard';
import { FancyButton } from '@pixi/ui';
import { buttonAnimation } from '../utils/buttonAnimation';
import { workLine } from './Workline';
import { setup } from './Setup';
import { emitter } from '../store/emitter';
import { navigation } from '../navigation';
import { IndicatorCover } from '../screen/IndicatorCover';
import { gameRecord } from './GameRecord';

interface ToolBarItem {
    name: string;
    desc: string;
    spriteName: string;
    count: number;
    action: () => void;
}
export class Toolbarline extends Container {
    public toolArr!: ToolBarItem[];
    public used: boolean;
    private countTextArr!: Text[];
    private toolContainer: Container;
    private disableCover!: Graphics;
    constructor() {
        super();
        this.used = false;
        this.toolContainer = new Container();
        this.addChild(this.toolContainer);
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
                desc: 'Remove all barriers, Recover after 1 pick',
                spriteName: 'Icon_Magic',
                count: 1,
                action: () => {
                    this.onMagicClick();
                },
            },
            {
                name: 'return_back',
                desc: 'Return 1 coin back to Board',
                spriteName: 'Icon_Return',
                count: 1,
                action: () => {
                    this.onReturnBack();
                },
            },
            {
                name: 'shuffle',
                desc: 'Shuffle Coins on Board',
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
        emitter.on('workLineCheck', () => {
            this.renderTools();
        });
    }

    public show() {
        // this.removeChildren();
        this.init();
        this.renderTools();
        this.renderQuestion();
    }
    private renderQuestion() {
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

        const spr = Sprite.from('Icon_Question');
        spr.anchor = 0.5;
        spr.width = 60 * 0.6;
        spr.height = 60 * 0.6;
        spr.x = 60 * 0.5;
        spr.y = 60 * 0.5;
        container.addChild(spr);

        const button = new FancyButton({
            defaultView: container,
            ...buttonAnimation,
        });

        button.eventMode = 'static';
        button.onPress.connect(() => {
            navigation.showOverlay(IndicatorCover, {
                showTool: true,
            });
        });
        button.y = 3 * 70 + 60;
        button.x = 10;
        this.addChild(button);
    }
    private renderTools() {
        this.toolContainer.removeChildren();
        this.toolArr.forEach((item, idx) => {
            this.renderToolItem(item, idx);
        });
    }
    private renderToolItem(item: ToolBarItem, idx: number) {
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

        if (item.count === 0) {
            const adIcon = Sprite.from('Icon_Tube');
            adIcon.width = 20;
            adIcon.height = 20;
            adIcon.x = 60 * 0.8;
            adIcon.y = 60 * 0.8;
            adIcon.anchor = 0.5;
            container.addChild(adIcon);
        } else {
            container.addChild(text);
        }

        const button = new FancyButton({
            defaultView: container,
            ...buttonAnimation,
        });
        button.y = idx * 70 + 60;
        button.x = 10;
        if (workLine.headContainer.children.length === 0 && item.name === 'return_back') {
            button?.defaultView?.addChild(this.disableCover);
            button.eventMode = 'none';
        } else {
            button?.defaultView?.removeChild(this.disableCover);
            button.eventMode = 'static';
        }
        button.onPress.connect(item.action);
        this.toolContainer.addChild(button);
    }

    private tryAd(rewardBack: () => void, errorBack: () => void) {
        try {
            gameRecord.pauseAll();
            const callbacks = {
                adFinished: () => {
                    gameRecord.resetAll();
                    rewardBack && rewardBack();
                },
                adError: (error: unknown) => {
                    gameRecord.resetAll();
                    console.log('Error rewarded ad', error);
                    errorBack && errorBack();
                },
            };
            window.CrazyGames.SDK.ad.requestAd('rewarded', callbacks);
        } catch (error) {
            gameRecord.resetAll();
            console.log('Error rewarded ad', error);
            errorBack && errorBack();
        }
    }

    private onMagicClick() {
        this.used = true;
        const magicTool = this.toolArr.find((item) => item.name === 'magic_click');
        if (magicTool) {
            if (magicTool.count === 0) {
                this.tryAd(
                    () => {
                        gameBoard.clearBlocks();
                    },
                    () => {},
                );
            } else if (magicTool.count > 0) {
                magicTool.count -= 1;
                this.renderTools();

                gameBoard.clearBlocks();
            }
        }
    }

    private onReturnBack() {
        this.used = true;
        const returnTool = this.toolArr.find((item) => item.name === 'return_back');

        if (returnTool) {
            if (returnTool.count === 0) {
                this.tryAd(
                    () => {
                        workLine.setReturnMode(true);
                    },
                    () => {},
                );
            } else if (returnTool.count > 0) {
                returnTool.count -= 1;
                this.renderTools();
                workLine.setReturnMode(true);
            }
        }
    }
    private onShuffle() {
        this.used = true;
        const shuffleTool = this.toolArr.find((item) => item.name === 'shuffle');

        if (shuffleTool) {
            if (shuffleTool.count === 0) {
                this.tryAd(
                    () => {
                        gameBoard.shuffle();
                    },
                    () => {},
                );
            } else if (shuffleTool.count > 0) {
                shuffleTool.count -= 1;
                this.renderTools();
                gameBoard.shuffle();
            }
        }
    }
}
export const toolbarline = new Toolbarline();
