import { Container, Sprite, Text } from 'pixi.js';

export class Tool extends Container {
    public tools: {
        name: string;
        icon?: Sprite;
        action: () => void;
    }[];
    constructor() {
        super();
        this.y = -50;
        this.x = 300;
        this.tools = [
            {
                name: 'Hack',
                // icon: Sprite.from('claw'),
                action: this.onHackUse,
            },
            {
                name: 'Extand',
                // icon: Sprite.from('claw'),
                action: this.onExtandUse,
            },
            // {
            //     name: 'Royal',
            //     // icon: Sprite.from('claw'),
            //     action: this.onRoyalUse,
            // },
            {
                name: 'Random',
                // icon: Sprite.from('claw'),
                action: this.onRandomUse,
            },
            {
                name: 'Back',
                // icon: Sprite.from('claw'),
                action: this.onBackUse,
            },
        ];
    }
    show() {
        this.tools.forEach((item, idx) => {
            const text = new Text({
                text: item.name,
                style: {
                    fontFamily: 'Shrikhand',
                    fill: 0x000000,
                    fontSize: 24,
                },
            });

            text.x = idx * 80;
            text.eventMode = 'static';
            text.on('pointerdown', item.action);
            this.addChild(text);
        });
    }
    onHackUse() {
        console.log('on hack use');
    }
    onExtandUse() {
        console.log('on extand use');
    }
    onRandomUse() {
        console.log('on random use');
    }
    onBackUse() {
        console.log('on back use');
    }
}

export const tool = new Tool();
