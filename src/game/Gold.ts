import { Container, Text } from 'pixi.js';

export class Gold extends Container {
    public coin: number = 0;
    private text: Text;
    constructor() {
        super();
        this.text = new Text({
            text: String(this.coin),
            style: {
                fontFamily: 'Shrikhand',
                fill: 0xffe400,
            },
        });
        this.text.y = -50;
        this.text.x = 0;

        this.addChild(this.text);
    }
    addCoin(n: number) {
        this.coin += n;
        this.text.text = String(this.coin);
    }
    useCoin(n: number) {
        this.coin -= n;
        this.text.text = String(this.coin);
    }
}
export const gold = new Gold();
