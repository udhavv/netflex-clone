// const express= require('express')   "type": "commonJs"
import express from 'express';    //"type" :"module"
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { ENV_VARS } from './config/envVars.js';
import authRoutes from './routes/auth.route.js'
import movieRoutes from './routes/movie.route.js'
import searchRoutes from './routes/search.route.js'
import cors from 'cors'

import tvRoutes from './routes/tv.route.js'


import path from 'path';
import { fileURLToPath } from 'url';
import { protectRoute } from './middleware/protectRoute.js';


const app= express()
const PORT= ENV_VARS.PORT
const __dirname= path.resolve()

// const __filename= fileURLToPath(import.meta.url)
// const __dirname= path.dirname(__filename)


app.use(express.json())  //will allow us to parse req.body
app.use(cookieParser())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/movie', protectRoute ,movieRoutes)
app.use('/api/v1/tv', protectRoute , tvRoutes)
app.use('/api/v1/search', protectRoute , searchRoutes)



//   -----deployment---------------
if (process.env.NODE_ENV=== 'production'){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}


//    --------deployment-------------



app.listen(PORT, () => {
    console.log('server started at port 4000')
    connectDB()
})



