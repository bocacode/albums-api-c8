import functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { createNewAlbum, getAllAlbums } from './src/albums.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/albums', await getAllAlbums)
app.post('/albums', await createNewAlbum)

export const api = functions.https.onRequest(app)
