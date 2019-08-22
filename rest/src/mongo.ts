import mongodb = require('mongodb');

let client: mongodb.MongoClient;

export async function getMongoDb(): Promise<mongodb.Db> {
    if (!client) {
        client = await connect();
        if (!client || !client.isConnected()) {
            return await getMongoDb();
        }
    }
    return client.db(process.env.MONGO_CONNECTION_DBNAME);
}

export async function connect(): Promise<mongodb.MongoClient> {
    let config: mongodb.MongoClientOptions = {
        connectTimeoutMS: 120000,
        socketTimeoutMS: 120000,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        keepAlive: true,
        useNewUrlParser: true
    }
    try {
        client = await mongodb.connect(getMongoConnectionURI(), config);
        client.on('error', async (err) => {
            await connect();
        });
        client.on('disconnect', async (err) => {
            await connect();
        });
    } catch (err) {
        console.error(err);
    }
    return client;
}

function getMongoConnectionURI(): string {
    return process.env.MONGO_CONNECTION_URI;
}