import { FancyButton } from '@pixi/ui';
import { Container, Graphics, Sprite } from 'pixi.js';
import { buttonAnimation } from '../utils/buttonAnimation';

export class CircleButton extends Container {
    constructor({ size, icon, onPress }: { size: number; icon: Sprite; onPress: () => void }) {
        super();
        const container = new Container();
        container.cursor = 'pointer';
        const bg = new Graphics();
        bg.circle(0, 0, size);
        bg.fill(0xd9d9d9);
        bg.alpha = 0.6;
        bg.x = size * 0.5;
        bg.y = size * 0.5;
        container.addChild(bg);

        const spr = icon;
        spr.anchor = 0.5;
        spr.width = size * 0.6;
        spr.height = size * 0.6;
        spr.x = size * 0.5;
        spr.y = size * 0.5;
        container.addChild(spr);

        const button = new FancyButton({
            defaultView: container,
            ...buttonAnimation,
        });
        button.onPress.connect(onPress);
        this.addChild(button);
    }
}
