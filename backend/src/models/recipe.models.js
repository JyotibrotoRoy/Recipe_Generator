import mongoose, {Schema} from "mongoose"

const recipeSchema = new Schema(
   {
      name: {
        type: String
      },
      ingredients: {
        type: String
      }
   },{timestamps: true}
)

export const Recipe = mongoose.model("Recipe", recipeSchema)