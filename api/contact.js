const { MongoClient } = require('mongodb');

// Replace this with your actual Connection String from MongoDB Atlas later
const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await client.connect();
            const database = client.db('portfolio');
            const collection = database.collection('inquiries');
            
            const result = await client.db("portfolio").collection("inquiries").insertOne(req.body);
            
            res.status(200).json({ message: 'Success', id: result.insertedId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to connect to MongoDB' });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}