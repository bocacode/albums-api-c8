
//import dbConnect from './dbConnect.js'
 import mongoSecrets from '../mongoSecrets.js'
 import { MongoClient } from 'mongodb'
 const client = new MongoClient(mongoSecrets)// conecction to mongodb server
 const db = client.db("bocaCode")
 const albums = db.collection("Albums")

export async function getAllAlbums(req, res) {
  const filter = {} // filter nothing. give me all albums
  try {
  const allAlbums = await albums.find(filter).toArray();
  res.status(200).json(allAlbums)
  } catch (err) {
    console.log(err)
    res.status(500).json({error: err})

  }

}

export async function createNewAlbum(req, res) {
  const album = req.body
  //todo- validate album
  try {
    await albums.insertOne(album)
    await getAllAlbums(req, res)
  }
  catch (err) {
      console.log(err)
      res.status(500).json({error: err})
    }
}