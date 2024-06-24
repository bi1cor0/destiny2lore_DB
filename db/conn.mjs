import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config();

const client = new MongoClient(process.env.ATLAS_URI) //using the .env file to connect to the MongoDB database in Atlas.
//Note: DO NOT commit the .env file into github. will need to be recreated on different machines. 

let conn; 

try{
    conn = await client.connect();
    console.log("Connected to Mongo :D")
} catch(err){
    console.error(err);
}

let db = conn.db("destiny2_lore")

export default db;