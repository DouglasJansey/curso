import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri: any = '';
console.log(mongoUri)
const client = new MongoClient(mongoUri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);
async function dbConnection(){
    try{
        await client.connect();
        
        const db = await client.db('CURSO')
        return {db, client}
    }
    finally{
        await client.close();
    }
}

export default dbConnection;