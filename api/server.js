import express from "express";
import cors from "cors";
import recipeRouter from './routes/recipeRoutes.js'


//express kurulumu
const app = express();
const port = 4004;

// CORS hataları önlemesini sağlayan middleware
app.use(cors());

//body JSON VERİLERİ  çeviren
app.use(express.json());
app.use(recipeRouter)

//tarifler için crud operasyonlarını gerçekleştireceğimiz enpointleri tanımla
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışmaya başladı `);
});
