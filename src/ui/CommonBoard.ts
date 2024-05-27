import { Container, Text } from 'pixi.js';

export class CommonBoard extends Container {
    private text: Text;
    constructor({ label }: { label: string; width?: number; height?: number; padding?: number }) {
        super();
        this.text = new Text({
            text: label,
        });

        this.addChild(this.text);
    }
    public update({ label }: { label: string }) {
        this.text.text = label;
    }
}
