const { MongoClient } = require('mongodb');

// Create a single client instance outside the handler
const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Force the connection to happen immediately
        await client.connect();
        
        const db = client.db("portfolio"); 
        const collection = db.collection("inquiries");

        await collection.insertOne({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            timestamp: new Date()
        });

        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error("MONGODB_ERROR_LOG:", error.message);
        return res.status(500).json({ error: error.message });
    } finally {
        // In serverless, we close the connection to prevent hanging
        await client.close();
    }
}