var express = require('express');
var router = express.Router();

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://2201130060ch:newborn1983@cluster0.tfnbblc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

router.get('/', async (req, res) => {
  try {
    // MongoDBへ接続
    await client.connect();

    // データベース、コレクションを指定
    const database = client.db('notes');
    const notes = database.collection('notes');

    // 全件取得
    const allNotes = await notes.find().toArray();

    res.json(allNotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    // 必要なら接続を閉じる（都度接続型の場合）
    await client.close();
  }
});

module.exports = router;
