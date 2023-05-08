//API DATA FUNCTIONS

const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const categoryBaseURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const idBaseURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';


//fetch random meal
async function fetchRandomMeal() {
    try {
        const res = await fetch(randomMealURL)
        const data = await res.json()
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
    //filter favourite meals by category
    UI.filterFavouriteCategories()
    //show favourite meals
    UI.showFavouriteMeals()
    //make the heart function work
})

///////////////////////////////////////////////////////////////////

let categories = document.querySelectorAll('.category');
let grid = document.querySelector('.grid-favourite')
let body = document.querySelector('body')
let mealCategoriesSection = document.querySelector('.meal-categories-section')
let recipeSection = document.querySelector('.recipe-section')
let closeBtn = document.querySelector('.close-btn')
let favouriteTitle = document.querySelector('.favourite-title')
let container = document.querySelector('.container')


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
        recipeSection.innerHTML = `
            <div class="close-btn"><i class="fas fa-times"></i></div>
            <div class="recipe-image-container">
                <img src="${ data.meals[0].strMealThumb }" alt="${ data.meals[0].strMeal }">
            </div>
            <div class="recipe-info-container">
                <h3 class="recipe-title active">
                ${ data.meals[0].strMeal }
                </h3>
                <div class="recipe-category-container">
                    <p class="recipe-category active">Category:</p>
                    <p class="recipe-category-result">${ data.meals[0].strCategory }</p>
                </div>
                <div class="recipe-area-container">
                    <p class="recipe-area active">Area:</p>
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
                    <h3 class="meal-title active">${ meal.name }</h3>
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
                <h3 class="meal-title active">${ meal.name }</h3>
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

    //remove filtered meals from ui
    static removeMealFromUI(id) {
        let gridItems = document.querySelectorAll('.grid-item')
        gridItems.forEach((item) => {
            if (item.id === id) {
                item.remove()
            }
        })
    }

    static showFavouriteMeals() {
        const meals = Storage.getMealFromLS();
        meals.forEach((meal) => {
            fetchMealById(meal)
        })
    }

    static filterFavouriteCategories() {
        //show favourite meals
        // let meals = Storage.getMealFromLS();
        //change category background color
        categories.forEach((category) => {
            category.addEventListener('click', () => {
                //
                //
                categories.forEach((category) => {
                    category.classList.remove('active-background')
                })
                category.classList.add('active-background')
            })
        })
    }

    //NOT WORKING PROPERLY///////----/////////-----///////
    static filterFunction(category) {
        let gridItems = document.querySelectorAll('.grid-item')
        let newArray = Array.from(gridItems).filter(function (el) {
            return el.children[1].children[1].textContent !== category
        });
        newArray.forEach((arr) => {
            let id = arr.id
            UI.removeMealFromUI(id)
        })
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

//remove meal on heart click
body.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-heart') && e.target.classList.contains('fas') && e.target.parentElement.parentElement.parentElement.classList.contains('grid-item') === true) {
        e.target.parentElement.parentElement.parentElement.remove()
        //remove favourite meal to/from storage
        let id = e.target.parentElement.parentElement.parentElement.id
        Storage.removeMealFromLS(id)

    }
})

//remove meal on heart click on RECIPE page
body.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-heart') && e.target.classList.contains('fas') && e.target.parentElement.parentElement.parentElement.classList.contains('grid-item') === false) {
        //remove pink color
        e.target.classList.remove('pink')
        //remove favourite meal to/from storage
        let id = e.target.parentElement.id
        Storage.removeMealFromLS(id)
        location.reload()
    }
})

//on category click, show filtered meals
//NOT WORKING PROPERLY /////-----/////////------//////
categories.forEach((category) => {
    category.addEventListener('click', () => {
        UI.filterFunction(category.id)
    })
})

//get meal id on grid card click
grid.addEventListener('click', (e) => {
    if (e.target.classList.contains('grid-item')) {
        fetchRecipe(e.target.id)
        console.log(e.target.id);
        //remove none class from recipe section
        recipeSection.classList.remove('none')
        //add none class to favourite title
        favouriteTitle.classList.add('none')
        //add none class to favourite grid
        grid.classList.add('none')
        //scroll to top of recipe
        container.scrollTo(0, 0)

    } else if (e.target.parentElement.parentElement.classList.contains('grid-item')) {
        fetchRecipe(e.target.parentElement.parentElement.id)
        console.log(e.target.parentElement.parentElement.id);
        //remove none class from recipe section
        recipeSection.classList.remove('none')
        //add none class to favourite title
        favouriteTitle.classList.add('none')
        //add none class to favourite grid
        grid.classList.add('none')
        //scroll to top of recipe
        container.scrollTo(0, 0)
    }
})

//close button  listener
recipeSection.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-times')) {
        recipeSection.classList.add('none')
        //remove none class to favourite title
        favouriteTitle.classList.remove('none')
        //remove none class to favourite grid
        grid.classList.remove('none')
    }
})


//TO DO:

//1. swap \r\ in recipe for <br> using regex?
