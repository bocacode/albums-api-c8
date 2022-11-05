// import dbConnect from "./dbConnect.js"

import mongoSecrets from "../mongoSecrets.js";
import { MongoClient } from "mongodb";
const client = new MongoClient(mongoSecrets)
const db = client.db("BocaCode")
const albums = db.collection("Albums")

export async function getAllAlbums(req, res) {
  const filter = {} // filter nothing, give all albums
  try {
    const allAlbums = await albums.find(filter).toArray()
    res.status(200).json(allAlbums) //.json is same as .send just more explicit
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err })
  }
}

export async function createNewAlbum(req, res) {
  const album = req.body
  // to do - validate album structure
  try {
    await albums.insertOne(album)
    await getAllAlbums(req, res)
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err })
  }
}