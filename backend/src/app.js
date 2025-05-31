import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

import predictRoute from './routes/predictRoute.js';

app.use('/api', predictRoute);

export {app}

document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const recipeInput = document.getElementById('recipeInput');
    
    // Check if we're on the recipe generator page
    if (generateBtn && recipeInput) {
        generateBtn.addEventListener('click', generateRecipe);
    }
    
    // Check if we have recipe result containers (for page2.html)
    const titleBox = document.querySelector('.title-box');
    const ingredientsBox = document.querySelector('.ingredients-box');
    const recipeBox = document.querySelector('.recipe-box');
    
    // If we have recipe containers and URL parameters, populate them
    if (titleBox && ingredientsBox && recipeBox) {
        const urlParams = new URLSearchParams(window.location.search);
        const recipeData = urlParams.get('recipe');
        
        if (recipeData) {
            try {
                const recipe = JSON.parse(decodeURIComponent(recipeData));
                
                // Populate the recipe page
                titleBox.textContent = recipe.title;
                
                // Create ingredients list
                ingredientsBox.innerHTML = '<h3>Ingredients</h3><ul>';
                recipe.ingredients.forEach(ingredient => {
                    ingredientsBox.innerHTML += `<li>${ingredient}</li>`;
                });
                ingredientsBox.innerHTML += '</ul>';
                
                // Create recipe steps
                recipeBox.innerHTML = '<h3>Recipe</h3>';
                recipe.steps.forEach(step => {
                    recipeBox.innerHTML += `<p>${step}</p>`;
                });
            } catch (error) {
                console.error('Error parsing recipe data:', error);
            }
        }
    }
});

// Function to generate recipe
function generateRecipe() {
    const ingredients = document.getElementById('recipeInput').value.trim();
    
    if (!ingredients) {
        alert('Please enter some ingredients');
        return;
    }
    
    // Show loading state
    const generateBtn = document.getElementById('generateBtn');
    const originalText = generateBtn.textContent;
    generateBtn.textContent = 'Generating...';
    generateBtn.disabled = true;
    
    // Call API to generate recipe, jyoti change this accordingly
    fetch('http://localhost:8000/api/recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to generate recipe');
        }
        return response.json();
    })
    .then(recipe => {
        // Navigate to recipe page with data
        const recipeData = encodeURIComponent(JSON.stringify(recipe));
        window.location.href = `page2.html?recipe=${recipeData}`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error generating recipe. Please try again.');
    })
    .finally(() => {
        // Reset button state
        generateBtn.textContent = originalText;
        generateBtn.disabled = false;
    });
}