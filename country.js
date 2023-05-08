//API DATA HANDLING

//list of areas data
const areaURL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

//all meals from areas
const areaMealsBaseURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

const idBaseURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';


//fetch list of areas
async function fetchAllAreas() {
    try {
        const res = await fetch(areaURL)
        const data = await res.json()
        UI.insertAreas(data)
    } catch (err) {
        console.log('There has been an error', err);
    }
}

//fetch a meal by its area
async function fetchMealsByArea(area) {
    try {
        const res = await fetch(areaMealsBaseURL + area)
        const data = await res.json()
        //call the getmealsbyid()
        data.meals.forEach((meal) => {
            fetchMealById(meal.idMeal)
        })
    } catch (err) {
        console.log('There has been an error', err);
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
    } catch (err) {
        console.log('There has been an error', err);
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

    //fetch all areas
    fetchAllAreas()
    //show default american area
    fetchMealsByArea('american')
})

//////////////////////////////////////////////

//variables
let randomMealSection = document.querySelector('.random-meal-section');
let mealCategoriesSection = document.querySelector('.meal-categories-section')
let recipeSection = document.querySelector('.recipe-section')
let countrySection = document.querySelector('.country-section')
let closeBtn = document.querySelector('.close-btn')
let categories = document.querySelectorAll('.category');
let grid = document.querySelector('.grid-country')
let container = document.querySelector('.container')
let countryContainer = document.querySelector('.country-container')
let body = document.querySelector('body')
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
        } else {
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
                    <p class="note active">Buon Appetito!</p>
                    <div class="video">
                    <iframe class="video" id="player" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/${ data.meals[0].strYoutube.slice(32) }" frameborder="0"></iframe>
                    </div>
                </div>
            </div>
            `
        }

    }

    //changes category background color on click
    static changeAreaColor() {
        let countries = document.querySelectorAll('.country')
        let america = countries[0]
        america.classList.add('active-background')
        countries.forEach((country) => {
            country.addEventListener('click', () => {
                countries.forEach((country) => {
                    country.classList.remove('active-background')
                })
                country.classList.add('active-background')
            })
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

    //insert areas list
    static insertAreas(areas) {
        areas.meals.forEach((meal) => {
            let country = document.createElement('div')
            country.classList.add('country')
            country.id = meal.strArea
            country.innerHTML = `
            <p class="country-text">${ meal.strArea }</p>
            `
            countryContainer.appendChild(country)

        })
        UI.changeAreaColor()
        //add event listener on each country
        let countries = document.querySelectorAll('.country')
        countries.forEach((c) => {
            c.addEventListener('click', () => {
                grid.innerHTML = ''
                fetchMealsByArea(c.id)
            })
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


//get meal id on grid card click
grid.addEventListener('click', (e) => {
    if (e.target.classList.contains('grid-item')) {
        //get recipe
        fetchRecipe(e.target.id)
        //remove none class from recipe section
        recipeSection.classList.remove('none')
        //add none class to country section
        countrySection.classList.add('none')
        //add none class to grid
        grid.classList.add('none')
        //scroll to top of recipe
        container.scrollTo(0, 0)

    } else if (e.target.parentElement.parentElement.classList.contains('grid-item')) {
        //get recipe
        fetchRecipe(e.target.parentElement.parentElement.id)
        //remove none class from recipe section
        recipeSection.classList.remove('none')
        //add none class to country section
        countrySection.classList.add('none')
        //add none class to grid
        grid.classList.add('none')
        //scroll to top of recipe
        container.scrollTo(0, 0)
    }
})

//close button  listener
recipeSection.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-times')) {
        //add none class from recipe section
        recipeSection.classList.add('none')
        //remove none class to country section
        countrySection.classList.remove('none')
        //remove none class to grid
        grid.classList.remove('none')
    }
})

//heart listener
body.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-heart') && e.target.classList.contains('fas') && e.target.parentElement.parentElement.parentElement.classList.contains('grid-item') === true) { // HERE **********
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
    if (e.target.classList.contains('fa-heart') && e.target.classList.contains('fas') && e.target.parentElement.parentElement.parentElement.classList.contains('grid-item') === false) { // HERE **********
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

//favourite button listener
body.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-heart') && e.target.classList.contains('far')) {
        console.log('hi');
    }
})

//countries scroll x on mouse hold
let isDown = false;
let startX;
let scrollLeft;

countryContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - countryContainer.offsetLeft;
    scrollLeft = countryContainer.scrollLeft;
});
countryContainer.addEventListener('mouseleave', () => {
    isDown = false;
});
countryContainer.addEventListener('mouseup', () => {
    isDown = false;
});
countryContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - countryContainer.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    countryContainer.scrollLeft = scrollLeft - walk;
});







//TO DO:

//1. swap \r\ in recipe for <br> using regex?