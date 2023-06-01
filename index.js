//API DATA HANDLING
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

const categoryBaseURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

const idBaseURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

//fetch random meal
async function fetchRandomMeal() {
    try {
        const res = await fetch(randomMealURL)
        const data = await res.json()
        // let meal = new MealCard(data)
        // return meal.createRandomMealCard()
        UI.createRandomMealCard(data)
    } catch (err) {
        console.log(err);
    }

}

//fetch all meals within a category
async function fetchCategoryMeals(category) {
    try {
        const res = await fetch(categoryBaseURL + category)
        const data = await res.json()
        return data
        //UI.getMealIds(data)
    } catch (err) {
        console.log(err);
    }

}

//fetch a meal by its id
async function fetchMealById(id) {
    try {
        const res = await fetch(idBaseURL + id)
        const data = await res.json()
        //find a way to return an array of objects
        //console.log(data);
        UI.createMeals(data)
        return data
    } catch (err) {
        console.log(err);
    }
}

//get recipe with id
async function fetchRecipe(id) {
    try {
        const res = await fetch(idBaseURL + id)
        const data = await res.json()
        //find a way to return an array of objects
        //console.log(data);
        UI.createRecipe(data)
        return data
    } catch (err) {
        console.log(err);
    }
}


//LOAD FUNCTIONS ON WINDOW LOAD
document.addEventListener('DOMContentLoaded', () => {
    //fetch random meal
    fetchRandomMeal()
    setInterval(() => {
        UI.removeRandomMeal()
        fetchRandomMeal()
    }, 8000)
    //fetchRandomMeal()
    //
    UI.changeCategoryColor()
    //show default beef category 
    UI.getCategoryMeals('beef')
    //show favourite meals
})

//////////////////////////////////////////////

//variables
let randomMealSection = document.querySelector('.random-meal-section');
let mealCategoriesSection = document.querySelector('.meal-categories-section')
let recipeSection = document.querySelector('.recipe-section')
let closeBtn = document.querySelector('.close-btn')
let categories = document.querySelectorAll('.category');
let grid = document.querySelector('.grid')
let body = document.querySelector('body')
let container = document.querySelector('.container')
let gridItems = document.querySelectorAll('.grid-item')
let categoryValue;
let idsArr = []
let meals = []


//REPRESENTS A MEAL
class MealCard {
    constructor(data) {
        this.name = data.meals[0].strMeal
        this.type = data.meals[0].strCategory
        this.area = data.meals[0].strArea
        this.thumb = data.meals[0].strMealThumb
        this.id = data.meals[0].idMeal
    }
}

//HANDLES UI TASKS
class UI {

