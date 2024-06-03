const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const PORT = process.env.PORT || 3000;
const app = express();

// Serve static files from the build directory
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI
const uri = "mongodb+srv://ehsansarzendeh:ehsansarzendeh@bookshop.vcgd9fh.mongodb.net/?retryWrites=true&w=majority&appName=BookShop";

// MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
  // finally {
  //   await client.close();
  //   console.log('Connection to MongoDB closed');
  // }
}

connectDB();

app.get("/api/books", async (req, res) => {

  const { searchTitle, searchAuthor, minPrice, maxPrice, filterCondition } = req.query;
  const query = {};

  if (searchTitle) {
    query.title = { $regex: searchTitle, $options: 'i' };
  }
  if (searchAuthor) {
    query.author = { $regex: searchAuthor, $options: 'i' };
  }
  if (minPrice) {
    query.price = { $gte: parseFloat(minPrice) };
  }
  if (maxPrice) {
    query.price = { $lte: parseFloat(maxPrice) };
  }
  if (filterCondition) {
    query.condition = filterCondition;
  }

  try {
    const database = client.db('book_shop');
    const collection = database.collection('books');
    const books = await collection.find(query).toArray();
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Error fetching books' });
  }

});

app.get("/api/books/:id", async (req, res) => {
  try {
    const database = client.db('book_shop');
    const collection = database.collection('books');
    const book = await collection.findOne({ _id: new ObjectId(req.params.id) });
    res.json(book);
  } catch (err) {
    console.error('Error fetching book:', err);
    res.status(500).json({ message: 'Error fetching book' });
  }
});

app.post('/api/add-book', async (req, res) => {
  try {
    const database = client.db('book_shop');
    const collection = database.collection('books');

    // Insert new book
    const { title, author, price, condition } = req.body;
    const priceInt = parseInt(price, 10);
    const newBook = { title, author, price: priceInt, condition };
    const insertResult = await collection.insertOne(newBook);
    console.log('Inserted book:', insertResult.insertedId);

    res.json(newBook);
  } catch (err) {
    console.error('Error processing form submission:', err);
    res.status(500).send('Error processing form submission');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});