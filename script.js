// Local Static Recipe Dataset
const recipes = [
    {
        id: 1,
        title: "Classic Avocado Toast",
        description: "Crispy artisan bread topped with creamy mashed avocado, chili flakes, and microgreens.",
        tag: "Breakfast",
        image: "https://unsplash.com",
        ingredients: ["2 slices of sourdough bread", "1 ripe avocado", "1 tsp red pepper flakes", "Salt & black pepper", "1 tbsp olive oil"],
        instructions: ["Toast the sourdough slices to your preferred crispiness.", "Mash the avocado in a small bowl with salt, pepper, and olive oil.", "Spread the mashed avocado evenly across the warm toast.", "Garnish with red pepper flakes and serve fresh."]
    },
    {
        id: 2,
        title: "Garlic Butter Shrimp Pasta",
        description: "Tender shrimp sauteed in rich garlic butter sauce, tossed with perfectly al dente spaghetti.",
        tag: "Dinner",
        image: "https://unsplash.com",
        ingredients: ["200g spaghetti", "15-20 large shrimp (peeled)", "4 cloves garlic (minced)", "3 tbsp butter", "Fresh parsley", "Lemon juice"],
        instructions: ["Boil spaghetti in salted water according to box directions.", "Melt butter in a skillet over medium heat and add minced garlic for 1 minute.", "Add shrimp and cook until pink (about 2-3 minutes per side).", "Toss the drained pasta into the skillet, splash with lemon juice, and top with parsley."]
    },
    {
        id: 3,
        title: "Berry Blast Smoothie Bowl",
        description: "A thick blend of frozen mixed berries, banana, and almond milk topped with granola and chia seeds.",
        tag: "Healthy",
        image: "https://unsplash.com",
        ingredients: ["1 cup frozen mixed berries", "1 frozen banana", "1/2 cup almond milk", "1/4 cup granola", "1 tsp chia seeds"],
        instructions: ["Add the frozen berries, frozen banana, and almond milk to a high-speed blender.", "Blend until completely smooth and thick.", "Pour into a serving bowl.", "Arrange granola, fresh berries, and chia seeds neatly on top."]
    }
];

// DOM Element Targets
const recipeGrid = document.getElementById('recipe-grid');
const searchBar = document.getElementById('search-bar');
const themeToggle = document.getElementById('theme-toggle');
const recipeModal = document.getElementById('recipe-modal');
const closeModal = document.getElementById('close-modal');
const modalBody = document.getElementById('modal-body');

// Initial Setup Render
window.addEventListener('DOMContentLoaded', () => {
    displayRecipes(recipes);
});

// Render Recipe Array items dynamically to DOM
function displayRecipes(recipeItems) {
    let displayData = recipeItems.map((recipe) => {
        return `
            <article class="recipe-card" onclick="openRecipeDetails(${recipe.id})">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
                <div class="recipe-info">
                    <span class="recipe-tag">${recipe.tag}</span>
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                </div>
            </article>
        `;
    }).join("");
    
    if (recipeItems.length < 1) {
        recipeGrid.innerHTML = `<p style="text-align:center; grid-column: 1/-1;">No recipes matched your search criteria.</p>`;
    } else {
        recipeGrid.innerHTML = displayData;
    }
}

// Live Search Filter functionality
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(searchTerm) || 
               recipe.tag.toLowerCase().includes(searchTerm);
    });
    displayRecipes(filteredRecipes);
});

// Modal Logic: Open and construct individual details 
function openRecipeDetails(id) {
    const selected = recipes.find(recipe => recipe.id === id);
    if (!selected) return;

    modalBody.innerHTML = `
        <div class="modal-body-content">
            <h2>${selected.title}</h2>
            <span class="recipe-tag">${selected.tag}</span>
            <h4>Ingredients</h4>
            <ul>
                ${selected.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            <h4>Instructions</h4>
            <ol>
                ${selected.instructions.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
    `;
    recipeModal.style.display = 'flex';
}

// Modal Logic: Close Handlers
closeModal.addEventListener('click', () => recipeModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === recipeModal) recipeModal.style.display = 'none';
});

// Dark/Light Theme Switching Logic
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙 Dark';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️ Light';
    }
});
