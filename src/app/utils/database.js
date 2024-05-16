import {connect, connection} from "mongoose";

const conn = {
    isConnected: false
}

export async function dbConnect(){

    if(conn.isConnected) return;

    const db = await connect(process.env.MONGODB_URL);

    conn.isConnected = db.connections[0].readyState;

    console.log(db.connection.db.databaseName);
}

export async function dbDisconnect() {
    if (!conn.isConnected) return;

    await connection.close();
    conn.isConnected = false;

    console.log("MongoDB connection closed");
}

connection.on("connected", () => {
    console.log("MongoDB is connected")
})

connection.on("error", (err) => {
    console.log(err)
})