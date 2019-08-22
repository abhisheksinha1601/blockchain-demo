import crypto = require('crypto-js')

export class Block {
    public hash: string;

    constructor(private userId: string, private timestamp: Date, private data: any, private prevHash: string) {
        this.hash = this.createHash(this.userId, this.timestamp, this.data, this.prevHash);
    }

    createHash(userId: string, timestamp: Date, data: any, prevHash: string): string {
        return crypto.SHA256(JSON.stringify({ userId, timestamp, data, prevHash })).toString();
    }
}