import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Recipe } from "../src/models/recipe.models.js";
import dotenv from "dotenv"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MONGO_URI = process.env.MONGODB_URI

const filepath = path.join(__dirname, "../data/RAW_recipes.json")
const jsonData = JSON.parse(fs.readFileSync(filepath, "utf8"))

const uploadData = async() => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Mongodb connected uploading data');
        
        const parsedData = jsonData
            .filter(Recipe => Recipe.name)
            .map((Recipe) => {
            return {
                ...Recipe,
                nutrition: JSON.parse(Recipe.nutrition)
            }
        })

        await Recipe.insertMany(parsedData);
        console.log("✅ Data uploaded successfully!");
        
        mongoose.connection.close();
    } catch (error) {
        console.log("❌ Error uploading data:", error);
        
    }
}

uploadData();