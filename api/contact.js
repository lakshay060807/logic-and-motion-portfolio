const { MongoClient } = require('mongodb');

// Use the variable you saved in Vercel Settings
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await client.connect();
        const database = client.db('portfolio'); 
        const collection = database.collection('inquiries');
        
        await collection.insertOne(req.body);
        
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        // This line is key! It tells us WHY it failed in the Vercel Logs
        console.error("MONGODB_ERROR_DETAILS:", error.message);
        return res.status(500).json({ error: 'Server failed to connect to Database' });
    } finally {
        await client.close();
    }
}