    //create recipe
    static createRecipe(data) {
        const meals = Storage.getMealFromLS();
        if (meals.includes(data.meals[0].idMeal)) {
            recipeSection.innerHTML = `
            <header class="header-details">
            <div class="close-btn icon"><i class="fas fa-times"></i></div>
            <div>
              <i class="fas fa-heart icon"></i>
            </div>
            </header>
            <img src="${ data.meals[0].strMealThumb }" alt="${ data.meals[0].strMeal }">
        </div>
                <h3 class="recipe-title">
                ${ data.meals[0].strMeal }
                </h3>
                
                <div class="recipe-category-container">
                
                    <p class="recipe-category">Category:</p>
                    <p class="recipe-category-result">${ data.meals[0].strCategory }</p>
                </div>
                <div class="recipe-area-container">
                    <p class="recipe-area">Area:</p>
                    <p class="recipe-area-result">${ data.meals[0].strArea }</p>
                </div>
                <div class="heart-container" id="${ data.meals[0].idMeal }">
                    <i class="fas fa-heart heart-2 pink"></i>
                </div>
                <div class="ingredients-container">
                    <h4 class="ingredients-title active">Ingredients</h4>
                    <ul class="ingredients-list">
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient1 }</span><span class="ingr-measure">${ data.meals[0].strMeasure1 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient2 }</span><span class="ingr-measure">${ data.meals[0].strMeasure2 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient3 }</span><span class="ingr-measure">${ data.meals[0].strMeasure3 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient4 }</span><span class="ingr-measure">${ data.meals[0].strMeasure4 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient5 }</span><span class="ingr-measure">${ data.meals[0].strMeasure5 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient6 }</span><span class="ingr-measure">${ data.meals[0].strMeasure6 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient7 }</span><span class="ingr-measure">${ data.meals[0].strMeasure7 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient8 }</span><span class="ingr-measure">${ data.meals[0].strMeasure8 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient9 }</span><span class="ingr-measure">${ data.meals[0].strMeasure9 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient10 }</span><span class="ingr-measure">${ data.meals[0].strMeasure10 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient11 }</span><span class="ingr-measure">${ data.meals[0].strMeasure11 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient12 }</span><span class="ingr-measure">${ data.meals[0].strMeasure12 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient13 }</span><span class="ingr-measure">${ data.meals[0].strMeasure13 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient14 }</span><span class="ingr-measure">${ data.meals[0].strMeasure14 }</span></li><li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient15 }</span><span class="ingr-measure">${ data.meals[0].strMeasure15 }</span></li><li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient16 }</span><span class="ingr-measure">${ data.meals[0].strMeasure16 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient17 }</span><span class="ingr-measure">${ data.meals[0].strMeasure17 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient18 }</span><span class="ingr-measure">${ data.meals[0].strMeasure18 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient19 }</span><span class="ingr-measure">${ data.meals[0].strMeasure19 }</span></li>
                        <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient20 }</span><span class="ingr-measure">${ data.meals[0].strMeasure20 }</span></li>
                    </ul>
                </div>
                <div class="instructions-container">
                    <div class="instructions-title active">Instructions</div>
                    <p class="instructions">
                        "${ data.meals[0].strInstructions }"
                    </p>
                    <p class="note active">Buon Appetito!</p>
                    <div class="video">
                    <iframe class="video" id="player" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/${ data.meals[0].strYoutube.slice(32) }" frameborder="0"></iframe>
                    </div>
                </div>
            </div>
            `
        } else {
            recipeSection.innerHTML = `
            <header class="header-details">
            <div class="close-btn icon"><i class="fas fa-times"></i></div>
            <div>
              <i class="fas fa-heart icon"></i>
            </div>
            </header>

        
        <div class="recipe-info-container">
        <div class="recipe-image-container">
            <img src="${ data.meals[0].strMealThumb }" alt="${ data.meals[0].strMeal }">
        </div>
        <div class="retop">
            <h3 class="recipe-title">
            ${ data.meals[0].strMeal }
            </h3>
            <div class="recipe-category-container">
                <p class="recipe-category">Category:</p>
                <p class="recipe-category-result">${ data.meals[0].strCategory }</p>
            </div>
            <div class="recipe-area-container">
                <p class="recipe-area">Area:</p>
                <p class="recipe-area-result">${ data.meals[0].strArea }</p>
            </div>
            <div class="heart-container" id="${ data.meals[0].idMeal }">
                <i class="fas fa-heart heart-2"></i>
            </div>
            <div class="ingredients-container">
                <h4 class="ingredients-title active">Ingredients</h4>
                <ul class="ingredients-list">
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient1 }</span><span class="ingr-measure">${ data.meals[0].strMeasure1 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient2 }</span><span class="ingr-measure">${ data.meals[0].strMeasure2 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient3 }</span><span class="ingr-measure">${ data.meals[0].strMeasure3 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient4 }</span><span class="ingr-measure">${ data.meals[0].strMeasure4 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient5 }</span><span class="ingr-measure">${ data.meals[0].strMeasure5 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient6 }</span><span class="ingr-measure">${ data.meals[0].strMeasure6 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient7 }</span><span class="ingr-measure">${ data.meals[0].strMeasure7 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient8 }</span><span class="ingr-measure">${ data.meals[0].strMeasure8 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient9 }</span><span class="ingr-measure">${ data.meals[0].strMeasure9 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient10 }</span><span class="ingr-measure">${ data.meals[0].strMeasure10 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient11 }</span><span class="ingr-measure">${ data.meals[0].strMeasure11 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient12 }</span><span class="ingr-measure">${ data.meals[0].strMeasure12 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient13 }</span><span class="ingr-measure">${ data.meals[0].strMeasure13 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient14 }</span><span class="ingr-measure">${ data.meals[0].strMeasure14 }</span></li><li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient15 }</span><span class="ingr-measure">${ data.meals[0].strMeasure15 }</span></li><li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient16 }</span><span class="ingr-measure">${ data.meals[0].strMeasure16 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient17 }</span><span class="ingr-measure">${ data.meals[0].strMeasure17 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient18 }</span><span class="ingr-measure">${ data.meals[0].strMeasure18 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient19 }</span><span class="ingr-measure">${ data.meals[0].strMeasure19 }</span></li>
                    <li class="ingredient"><span class="ingr-title">${ data.meals[0].strIngredient20 }</span><span class="ingr-measure">${ data.meals[0].strMeasure20 }</span></li>
                </ul>
            </div>
            <div class="instructions-container">
                <div class="instructions-title active">Instructions</div>
                <p class="instructions">
                    "${ data.meals[0].strInstructions }"
                </p>
                <div class="container-play">
                <button src="https://www.youtube.com/embed/${ data.meals[0].strYoutube.slice(32) }" class="play-button">Play <i class="far fa-video"></i></button>
            </div>
                <p class="note active">Buon Appetito!</p>
                <div class="video">
                <iframe class="video" id="player" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/${ data.meals[0].strYoutube.slice(32) }" frameborder="0"></iframe>
                </div>
            </div>
        </div>
        </div>
        `
        }
    }

