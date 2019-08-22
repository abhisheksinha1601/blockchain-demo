import { ObjectId } from "mongodb";
import crypto = require('crypto');
import { getMongoDb } from "./mongo";
import { getJWTToken } from "./jwt";
import { BlockChain } from "./blockchain";

export async function signup(body): Promise<boolean> {
    let newUser = {
        _id: new ObjectId(),
        username: body.username.toLowerCase(),
        name: body.name,
        password: crypto.pbkdf2Sync(body.password, body.username.toLowerCase(), 10000, 64, 'sha512').toString('base64')
    };

    let mongoDb = await getMongoDb();
    try {
        await mongoDb.collection("users").insert(newUser);
        let blockchain = new BlockChain(newUser._id.toHexString());
        return blockchain.createGenesisBlock();
    } catch {
        return false;
    }
}

export async function login(username: string, password: string): Promise<string> {
    let mongoDb = await getMongoDb();
    try {
        let users = await mongoDb.collection("users").find({ username: username.toLowerCase(), password: crypto.pbkdf2Sync(password, username.toLowerCase(), 10000, 64, 'sha512').toString('base64') }).toArray();
        if (!users.length) {
            throw new Error();
        }
        return getJWTToken({
            _id: users[0]._id,
            username: users[0].username,
            name: users[0].name
        });
    } catch{
        return null;
    }
}

export async function addTransaction(userId: string, data: any) {
    let blockchain = new BlockChain(userId);
    return blockchain.addBlock(userId, new Date(), data);
}

export async function getAllTransactions(userId: string) {
    let blockchain = new BlockChain(userId);
    return blockchain.getPreviousBlocks();
}