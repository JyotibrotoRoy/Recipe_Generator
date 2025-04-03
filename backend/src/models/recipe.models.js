import mongoose, {Schema} from "mongoose"

const recipeSchema = new Schema(
    {
        name: {
        type: String,
        required: true
     },
     minutes: {
        type: Number,
        required: true
     },
     tags: {
        type: [String],
     },
     nutrition: {
        type: [Number]
     },
     steps: {
        type: [String],
        required: true,
     },
     description: {
        type: String,
    },
    ingredients: {
        type: String,
        required: true
    }
    }
)

export const Recipe = mongoose.model("Recipe", recipeSchema)