    //creates a random meal card
    static createRandomMealCard(data) {
        //create a new meal obj
        const meal = new MealCard(data)
        //create new div element
        let card = document.createElement('div');
        //insert obj data in new div
        card.innerHTML = `
        <p for="random-meal-container" class="random-meal-label not-active"></p>
        <div class="random-meal-container" id="${ meal.id }">
            <div class="random-meal-info">
                <h3 class="random-meal-title active">${ meal.name }</h3>
                <p class=random-meal-category><i class="fas fa-boxes active"></i>${ meal.type }</p>
                <p class="random-meal-area"><i class="fas fa-flag active"></i>${ meal.area }</p>
           
            </div>
            <div class="random-meal-photo">
                <img src="${ meal.thumb }" alt="random meal">
            </div>
        </div>
        `
        //append div to its parent element
        randomMealSection.appendChild(card)

        const meals = Storage.getMealFromLS();
        if (meals.includes(meal.id)) {
            card.innerHTML = `
        <p for="random-meal-container" class="random-meal-label not-active">Random Meal</p>
        <div class="random-meal-container" id="${ meal.id }">
            <div class="random-meal-info">
                <h3 class="random-meal-title active">${ meal.name }</h3>
                <p class=random-meal-category><i class="fas fa-boxes active"></i>${ meal.type }</p>
                <p class="random-meal-area"><i class="fas fa-flag active"></i>${ meal.area }</p>
                <div class="heart-container">
                    <i class="fas fa-heart heart-full pink"></i>
                </div> 
            </div>
            <div class="random-meal-photo">
                <img src="${ meal.thumb }" alt="random meal">
            </div>
        </div>
        `
        }
    }

    //changes category background color on click
    static changeCategoryColor() {
        categories.forEach((category) => {
            category.addEventListener('click', () => {
                categories.forEach((category) => {
                    category.classList.remove('active-background')
                })
                category.classList.add('active-background')
                UI.getCategoryMeals(category.id)
                //UI.showCategoryMeals(category)
            })
        })
    }

    //fetch all category ids and all meal by those ids
    static getCategoryMeals(cat) {
        fetchCategoryMeals(cat).then((res) => {
            for (let i = 0; i < res.meals.length; i++) {
                fetchMealById(res.meals[i].idMeal)
            }
            if (grid === null) {
                return
            } else {
                grid.innerHTML = ''
            }
        })
    }

