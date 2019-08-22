import { Block } from "./block";
import { getMongoDb } from './mongo';
import { FindOneOptions } from "mongodb";

export class BlockChain {
    constructor(private userId: string) { }

    async createGenesisBlock(): Promise<boolean> {
        let genesisBlock = new Block(this.userId, new Date(), "Genesis", null);
        try {
            let mongoDb = await getMongoDb();
            await mongoDb.collection<Block>("transactions").insert(genesisBlock);
            return true;
        } catch{
            return false;
        }
    }

    async getPreviousBlocks(count?: number): Promise<Block[]> {
        let mongoDb = await getMongoDb();
        try {
            let options: FindOneOptions = count ? { limit: count } : {};
            let previousBlocks: Block[] = await mongoDb.collection<Block>("transactions").find({ userId: this.userId }, options).sort({ _id: -1 }).toArray();
            return previousBlocks;
        } catch {
            return [];
        }
    }

    async getLatestBlock(): Promise<Block> {
        return (await this.getPreviousBlocks(1))[0];
    }

    async addBlock(userId: string, timestamp: Date, data: any): Promise<boolean> {
        let prevBlock = await this.getLatestBlock();
        if (!prevBlock) {
            return false;
        }
        let newBlock = new Block(userId, timestamp, data, prevBlock.hash);
        try {
            let mongoDb = await getMongoDb();
            await mongoDb.collection<Block>("transactions").insert(newBlock);
            return true;
        } catch {
            return false;
        }
    }
}