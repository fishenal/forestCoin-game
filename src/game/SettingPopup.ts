import { Container, Sprite, Texture } from 'pixi.js';
import { CircleButton } from '../ui/CircleButton';
import { navigation } from '../navigation';
import StartScreen from '../screen/StartScreen';
import { gameRecord } from './GameRecord';
import { CommonPopup } from '../ui/CommonPopup';

export class SettingPopup extends CommonPopup {
    public static SCREEN_ID = 'settingPopup';
    private soundButton!: CircleButton;
    private musicButton!: CircleButton;
    private settingPop: Container;
    constructor() {
        super();
        this.settingPop = new Container();
        this.renderSettingPop();
    }
    onMaskClick = () => {
        navigation.hideOverlay();
    };
    renderSettingPop() {
        const buttonHome = new CircleButton({
            size: 40,
            icon: Sprite.from('Icon_Home'),
            onPress: () => {
                navigation.goToScreen(StartScreen);
                navigation.hideOverlay();
            },
        });
        buttonHome.x = 0;
        this.settingPop.addChild(buttonHome);
        const soundIcon = gameRecord.gameData.sound ? Sprite.from('Icon_SoundOn') : Sprite.from('Icon_SoundOff');
        this.soundButton = new CircleButton({
            size: 40,
            icon: soundIcon,
            onPress: () => {
                gameRecord.toggleSound();
                this.soundButton.icon.texture = gameRecord.gameData.sound
                    ? Texture.from('Icon_SoundOn')
                    : Texture.from('Icon_SoundOff');
            },
        });
        this.soundButton.x = 100;
        this.settingPop.addChild(this.soundButton);

        const musicIcon = gameRecord.gameData.music ? Sprite.from('Icon_MusicOn') : Sprite.from('Icon_MusicOff');
        this.musicButton = new CircleButton({
            size: 40,
            icon: musicIcon,
            onPress: () => {
                gameRecord.toggleMusic();
                this.musicButton.icon.texture = gameRecord.gameData.music
                    ? Texture.from('Icon_MusicOn')
                    : Texture.from('Icon_MusicOff');
            },
        });
        this.musicButton.x = 200;
        this.settingPop.addChild(this.musicButton);
        this.settingPop.pivot.x = this.settingPop.width * 0.5;
        this.content.addChild(this.settingPop);
    }

    resize(w: number, h: number) {
        this._width = w;
        this._height = h;
    }
}