    //create meal card
    static createMeals(data) {
        //create a new meal obj
        const meal = new MealCard(data)
        let gridItem = document.createElement('div')
        gridItem.classList.add('grid-item')
        gridItem.classList.add('meal')
        gridItem.id = `${ meal.id }`
        gridItem.innerHTML = `
                <div class="meal-photo">
                    <img src="${ meal.thumb }" alt="meal">
                </div>
                <div class="meal-info">
                    <h3 class="meal-title">${ meal.name }</h3>
                    <p class=meal-category><i class="fas fa-boxes active"></i>${ meal.type }</p>
                    <p class="meal-area"><i class="fas fa-flag active"></i>${ meal.area }</p>
                </div>
                <div class="heart-container">
                    <div>
                        <i class="fas fa-heart heart-full"></i>
                    </div>
                    
                </div>
        `
        grid.appendChild(gridItem)
        //if id is in LS, add pink to heart
        const meals = Storage.getMealFromLS();
        if (meals.includes(gridItem.id)) {
            gridItem.innerHTML = `
            <div class="meal-photo">
                <img src="${ meal.thumb }" alt="meal">
            </div>
            <div class="meal-info">
                <h3 class="meal-title">${ meal.name }</h3>
                <p class=meal-category><i class="fas fa-boxes active"></i>${ meal.type }</p>
                <p class="meal-area"><i class="fas fa-flag active"></i>${ meal.area }</p>
            </div>
            <div class="heart-container">
                <div>
                    <i class="fas fa-heart heart-full pink"></i>
                </div>
                
            </div>
    `
        }
    }


    static removeRandomMeal() {
        randomMealSection.innerHTML = ''
    }


}



//HANDLES STORAGE

class Storage {

    static getMealFromLS() {
        let meals;
        if (localStorage.getItem('meals') === null) {
            meals = [];
        } else {
            meals = JSON.parse(localStorage.getItem('meals'));
        }

        return meals;
    }

    static addMealToLS(meal) {
        const meals = Storage.getMealFromLS();
        //check if id is already in LS
        if (meals.includes(meal)) {
            return
        } else {
            meals.push(meal);
            localStorage.setItem('meals', JSON.stringify(meals));
        }
    }

    static removeMealFromLS(id) {
        const meals = Storage.getMealFromLS();
        meals.forEach((meal, index) => {
            if (meal === id) {
                meals.splice(index, 1);
            }
        });
        localStorage.setItem('meals', JSON.stringify(meals));
    }
}





// EVENT LISTENERS

//get meal id on random meal card click
randomMealSection.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('random-meal-container')) {
        //fecth recipe
        fetchRecipe(e.target.parentElement.id)
        //remove none class from recipe section
        recipeSection.classList.remove('none')
        //add none class to random meal section
        randomMealSection.classList.add('none')
        //add none class to meal categories section
        mealCategoriesSection.classList.add('none')
    } else if (e.target.parentElement.parentElement.classList.contains('random-meal-container')) {
        //fetch recipe
        fetchRecipe(e.target.parentElement.parentElement.id)
        //remove none class from recipe section
        recipeSection.classList.remove('none')
        //add none class to random meal section
        randomMealSection.classList.add('none')
        //add none class to meal categories section
        mealCategoriesSection.classList.add('none')
    }
})

//get meal id on grid card click
grid.addEventListener('click', (e) => {
    if (e.target.classList.contains('grid-item')) {
        //get recipe
        fetchRecipe(e.target.id)
        //remove none class from recipe section
        recipeSection.classList.remove('none')
        //add none class to random meal section
        randomMealSection.classList.add('none')
        //add none class to meal categories section
        mealCategoriesSection.classList.add('none')
        //scroll to top of recipe
        container.scrollTo(0, 0)

    } else if (e.target.parentElement.parentElement.classList.contains('grid-item')) {
        //get recipe
        fetchRecipe(e.target.parentElement.parentElement.id)
        //remove none class from recipe section
        recipeSection.classList.remove('none')
        //add none class to random meal section
        randomMealSection.classList.add('none')
        //add none class to meal categories section
        mealCategoriesSection.classList.add('none')
        //scroll to top of recipe
        container.scrollTo(0, 0)
    }
})

