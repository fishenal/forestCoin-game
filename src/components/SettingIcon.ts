import { Container, Sprite } from 'pixi.js';
import { navigation } from '../navigation';
import { SettingPopup } from '../game/SettingPopup';
import { CircleButton } from '../ui/CircleButton';

const width = 60;
const height = 60;
export class SettingIcon extends Container {
    constructor() {
        super();
        this.width = width;
        this.height = height;
        const button = new CircleButton({
            size: 30,
            onPress: this.onSettingClick,
            icon: Sprite.from('Icon_Settings'),
        });
        this.addChild(button);
    }

    private onSettingClick() {
        navigation.showOverlay(SettingPopup);
    }
}
