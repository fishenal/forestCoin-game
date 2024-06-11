import { Container, Graphics, Sprite } from 'pixi.js';
import { FancyButton } from '@pixi/ui';
import { buttonAnimation } from '../utils/buttonAnimation';
import { navigation } from '../navigation';
import { SettingPopup } from '../game/SettingPopup';

const width = 60;
const height = 60;
export class SettingIcon extends Container {
    constructor() {
        super();
        this.width = width;
        this.height = height;
    }

    public show() {
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

        const spr = Sprite.from('Icon_Settings');
        spr.anchor = 0.5;
        spr.width = width * 0.6;
        spr.height = width * 0.6;
        spr.x = width * 0.5;
        spr.y = width * 0.5;
        container.addChild(spr);

        const button = new FancyButton({
            defaultView: container,
            ...buttonAnimation,
        });
        button.onPress.connect(this.onSettingClick);
        this.addChild(button);
    }

    private onSettingClick() {
        navigation.showOverlay(SettingPopup);
    }
}