//close button  listener
recipeSection.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-times')) {
        recipeSection.classList.add('none')
        //remove none class to random meal section
        randomMealSection.classList.remove('none')
        //remove none class to meal categories section
        mealCategoriesSection.classList.remove('none')
    }
})

/////////////////// MEAL CARD HEART ///////////////////////

//heart listener
body.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-heart') && e.target.classList.contains('fas') && e.target.parentElement.parentElement.parentElement.classList.contains('grid-item') === true) {
        //change heart color and animate it
        e.target.classList.add('pink')
        e.target.classList.toggle('animate-heart')
        //add/remove favourite meal to/from storage
        let id = e.target.parentElement.parentElement.parentElement.id
        if (Storage.getMealFromLS().includes(id)) {
            e.target.classList.remove('pink')
            Storage.removeMealFromLS(id)
        } else {
            Storage.addMealToLS(id)
        }
    }
})

//heart listener on RECIPE page
body.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-heart') && e.target.classList.contains('fas') && e.target.parentElement.parentElement.parentElement.classList.contains('grid-item') === false && e.target.parentElement.parentElement.parentElement.classList.contains('random-meal-container') === false) { // HERE **********
        //change heart color and animate it
        e.target.classList.add('pink')
        e.target.classList.toggle('animate-heart')
        //add/remove favourite meal to/from storage
        let id = e.target.parentElement.id
        if (Storage.getMealFromLS().includes(id)) { // HERE **********
            e.target.classList.remove('pink')
            Storage.removeMealFromLS(id)
            recipeSection.addEventListener('click', (e) => {
                if (e.target.classList.contains('fa-times')) {
                    location.reload() // HERE **********
                }
            })
        } else {
            Storage.addMealToLS(id)
            recipeSection.addEventListener('click', (e) => {
                if (e.target.classList.contains('fa-times')) {
                    location.reload() // HERE **********
                }
            })
        }
    }
})


/////////////////// RANDOM CARD HEART ///////////////////////

//heart listener
body.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-heart') && e.target.classList.contains('fas') && e.target.parentElement.parentElement.parentElement.classList.contains('random-meal-container') === true) { // HERE **********
        //change heart color and animate it
        e.target.classList.add('pink')
        e.target.classList.toggle('animate-heart')
        //add/remove favourite meal to/from storage
        let id = e.target.parentElement.parentElement.parentElement.id
        if (Storage.getMealFromLS().includes(id)) {
            e.target.classList.remove('pink')
            Storage.removeMealFromLS(id)
        } else {
            Storage.addMealToLS(id)
        }
    }
})

//heart listener on RECIPE page - not needed?

//categories scroll x on mouse hold
let categoriesContainer = document.querySelector('.categories-container')
let isDown = false;
let startX;
let scrollLeft;

categoriesContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - categoriesContainer.offsetLeft;
    scrollLeft = categoriesContainer.scrollLeft;
});
categoriesContainer.addEventListener('mouseleave', () => {
    isDown = false;
});
categoriesContainer.addEventListener('mouseup', () => {
    isDown = false;
});
categoriesContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - categoriesContainer.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    categoriesContainer.scrollLeft = scrollLeft - walk;

});




// Fungsi untuk menutup pemberitahuan
function closeNotification() {
    document.getElementById("notification").style.display = "none";
    // Simpan informasi penutupan pemberitahuan ke localStorage
    localStorage.setItem("notificationClosed", "true");
}

// Cek apakah pemberitahuan sudah ditutup sebelumnya
var isClosed = localStorage.getItem("notificationClosed");
if (!isClosed) {
    // Jika belum ditutup, tampilkan pemberitahuan
    document.getElementById("notification").style.display = "block";
}




//TO DO:

//1. on favourite page make the category filter work
//2. swap \r\ or "." in recipe instructions for <br> using regex?