type gameStatus = 'normal' | 'pause' | 'end';
export class GameStatus {
    public status: gameStatus;
    constructor() {
        this.status = 'normal';
    }

    public setStatus(status: gameStatus) {
        this.status = status;
    }
}

export const gameStatus = new GameStatus();
