var dietBox = document.querySelectorAll(".diet");
var allergieBox = document.querySelectorAll(".allergie__check");
var refreshButton = document.querySelector(".refresh");
var printButton = document.querySelector(".printButton");
var modalBreakfast = document.getElementsByClassName('modalBreakfast');
var modalLunch = document.getElementsByClassName('modalLunch');
var modalDinner = document.getElementsByClassName('modalDinner');
var spanBreakfast = document.getElementsByClassName("closeBreakfast")[0];
var spanLunch = document.getElementsByClassName("closeLunch")[0];
var spanDinner = document.getElementsByClassName("closeDinner")[0];

var breakfastButton = $(".myBtnBtnBreakfast");
var lunchButton = $(".myBtnBtnLunch");
var dinnerButton = $(".myBtnBtnDinner");
var saveButton = $(".savePlanModal");
var saveModal = $(".modalSave");
var breakfastRefreshButton = $(".myRefreshButtonBreakfast");
var lunchRefreshButton = $(".myRefreshButtonLunch");
var dinnerRefreshButton = $(".myRefreshButtonDinner");
var closeSpanBreakfast = $(".closeBreakfast");
var closeSpanLunch = $(".closeLunch");
var closeSpanDinner = $(".closeDinner");
var breakfastModal = $(".modalBreakfast");
var lunchModal = $(".modalLunch");
var dinnerModal = $(".modalDinner");
var calorieCountSpan = $(".total__calories__span");
var breakfastCalorieSpan = $(".breakfastCalSpan");
var lunchCalorieSpan = $(".lunchCalSpan");
var dinnerCalorieSpan = $(".dinnerCalSpan");
var amazonButton = $(".amazonButton");
var amazonInput = $(".amazonInput");
var nextButton = $(".seq-next");
var prevButton = $(".seq-prev");
var finButton = $(".seq-finish");
var step1 = $(".step1");
var step3 = $(".step3");
var calcBMR = $(".calculateBMRBtn");
var random = Math.floor(Math.random() * 30);
var printCounter = 0;
var backgroundColors = ["#f4d4d3", "#d6f0d9", "#e2ecf9", "#dcdcdc", "#dedeee", "#faf0e6", "#c5b7b7", "#eedede", "#efd6e4"]

//onboarding BMR vars
var calcBMR = $(".calculateBMRBtn");
var basalInputAge = $(".basalInputAge");
var basalInputHeight = $(".basalInputHeight");
var basalInputGender = $(".basalInputGender");
var basalInputWeight = $(".basalInputWeight");
var basalInputExercise = $(".basalInputExercise");
var basalInputGoal = $(".basalInputGoal");
var ketoInput = $(".ketoCheck");
var paleoInput = $(".paleoCheck");


//onboarding

var onboardingCounter = 1;

function checkStep() {
    if (onboardingCounter === 1) {
        prevButton.addClass("buttonHide");
        finButton.addClass("buttonHide");
        nextButton.removeClass("buttonHide");
    } else if (onboardingCounter === 4) {
        nextButton.addClass("buttonHide");
        finButton.removeClass("buttonHide");
    } else if (onboardingCounter > 1) {
        prevButton.removeClass("buttonHide");
        finButton.addClass("buttonHide");
        nextButton.removeClass("buttonHide");
    }
}

nextButton.on("click", function() {
    onboardingCounter++;
    checkStep();
});
prevButton.on("click", function() {
    onboardingCounter--;
    checkStep();
});


//bmr calculator

function calcGoal(goal, bmr) {
    return (goal === "maintain") ? bmr
        : (goal === "lose1") ? bmr = bmr - (bmr * .10)
        : (goal === "lose2") ? bmr = bmr - (bmr * .25)
        : (goal === "gain1") ? bmr = bmr + (bmr * .10)
        : bmr = bmr + (bmr * .25);
}

function calcProtein(goal, bmr, proteinGoal) {
    if (ketoInput.is(":checked")) {
        return proteinGoal = (bmr * .50);
    } else if (paleoInput.is(":checked")) {
        return proteinGoal = (bmr * .20);
    } else {
        return (goal === "maintain") ? proteinGoal = (bmr * .20)
            : (goal === "lose1") ? proteinGoal = (bmr * .25)
            : (goal === "lose2") ? proteinGoal = (bmr * .35)
            : (goal === "gain1") ? proteinGoal = (bmr * .25)
            : proteinGoal = (bmr * .35);
    }
}

function calcFats(goal, bmr, fatGoal) {
    if (ketoInput.is(":checked")) {
        return fatGoal = (bmr * .75);
    } else {
        return (goal === "maintain") ? fatGoal = (bmr * .30)
            : (goal === "lose1") ? fatGoal = (bmr * .25)
            : (goal === "lose2") ? fatGoal = (bmr * .20)
            : fatGoal = (bmr * .35);
    }
}

function calcCarbs(goal, bmr, carbGoal) {
    if (ketoInput.is(":checked")) {
        return carbGoal = (bmr * .05);
    } else if (paleoInput.is(":checked")) {
        return carbGoal = (bmr * .20);
    } else {
        return (goal === "maintain") ? carbGoal = (bmr * .50)
            : (goal === "lose1") ? carbGoal = (bmr * .45)
            : (goal === "lose2") ? carbGoal = (bmr * .35)
            : (goal === "gain1") ? carbGoal = (bmr * .55)
            : carbGoal = (bmr * .65)
    }
}


calcBMR.on("click", function() {
    var weight = Math.floor(parseInt(basalInputWeight.val()) * 0.45359237);
    var basalMetabolicRate = 0;
    var carbGoal = 0;
    var proteinGoal = 0;
    var fatGoal = 0;
    if (basalInputGender.val() === "male") {
        basalMetabolicRate = Math.round(((10 * weight) + (6.25 * parseInt(basalInputHeight.val())) - (5 * parseInt(basalInputAge.val())) + 5) * parseFloat(basalInputExercise.val()));
        var endBMR = calcGoal(basalInputGoal.val(), basalMetabolicRate);
        var newCarb = calcCarbs(basalInputGoal.val(), endBMR, carbGoal);
        var newFat = calcFats(basalInputGoal.val(), endBMR, fatGoal);
        var newProtein = calcProtein(basalInputGoal.val(), endBMR, proteinGoal);
        $(".basalCalorieSpan").text(Math.round(endBMR) + " per day");
        $(".carbCalSpan").text(Math.round(newCarb) + " cals");
        $(".fatCalSpan").text(Math.round(newFat) + " cals");
        $(".proteinCalSpan").text(Math.round(newProtein) + " cals");
    } else {
        basalMetabolicRate = Math.round(((10 * weight) + (6.25 * parseInt(basalInputHeight.val())) - (5 * parseInt(basalInputAge.val())) - 161) * parseFloat(basalInputExercise.val()));
        var endBMR = calcGoal(basalInputGoal.val(), basalMetabolicRate);
        var newCarb = calcCarbs(basalInputGoal.val(), endBMR, carbGoal);
        var newFat = calcFats(basalInputGoal.val(), endBMR, fatGoal);
        var newProtein = calcProtein(basalInputGoal.val(), endBMR, proteinGoal);
        $(".basalCalorieSpan").text(Math.round(endBMR) + " per day");
        $(".carbCalSpan").text(Math.round(newCarb) + " cals");
        $(".fatCalSpan").text(Math.round(newFat) + " cals");
        $(".proteinCalSpan").text(Math.round(newProtein) + " cals");
    }
});


// open modal

$(document).on("click", ".myBtnBtnBreakfast", function() {
    var parent = $(this).closest(".food__grid__item");
    $(".modalBreakfast",parent).css("display", "block");
});

$(document).on("click", ".myBtnBtnLunch", function() {
    var parent = $(this).closest(".food__grid__item");
    $(".modalLunch",parent).css("display", "block");
});

$(document).on("click", ".myBtnBtnDinner", function() {
    var parent = $(this).closest(".food__grid__item");
    $(".modalDinner",parent).css("display", "block");
});

$(document).on("click", ".savePlan", function() {
    $(".modalSave").css("display", "block");
});

//refresh food item

$(document).on("click", ".myRefreshButtonBreakfast", breakfastRefresh);

$(document).on("click", ".myRefreshButtonLunch", lunchRefresh);

$(document).on("click", ".myRefreshButtonDinner", dinnerRefresh);

// close modal

$(document).on("click", ".closeBreakfast", function() {
    var parent = $(this).closest(".food__grid__item");
    $(".modalBreakfast",parent).css("display", "none");
});

$(document).on("click", ".closeLunch", function() {
    var parent = $(this).closest(".food__grid__item");
    $(".modalLunch",parent).css("display", "none");
});

$(document).on("click", ".closeDinner", function() {
    var parent = $(this).closest(".food__grid__item");
    $(".modalDinner",parent).css("display", "none");
});

$(document).on("click", ".closeSave", function() {
    var parent = $(this).closest(".header__advanced__content");
    $(".modalSave",parent).css("display", "none");
});

// close modal when click outside modal

$(document).on("click", ".modalBreakfast", function(event) {
    if($(event.target).hasClass("modalBreakfast")) {
        $(this).css("display", "none");
    }
});

$(document).on("click", ".modalLunch", function(event) {
    if($(event.target).hasClass("modalLunch")) {
        $(this).css("display", "none");
    }
});

$(document).on("click", ".modalDinner", function(event) {
    if($(event.target).hasClass("modalDinner")) {
        $(this).css("display", "none");
    }
});

$(document).on("click", ".modalSave", function(event) {
    if($(event.target).hasClass("modalSave")) {
        $(this).css("display", "none");
    }
});



dietBox.forEach(function(diet) {
   diet.classList.add("cursor");
   diet.addEventListener("click", function() {
       console.log("shit");
       document.querySelector(".active_diet").classList.remove("active_diet");
       diet.classList.add("active_diet");
   });
});


allergieBox.forEach(function(allergie) {
    allergie.addEventListener("click", function() {
       allergie.parentElement.classList.toggle("active_allergie"); 
    });
});

refreshButton.addEventListener("click", function() {
   window.location.reload();
});

saveButton.on("click", function() {
   var mealPlan = [];
   var saveInput = $(".saveInput");
   var saveDesc = $(".descriptionInput");
   var inputText = saveInput.val();
   var descText = saveDesc.val();
   var img = dinnerArr[0].image;
   var color = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
   mealPlan.push(breakfastArr);
   mealPlan.push(lunchArr);
   mealPlan.push(dinnerArr);
   console.log(mealPlan);
   $.ajax({
      method: "POST",
      data: {plan: mealPlan, name: inputText, image: img, dietType: diet, description: descText, backgroundColor: color},
      url: "/saverecipe"
   })
   .fail(function(err) {
      console.log(err);
   })
   saveModal.css("display", "none");
   Swal.fire({
      title: 'Plan saved!',
      text: 'You can find the plan in your profile.',
      type: 'success',
      confirmButtonClass: "confirmButton",
      buttonsStyling: false
   });
});

printButton.addEventListener("click", function() {
   generatePrint();
});


//functions

function lunchRefresh() {
      var foodName = $(this).closest(".food__grid__item").find(".food__item__info").find(".lunch__name").text();
      var parent = $(this).closest(".food__grid__item");
      var outerParent = $(this).closest(".lunch__items__container");
      var calorieTotal = parseInt(calorieCountSpan.text());
      var currentItemCalories = $(this).closest(".food__grid__item").find(".tooltiptext").find(".tooltip__nutrition__list").find(".item1").find(".currentCal").text();
      var currentItemCaloriesNum = parseInt(currentItemCalories);
      //remove parent item and remove it from breakfast Arr
      var counter = 0;
      lunchArr.forEach(function(item) {
         if (item.name == foodName && counter < 1) {
            lunchArr.splice($.inArray(item, lunchArr), 1);
            counter++;
         }
      });
      parent.remove();
      //find random item in extraBreakfastArray and add HTML
      var random = Math.floor(Math.random() * 28);
      var ingredientArray = [];
      var ingredientModalArray = [];
      var newFoodItem = extraLunchArr[random];
      var lunchIngreObj = newFoodItem.ingredients;
      Object.keys(lunchIngreObj).forEach(function(key) {
         var ingKey = lunchIngreObj[key];
         var ingKeyName = ingKey.name;
         if (ingKeyName !== undefined) {
            ingredientArray.push("" + ingKey.amount + " " + ingKey.unit + " " + ingKey.name);
            ingredientModalArray.push(ingKey);
         } else {
            ingredientArray.push(" ");
            ingredientModalArray.push(" ");
         };
      });
      var randomFoodItem = '<div class="food__grid__item tooltip">\
                                <div class="tooltiptext">\
                                    <p class="tooltip__name">' + newFoodItem.name + '</p>\
                                    <p class="cook__time">Cook time: ' + newFoodItem.time_to_make + '</p>\
                                    <hr>\
                                    <p class="tooltip__nutrition">Nutrition info: </p>\
                                    <ul class="tooltip__nutrition__list">\
                                        <li class="tooltip__nutrition__list__item item1"><span>Calories:</span> <span class="currentCal">' +  newFoodItem.nutrition.calories + '</span></li>\
                                        <li class="tooltip__nutrition__list__item"><span>Carbs:</span>' + newFoodItem.nutrition.carbs + 'g' + '</li>\
                                        <li class="tooltip__nutrition__list__item"><span>Fat:</span>' + newFoodItem.nutrition.fat + 'g' + '</li>\
                                        <li class="tooltip__nutrition__list__item"><span>Protein:</span>' + newFoodItem.nutrition.protein + 'g' + '</li>\
                                    </ul>\
                                    <hr>\
                                    <p class="tooltip__nutrition">Ingredients: </p>\
                                    <ul class="tooltip__ingredient__list">\
                                        <li class="tooltip__ingredient__list__item">' + ingredientArray[0] + '</li>\
                                        <li class="tooltip__ingredient__list__item">' + (ingredientArray[1] !== undefined ? ingredientArray[1] : " ")  + '</li>\
                                        <li class="tooltip__ingredient__list__item">' + (ingredientArray[2] !== undefined ? ingredientArray[2] : " ") + '</li>\
                                        <li class="tooltip__ingredient__list__item">' + (ingredientArray[3] !== undefined ? ingredientArray[3] : " ") + '</li>\
                                    </ul>\
                                </div>\
                                <div id="myModalLunch" class="modalLunch">\
                                  <!-- Modal content -->\
                                <div class="modal-content">\
                                    <div class="modal-header">\
                                      <span class="closeLunch">&times;</span>\
                                      <div class="modal-header-flex">\
                                        <h2>' + newFoodItem.name + '</h2>\
                                        <div class="modal-header-information">\
                                            <p>Time to cook: ' +  newFoodItem.time_to_make + '</p>\
                                            <p>Servings: ' + newFoodItem.nutrition.serving_size + '</p> \
                                        </div>\
                                      </div>\
                                    </div>\
                                    <div class="modal-body">\
                                      <div class="modal-body-ingredients">\
                                        <p>Ingredients:</p>\
                                        <div class="modal__ingredient__list__container">\
                                          <div class="food__grid__item">\
                                                <div class="food__item__image">\
                                                    <img class="food__image" src="' + ingredientModalArray[0].image + '">\
                                                </div>\
                                                <div class="food__item__info">\
                                                    <p class="tooltip__name">' + ingredientModalArray[0].name + '</p>\
                                                    <p class="food__info">' + ingredientModalArray[0].amount + " " + ingredientModalArray[0].unit + '</p>\
                                                </div>\
                                          </div>\
                                          <div class="food__grid__item">\
                                                <div class="food__item__image">\
                                                    <img class="food__image" src="' + (ingredientModalArray[1] !== undefined ? ingredientModalArray[1].image : " ") + '">\
                                                </div>\
                                                <div class="food__item__info">\
                                                    <p class="tooltip__name">' + (ingredientModalArray[1] !== undefined ? ingredientModalArray[1].name : " ") + '</p>\
                                                    <p class="food__info">' + (ingredientModalArray[1] !== undefined ? ingredientModalArray[1].amount + " " + ingredientModalArray[1].unit : " ") + '</p>\
                                                </div>\
                                          </div>\
                                          <div class="food__grid__item">\
                                                <div class="food__item__image">\
                                                    <img class="food__image" src="' + (ingredientModalArray[2] !== undefined ? ingredientModalArray[2].image : " ") + '">\
                                                </div>\
                                                <div class="food__item__info">\
                                                    <p class="tooltip__name">' + (ingredientModalArray[2] !== undefined ? ingredientModalArray[2].name : " ") + '</p>\
                                                    <p class="food__info">' + (ingredientModalArray[2] !== undefined ? ingredientModalArray[2].amount + " " + ingredientModalArray[2].unit : " ") + '</p>\
                                                </div>\
                                          </div>\
                                          <div class="food__grid__item">\
                                                <div class="food__item__image">\
                                                    <img class="food__image" src="' + (ingredientModalArray[3] !== undefined ? ingredientModalArray[3].image : " ") + '">\
                                                </div>\
                                                <div class="food__item__info">\
                                                    <p class="tooltip__name">' + (ingredientModalArray[3] !== undefined ? ingredientModalArray[3].name : " ") + '</p>\
                                                    <p class="food__info">' + (ingredientModalArray[3] !== undefined ? ingredientModalArray[3].amount + " " + ingredientModalArray[3].unit : " ") + '</p>\
                                                </div>\
                                          </div>\
                                        </div>\
                                      </div>\
                                      <div class="modal-body-nutrition">\
                                          <p>Nutrition:</p>\
                                          <div class="modal__nutrition">\
                                            <div>\
                                                <ul class="modal__nutrition__list">\
                                                    <li class="tooltip__nutrition__list__item"><span>Calories:</span> ' + newFoodItem.nutrition.calories + '</li>\
                                                    <li class="tooltip__nutrition__list__item"><span>Carbs:</span> ' + newFoodItem.nutrition.carbs + 'g' + '</li>\
                                                    <li class="tooltip__nutrition__list__item"><span>Fat:</span> ' + newFoodItem.nutrition.fat + 'g' + '</li>\
                                                    <li class="tooltip__nutrition__list__item"><span>Protein:</span> ' + newFoodItem.nutrition.protein + 'g' + '</li>\
                                                </ul>\
                                                <ul class="modal__nutrition__list">\
                                                    <li><span>Fiber:</span> ' + newFoodItem.nutrition.fiber + 'g' + '</li>\
                                                    <li><span>Sodium:</span> ' + newFoodItem.nutrition.sodium + 'mg' + '</li>\
                                                    <li><span>Cholesterol:</span> ' + newFoodItem.nutrition.cholesterol + 'mg' + '</li>\
                                                    <li><span>Sugar:</span> ' + newFoodItem.nutrition.sugar + 'g' + '</li>\
                                                </ul>\
                                            </div>\
                                          </div>\
                                      </div>\
                                    </div>\
                                    <div class="modal__instructions">\
                                        <p class="modal__instructions__header">Instructions:</p>\
                                        <p class="modal__instructions__instructions">' + newFoodItem.instructions + '</p>\
                                    </div>\
                                  </div>\
                                </div>\
                                <div class="food__item__image">\
                                    <img class="food__image" src="' + newFoodItem.image + '">\
                                </div>\
                                <div class="food__item__info">\
                                    <p class="lunch__name">' + newFoodItem.name + '</p>\
                                    <p class="food__info">Servings: ' + newFoodItem.nutrition.serving_size + '</p>\
                                </div>\
                                <div class="food__item__buttons">\
                                    <div class="refreshContainer">\
                                       <i class="fa fa-sync-alt fa-lg myRefreshButtonLunch"></i> \
                                    </div>\
                                    <i class="fa fa-info-circle fa-lg myBtnBtnLunch"></i>\
                                </div>\
                            </div>';

      outerParent.append(randomFoodItem);
      //add new item to lunchArr
      lunchArr.push(newFoodItem);
      //fix the total calorie count
      lunchCalories -= currentItemCalories;
      lunchCalories += newFoodItem.nutrition.calories;
      lunchCalorieSpan.text(lunchCalories);
      calorieTotal -= currentItemCaloriesNum;
      calorieTotal += newFoodItem.nutrition.calories;
      calorieCountSpan.text(calorieTotal);
      //reset print functionality
      var printSection = $(".food_print");
      printCounter = 0;
      printSection.remove();
}

function breakfastRefresh() {
      var foodName = $(this).closest(".food__grid__item").find(".food__item__info").find(".breakfast__name").text();
      var parent = $(this).closest(".food__grid__item");
      var outerParent = $(this).closest(".breakfast__items__container");
      var calorieTotal = parseInt(calorieCountSpan.text());
      var currentItemCalories = $(this).closest(".food__grid__item").find(".tooltiptext").find(".tooltip__nutrition__list").find(".item1").find(".currentCal").text();
      var currentItemCaloriesNum = parseInt(currentItemCalories);
      //remove parent item and remove it from breakfast Arr
      var counter = 0;
      breakfastArr.forEach(function(item) {
         if (item.name == foodName && counter < 1) {
            breakfastArr.splice($.inArray(item, breakfastArr), 1);
            counter++;
         }
      });
      parent.remove();
      //find random item in extraBreakfastArray and add HTML
      var random = Math.floor(Math.random() * 28);
      var ingredientArray = [];
      var ingredientModalArray = [];
      var newFoodItem = extraBreakfastArr[random];
      var breakfastIngreObj = newFoodItem.ingredients;
      Object.keys(breakfastIngreObj).forEach(function(key) {
         var ingKey = breakfastIngreObj[key];
         var ingKeyName = ingKey.name;
         if (ingKeyName !== undefined) {
            ingredientArray.push("" + ingKey.amount + " " + ingKey.unit + " " + ingKey.name);
            ingredientModalArray.push(ingKey);
         } else {
            ingredientArray.push(" ");
            ingredientModalArray.push(" ");
         };
      });
      var randomFoodItem = '<div class="food__grid__item tooltip">\
                                <div class="tooltiptext">\
                                    <p class="tooltip__name">' + newFoodItem.name + '</p>\
                                    <p class="cook__time">Cook time: ' + newFoodItem.time_to_make + '</p>\
                                    <hr>\
                                    <p class="tooltip__nutrition">Nutrition info: </p>\
                                    <ul class="tooltip__nutrition__list">\
                                        <li class="tooltip__nutrition__list__item item1"><span>Calories:</span> <span class="currentCal">' +  newFoodItem.nutrition.calories + '</span></li>\
                                        <li class="tooltip__nutrition__list__item"><span>Carbs:</span>' + newFoodItem.nutrition.carbs + 'g' + '</li>\
                                        <li class="tooltip__nutrition__list__item"><span>Fat:</span>' + newFoodItem.nutrition.fat + 'g' + '</li>\
                                        <li class="tooltip__nutrition__list__item"><span>Protein:</span>' + newFoodItem.nutrition.protein + 'g' + '</li>\
                                    </ul>\
                                    <hr>\
                                    <p class="tooltip__nutrition">Ingredients: </p>\
                                    <ul class="tooltip__ingredient__list">\
                                        <li class="tooltip__ingredient__list__item">' + ingredientArray[0] + '</li>\
                                        <li class="tooltip__ingredient__list__item">' + (ingredientArray[1] !== undefined ? ingredientArray[1] : " ")  + '</li>\
                                        <li class="tooltip__ingredient__list__item">' + (ingredientArray[2] !== undefined ? ingredientArray[2] : " ") + '</li>\
                                        <li class="tooltip__ingredient__list__item">' + (ingredientArray[3] !== undefined ? ingredientArray[3] : " ") + '</li>\
                                    </ul>\
                                </div>\
                                <div id="myModalBreakfast" class="modalBreakfast">\
                                  <!-- Modal content -->\
                                <div class="modal-content">\
                                    <div class="modal-header">\
                                      <span class="closeBreakfast">&times;</span>\
                                      <div class="modal-header-flex">\
                                        <h2>' + newFoodItem.name + '</h2>\
                                        <div class="modal-header-information">\
                                            <p>Time to cook: ' +  newFoodItem.time_to_make + '</p>\
                                            <p>Servings: ' + newFoodItem.nutrition.serving_size + '</p> \
                                        </div>\
                                      </div>\
                                    </div>\
                                    <div class="modal-body">\
                                      <div class="modal-body-ingredients">\
                                        <p>Ingredients:</p>\
                                        <div class="modal__ingredient__list__container">\
                                          <div class="food__grid__item">\
                                                <div class="food__item__image">\
                                                    <img class="food__image" src="' + ingredientModalArray[0].image + '">\
                                                </div>\
                                                <div class="food__item__info">\
                                                    <p class="tooltip__name">' + ingredientModalArray[0].name + '</p>\
                                                    <p class="food__info">' + ingredientModalArray[0].amount + " " + ingredientModalArray[0].unit + '</p>\
                                                </div>\
                                          </div>\
                                          <div class="food__grid__item">\
                                                <div class="food__item__image">\
                                                    <img class="food__image" src="' + (ingredientModalArray[1] !== undefined ? ingredientModalArray[1].image : " ") + '">\
                                                </div>\
                                                <div class="food__item__info">\
                                                    <p class="tooltip__name">' + (ingredientModalArray[1] !== undefined ? ingredientModalArray[1].name : " ") + '</p>\
                                                    <p class="food__info">' + (ingredientModalArray[1] !== undefined ? ingredientModalArray[1].amount + " " + ingredientModalArray[1].unit : " ") + '</p>\
                                                </div>\
                                          </div>\
                                          <div class="food__grid__item">\
                                                <div class="food__item__image">\
                                                    <img class="food__image" src="' + (ingredientModalArray[2] !== undefined ? ingredientModalArray[2].image : " ") + '">\
                                                </div>\
                                                <div class="food__item__info">\
                                                    <p class="tooltip__name">' + (ingredientModalArray[2] !== undefined ? ingredientModalArray[2].name : " ") + '</p>\
                                                    <p class="food__info">' + (ingredientModalArray[2] !== undefined ? ingredientModalArray[2].amount + " " + ingredientModalArray[2].unit : " ") + '</p>\
                                                </div>\
                                          </div>\
                                          <div class="food__grid__item">\
                                                <div class="food__item__image">\
                                                    <img class="food__image" src="' + (ingredientModalArray[3] !== undefined ? ingredientModalArray[3].image : " ") + '">\
                                                </div>\
                                                <div class="food__item__info">\
                                                    <p class="tooltip__name">' + (ingredientModalArray[3] !== undefined ? ingredientModalArray[3].name : " ") + '</p>\
                                                    <p class="food__info">' + (ingredientModalArray[3] !== undefined ? ingredientModalArray[3].amount + " " + ingredientModalArray[3].unit : " ") + '</p>\
                                                </div>\
                                          </div>\
                                        </div>\
                                      </div>\
                                      <div class="modal-body-nutrition">\
                                          <p>Nutrition:</p>\
                                          <div class="modal__nutrition">\
                                            <div>\
                                                <ul class="modal__nutrition__list">\
                                                    <li class="tooltip__nutrition__list__item"><span>Calories:</span> ' + newFoodItem.nutrition.calories + '</li>\
                                                    <li class="tooltip__nutrition__list__item"><span>Carbs:</span> ' + newFoodItem.nutrition.carbs + 'g' + '</li>\
                                                    <li class="tooltip__nutrition__list__item"><span>Fat:</span> ' + newFoodItem.nutrition.fat + 'g' + '</li>\
                                                    <li class="tooltip__nutrition__list__item"><span>Protein:</span> ' + newFoodItem.nutrition.protein + 'g' + '</li>\
                                                </ul>\
                                                <ul class="modal__nutrition__list">\
                                                    <li><span>Fiber:</span> ' + newFoodItem.nutrition.fiber + 'g' + '</li>\
                                                    <li><span>Sodium:</span> ' + newFoodItem.nutrition.sodium + 'mg' + '</li>\
                                                    <li><span>Cholesterol:</span> ' + newFoodItem.nutrition.cholesterol + 'mg' + '</li>\
                                                    <li><span>Sugar:</span> ' + newFoodItem.nutrition.sugar + 'g' + '</li>\
                                                </ul>\
                                            </div>\
                                          </div>\
                                      </div>\
                                    </div>\
                                    <div class="modal__instructions">\
                                        <p class="modal__instructions__header">Instructions:</p>\
                                        <p class="modal__instructions__instructions">' + newFoodItem.instructions + '</p>\
                                    </div>\
                                  </div>\
                                </div>\
                                <div class="food__item__image">\
                                    <img class="food__image" src="' + newFoodItem.image + '">\
                                </div>\
                                <div class="food__item__info">\
                                    <p class="breakfast__name">' + newFoodItem.name + '</p>\
                                    <p class="food__info">Servings: ' + newFoodItem.nutrition.serving_size + '</p>\
                                </div>\
                                <div class="food__item__buttons">\
                                    <div class="refreshContainer">\
                                       <i class="fa fa-sync-alt fa-lg myRefreshButtonBreakfast"></i> \
                                    </div>\
                                    <i class="fa fa-info-circle fa-lg myBtnBtnBreakfast"></i>\
                                </div>\
                            </div>';

      outerParent.append(randomFoodItem);
      //add new item to breakfastArr
      breakfastArr.push(newFoodItem);
      //fix the total calorie count
      breakfastCalories -= currentItemCalories;
      breakfastCalories += newFoodItem.nutrition.calories;
      breakfastCalorieSpan.text(breakfastCalories);
      calorieTotal -= currentItemCaloriesNum;
      calorieTotal += newFoodItem.nutrition.calories;
      calorieCountSpan.text(calorieTotal);
      //reset printCounter and delete print divs
      var printSection = $(".food_print");
      printCounter = 0;
      printSection.remove();
}

function dinnerRefresh() {
      var foodName = $(this).closest(".food__grid__item").find(".food__item__info").find(".dinner__name").text();
      var parent = $(this).closest(".food__grid__item");
      var outerParent = $(this).closest(".dinner__items__container");
      var calorieTotal = parseInt(calorieCountSpan.text());
      var currentItemCalories = $(this).closest(".food__grid__item").find(".tooltiptext").find(".tooltip__nutrition__list").find(".item1").find(".currentCal").text();
      var currentItemCaloriesNum = parseInt(currentItemCalories);
      //remove parent item and remove it from dinner Arr
      var counter = 0;
      dinnerArr.forEach(function(item) {
         if (item.name == foodName && counter < 1) {
            dinnerArr.splice($.inArray(item, dinnerArr), 1);
            counter++;
         }
      });
      parent.remove();
      //find random item in extradinnerArray and add HTML
      var random = Math.floor(Math.random() * 28);
      var ingredientArray = [];
      var ingredientModalArray = [];
      var newFoodItem = extraDinnerArr[random];
      var dinnerIngreObj = newFoodItem.ingredients;
      Object.keys(dinnerIngreObj).forEach(function(key) {
         var ingKey = dinnerIngreObj[key];
         var ingKeyName = ingKey.name;
         if (ingKeyName !== undefined) {
            ingredientArray.push("" + ingKey.amount + " " + ingKey.unit + " " + ingKey.name);
            ingredientModalArray.push(ingKey);
         } else {
            ingredientArray.push(" ");
            ingredientModalArray.push(" ");
         };
      });
      var randomFoodItem = '<div class="food__grid__item tooltip">\
                                <div class="tooltiptext">\
                                    <p class="tooltip__name">' + newFoodItem.name + '</p>\
                                    <p class="cook__time">Cook time: ' + newFoodItem.time_to_make + '</p>\
                                    <hr>\
                                    <p class="tooltip__nutrition">Nutrition info: </p>\
                                    <ul class="tooltip__nutrition__list">\
                                        <li class="tooltip__nutrition__list__item item1"><span>Calories:</span> <span class="currentCal">' +  newFoodItem.nutrition.calories + '</span></li>\
                                        <li class="tooltip__nutrition__list__item"><span>Carbs:</span>' + newFoodItem.nutrition.carbs + 'g' + '</li>\
                                        <li class="tooltip__nutrition__list__item"><span>Fat:</span>' + newFoodItem.nutrition.fat + 'g' + '</li>\
                                        <li class="tooltip__nutrition__list__item"><span>Protein:</span>' + newFoodItem.nutrition.protein + 'g' + '</li>\
                                    </ul>\
                                    <hr>\
                                    <p class="tooltip__nutrition">Ingredients: </p>\
                                    <ul class="tooltip__ingredient__list">\
                                        <li class="tooltip__ingredient__list__item">' + ingredientArray[0] + '</li>\
                                        <li class="tooltip__ingredient__list__item">' + (ingredientArray[1] !== undefined ? ingredientArray[1] : " ")  + '</li>\
                                        <li class="tooltip__ingredient__list__item">' + (ingredientArray[2] !== undefined ? ingredientArray[2] : " ") + '</li>\
                                        <li class="tooltip__ingredient__list__item">' + (ingredientArray[3] !== undefined ? ingredientArray[3] : " ") + '</li>\
                                    </ul>\
                                </div>\
                                <div id="myModalDinner" class="modalDinner">\
                                  <!-- Modal content -->\
                                <div class="modal-content">\
                                    <div class="modal-header">\
                                      <span class="closeDinner">&times;</span>\
                                      <div class="modal-header-flex">\
                                        <h2>' + newFoodItem.name + '</h2>\
                                        <div class="modal-header-information">\
                                            <p>Time to cook: ' +  newFoodItem.time_to_make + '</p>\
                                            <p>Servings: ' + newFoodItem.nutrition.serving_size + '</p> \
                                        </div>\
                                      </div>\
                                    </div>\
                                    <div class="modal-body">\
                                      <div class="modal-body-ingredients">\
                                        <p>Ingredients:</p>\
                                        <div class="modal__ingredient__list__container">\
                                          <div class="food__grid__item">\
                                                <div class="food__item__image">\
                                                    <img class="food__image" src="' + ingredientModalArray[0].image + '">\
                                                </div>\
                                                <div class="food__item__info">\
                                                    <p class="tooltip__name">' + ingredientModalArray[0].name + '</p>\
                                                    <p class="food__info">' + ingredientModalArray[0].amount + " " + ingredientModalArray[0].unit + '</p>\
                                                </div>\
                                          </div>\
                                          <div class="food__grid__item">\
                                                <div class="food__item__image">\
                                                    <img class="food__image" src="' + (ingredientModalArray[1] !== undefined ? ingredientModalArray[1].image : " ") + '">\
                                                </div>\
                                                <div class="food__item__info">\
                                                    <p class="tooltip__name">' + (ingredientModalArray[1] !== undefined ? ingredientModalArray[1].name : " ") + '</p>\
                                                    <p class="food__info">' + (ingredientModalArray[1] !== undefined ? ingredientModalArray[1].amount + " " + ingredientModalArray[1].unit : " ") + '</p>\
                                                </div>\
                                          </div>\
                                          <div class="food__grid__item">\
                                                <div class="food__item__image">\
                                                    <img class="food__image" src="' + (ingredientModalArray[2] !== undefined ? ingredientModalArray[2].image : " ") + '">\
                                                </div>\
                                                <div class="food__item__info">\
                                                    <p class="tooltip__name">' + (ingredientModalArray[2] !== undefined ? ingredientModalArray[2].name : " ") + '</p>\
                                                    <p class="food__info">' + (ingredientModalArray[2] !== undefined ? ingredientModalArray[2].amount + " " + ingredientModalArray[2].unit : " ") + '</p>\
                                                </div>\
                                          </div>\
                                          <div class="food__grid__item">\
                                                <div class="food__item__image">\
                                                    <img class="food__image" src="' + (ingredientModalArray[3] !== undefined ? ingredientModalArray[3].image : " ") + '">\
                                                </div>\
                                                <div class="food__item__info">\
                                                    <p class="tooltip__name">' + (ingredientModalArray[3] !== undefined ? ingredientModalArray[3].name : " ") + '</p>\
                                                    <p class="food__info">' + (ingredientModalArray[3] !== undefined ? ingredientModalArray[3].amount + " " + ingredientModalArray[3].unit : " ") + '</p>\
                                                </div>\
                                          </div>\
                                        </div>\
                                      </div>\
                                      <div class="modal-body-nutrition">\
                                          <p>Nutrition:</p>\
                                          <div class="modal__nutrition">\
                                            <div>\
                                                <ul class="modal__nutrition__list">\
                                                    <li class="tooltip__nutrition__list__item"><span>Calories:</span> ' + newFoodItem.nutrition.calories + '</li>\
                                                    <li class="tooltip__nutrition__list__item"><span>Carbs:</span> ' + newFoodItem.nutrition.carbs + 'g' + '</li>\
                                                    <li class="tooltip__nutrition__list__item"><span>Fat:</span> ' + newFoodItem.nutrition.fat + 'g' + '</li>\
                                                    <li class="tooltip__nutrition__list__item"><span>Protein:</span> ' + newFoodItem.nutrition.protein + 'g' + '</li>\
                                                </ul>\
                                                <ul class="modal__nutrition__list">\
                                                    <li><span>Fiber:</span> ' + newFoodItem.nutrition.fiber + 'g' + '</li>\
                                                    <li><span>Sodium:</span> ' + newFoodItem.nutrition.sodium + 'mg' + '</li>\
                                                    <li><span>Cholesterol:</span> ' + newFoodItem.nutrition.cholesterol + 'mg' + '</li>\
                                                    <li><span>Sugar:</span> ' + newFoodItem.nutrition.sugar + 'g' + '</li>\
                                                </ul>\
                                            </div>\
                                          </div>\
                                      </div>\
                                    </div>\
                                    <div class="modal__instructions">\
                                        <p class="modal__instructions__header">Instructions:</p>\
                                        <p class="modal__instructions__instructions">' + newFoodItem.instructions + '</p>\
                                    </div>\
                                  </div>\
                                </div>\
                                <div class="food__item__image">\
                                    <img class="food__image" src="' + newFoodItem.image + '">\
                                </div>\
                                <div class="food__item__info">\
                                    <p class="dinner__name">' + newFoodItem.name + '</p>\
                                    <p class="food__info">Servings: ' + newFoodItem.nutrition.serving_size + '</p>\
                                </div>\
                                <div class="food__item__buttons">\
                                    <div class="refreshContainer">\
                                       <i class="fa fa-sync-alt fa-lg myRefreshButtonDinner"></i> \
                                    </div>\
                                    <i class="fa fa-info-circle fa-lg myBtnBtnDinner"></i>\
                                </div>\
                            </div>';

      outerParent.append(randomFoodItem);
      //add new item to dinnerArr
      dinnerArr.push(newFoodItem);
      //fix the total calorie count
      dinnerCalories -= currentItemCalories;
      dinnerCalories += newFoodItem.nutrition.calories;
      dinnerCalorieSpan.text(dinnerCalories);
      calorieTotal -= currentItemCaloriesNum;
      calorieTotal += newFoodItem.nutrition.calories;
      calorieCountSpan.text(calorieTotal);
      //reset print functionality
      var printSection = $(".food_print");
      printCounter = 0;
      printSection.remove();
}

function generatePrint() {
   var outsideContainer = $(".outside__print__container");
   if (printCounter < 1) {
      //generating foundations for print divs
      var printDivs = '\
      <div class="food_print print">\
        <div class="food__grid__items__print">\
            <div class="nav__logo print" style="margin-bottom: 30px; margin-top: 30px;">\
               <h2><a href="/" style="text-decoration:none; color: black;">cinch</a></h4>\
            </div>\
            <div class="food__breakfast__print">\
                <p class="meal__name"><strong>Breakfast</strong></p>\
                <p class="meal__calories">Calories: ' + breakfastCalories + '</p>\
                <div class="breakfast__print__items">\
                </div>\
                \
            </div>\
            <hr>\
            <div class="food__lunch__print">\
                <p class="meal__name"><strong>Lunch</strong></p>\
                <p class="meal__calories">Calories: ' + lunchCalories + '</p>\
                <div class="lunch__print__items">\
                </div>\
                \
            </div>\
            <hr>\
            <div class="food__dinner__print">\
                <p class="meal__name"><strong>Dinner</strong></p>\
                <p class="meal__calories">Calories: ' + dinnerCalories + '</p>\
                <div class="dinner__print__items">\
                </div>\
                \
            </div>\
        </div>\
      </div>'
      //appending the foundation to the page
      outsideContainer.append(printDivs);
      //looping through breakfastArr and appending new divs to foundation
      var breakfastPrintItems = $(".breakfast__print__items");
      breakfastArr.forEach(function(item) {
         var ingredientArray = [];
         var foodObj = item.ingredients;
         Object.keys(foodObj).forEach(function(key) {
            var ingKey = foodObj[key];
            var ingKeyName = ingKey.name;
            if (ingKeyName !== undefined) {
               ingredientArray.push("" + ingKey.amount + " " + ingKey.unit + " " + ingKey.name);
            } else {
               ingredientArray.push(" ");
            };
         });
         var newItem = '\
          <div class="food__grid__item tooltip">\
             <div class="tooltiptext">\
                 <p class="tooltip__name">' + item.name + '</p>\
                 <p class="cook__time">Cook time: ' + item.time_to_make + '</p>\
                 <hr>\
                 <p class="tooltip__nutrition">Nutrition info: </p>\
                 <ul class="tooltip__nutrition__list">\
                     <li class="tooltip__nutrition__list__item"><span>Calories:</span> ' + item.nutrition.calories + '</li>\
                     <li class="tooltip__nutrition__list__item"><span>Carbs:</span> ' + item.nutrition.carbs + 'g' + '</li>\
                     <li class="tooltip__nutrition__list__item"><span>Fat:</span> ' + item.nutrition.fat + 'g' + '</li>\
                     <li class="tooltip__nutrition__list__item"><span>Protein:</span> ' + item.nutrition.protein + 'g' + '</li>\
                 </ul>\
                 <hr>\
                 <p class="tooltip__nutrition">Ingredients: </p>\
                 <ul class="tooltip__ingredient__list">\
                     <li class="tooltip__ingredient__list__item">' + ingredientArray[0] + '</li>\
                     <li class="tooltip__ingredient__list__item">' + (ingredientArray[1] !== undefined ? ingredientArray[1] : " ")  + '</li>\
                     <li class="tooltip__ingredient__list__item">' + (ingredientArray[2] !== undefined ? ingredientArray[2] : " ") + '</li>\
                     <li class="tooltip__ingredient__list__item">' + (ingredientArray[3] !== undefined ? ingredientArray[3] : " ") + '</li>\
                 </ul>\
             </div>\
             <div class="food__item__image">\
                 <img class="food__image" src="' + item.image + '">\
             </div>\
             <div class="food__item__info">\
                 <p class="tooltip__name">' + item.name + '</p>\
                 <p class="food__info">Servings: ' + item.nutrition.serving_size + '</p>\
             </div>\
         </div>\
         <div class="food__item__ingredients">\
             <p class="print__heading">Ingredients: </p>\
             <ul class="print__ingredient__list">\
                 <li>' + ingredientArray[0] + '</li>\
                 <li>' + (ingredientArray[1] !== undefined ? ingredientArray[1] : " ")  + '</li>\
                 <li>' + (ingredientArray[2] !== undefined ? ingredientArray[2] : " ") + '</li>\
                 <li>' + (ingredientArray[3] !== undefined ? ingredientArray[3] : " ") + '</li>\
             </ul>\
             <p class="print__heading">Instructions:</p>\
             <p>' + item.instructions + '</p>\
         </div>'
         breakfastPrintItems.append(newItem);
      });
      //looping through lunchArr and appending new divs to foundation
      var lunchPrintItems = $(".lunch__print__items");
      lunchArr.forEach(function(item) {
         var ingredientArray = [];
         var foodObj = item.ingredients;
         Object.keys(foodObj).forEach(function(key) {
            var ingKey = foodObj[key];
            var ingKeyName = ingKey.name;
            if (ingKeyName !== undefined) {
               ingredientArray.push("" + ingKey.amount + " " + ingKey.unit + " " + ingKey.name);
            } else {
               ingredientArray.push(" ");
            };
         });
         var newItem = '\
          <div class="food__grid__item tooltip">\
             <div class="tooltiptext">\
                 <p class="tooltip__name">' + item.name + '</p>\
                 <p class="cook__time">Cook time: ' + item.time_to_make + '</p>\
                 <hr>\
                 <p class="tooltip__nutrition">Nutrition info: </p>\
                 <ul class="tooltip__nutrition__list">\
                     <li class="tooltip__nutrition__list__item"><span>Calories:</span> ' + item.nutrition.calories + '</li>\
                     <li class="tooltip__nutrition__list__item"><span>Carbs:</span> ' + item.nutrition.carbs + 'g' + '</li>\
                     <li class="tooltip__nutrition__list__item"><span>Fat:</span> ' + item.nutrition.fat + 'g' + '</li>\
                     <li class="tooltip__nutrition__list__item"><span>Protein:</span> ' + item.nutrition.protein + 'g' + '</li>\
                 </ul>\
                 <hr>\
                 <p class="tooltip__nutrition">Ingredients: </p>\
                 <ul class="tooltip__ingredient__list">\
                     <li class="tooltip__ingredient__list__item">' + ingredientArray[0] + '</li>\
                     <li class="tooltip__ingredient__list__item">' + (ingredientArray[1] !== undefined ? ingredientArray[1] : " ")  + '</li>\
                     <li class="tooltip__ingredient__list__item">' + (ingredientArray[2] !== undefined ? ingredientArray[2] : " ") + '</li>\
                     <li class="tooltip__ingredient__list__item">' + (ingredientArray[3] !== undefined ? ingredientArray[3] : " ") + '</li>\
                 </ul>\
             </div>\
             <div class="food__item__image">\
                 <img class="food__image" src="' + item.image + '">\
             </div>\
             <div class="food__item__info">\
                 <p class="tooltip__name">' + item.name + '</p>\
                 <p class="food__info">Servings: ' + item.nutrition.serving_size + '</p>\
             </div>\
         </div>\
         <div class="food__item__ingredients">\
             <p class="print__heading">Ingredients: </p>\
             <ul class="print__ingredient__list">\
                 <li>' + ingredientArray[0] + '</li>\
                 <li>' + (ingredientArray[1] !== undefined ? ingredientArray[1] : " ")  + '</li>\
                 <li>' + (ingredientArray[2] !== undefined ? ingredientArray[2] : " ") + '</li>\
                 <li>' + (ingredientArray[3] !== undefined ? ingredientArray[3] : " ") + '</li>\
             </ul>\
             <p class="print__heading">Instructions:</p>\
             <p>' + item.instructions + '</p>\
         </div>'
         lunchPrintItems.append(newItem);
      });
      //looping through dinnerArr and appending new divs to foundation
      var dinnerPrintItems = $(".dinner__print__items");
      dinnerArr.forEach(function(item){
         var ingredientArray = [];
         var foodObj = item.ingredients;
         Object.keys(foodObj).forEach(function(key) {
            var ingKey = foodObj[key];
            var ingKeyName = ingKey.name;
            if (ingKeyName !== undefined) {
               ingredientArray.push("" + ingKey.amount + " " + ingKey.unit + " " + ingKey.name);
            } else {
               ingredientArray.push(" ");
            };
         });
         var newItem = '\
          <div class="food__grid__item tooltip">\
             <div class="tooltiptext">\
                 <p class="tooltip__name">' + item.name + '</p>\
                 <p class="cook__time">Cook time: ' + item.time_to_make + '</p>\
                 <hr>\
                 <p class="tooltip__nutrition">Nutrition info: </p>\
                 <ul class="tooltip__nutrition__list">\
                     <li class="tooltip__nutrition__list__item"><span>Calories:</span> ' + item.nutrition.calories + '</li>\
                     <li class="tooltip__nutrition__list__item"><span>Carbs:</span> ' + item.nutrition.carbs + 'g' + '</li>\
                     <li class="tooltip__nutrition__list__item"><span>Fat:</span> ' + item.nutrition.fat + 'g' + '</li>\
                     <li class="tooltip__nutrition__list__item"><span>Protein:</span> ' + item.nutrition.protein + 'g' + '</li>\
                 </ul>\
                 <hr>\
                 <p class="tooltip__nutrition">Ingredients: </p>\
                 <ul class="tooltip__ingredient__list">\
                     <li class="tooltip__ingredient__list__item">' + ingredientArray[0] + '</li>\
                     <li class="tooltip__ingredient__list__item">' + (ingredientArray[1] !== undefined ? ingredientArray[1] : " ")  + '</li>\
                     <li class="tooltip__ingredient__list__item">' + (ingredientArray[2] !== undefined ? ingredientArray[2] : " ") + '</li>\
                     <li class="tooltip__ingredient__list__item">' + (ingredientArray[3] !== undefined ? ingredientArray[3] : " ") + '</li>\
                 </ul>\
             </div>\
             <div class="food__item__image">\
                 <img class="food__image" src="' + item.image + '">\
             </div>\
             <div class="food__item__info">\
                 <p class="tooltip__name">' + item.name + '</p>\
                 <p class="food__info">Servings: ' + item.nutrition.serving_size + '</p>\
             </div>\
         </div>\
         <div class="food__item__ingredients">\
             <p class="print__heading">Ingredients: </p>\
             <ul class="print__ingredient__list">\
                 <li>' + ingredientArray[0] + '</li>\
                 <li>' + (ingredientArray[1] !== undefined ? ingredientArray[1] : " ")  + '</li>\
                 <li>' + (ingredientArray[2] !== undefined ? ingredientArray[2] : " ") + '</li>\
                 <li>' + (ingredientArray[3] !== undefined ? ingredientArray[3] : " ") + '</li>\
             </ul>\
             <p class="print__heading">Instructions:</p>\
             <p>' + item.instructions + '</p>\
         </div>'
         dinnerPrintItems.append(newItem);
      });
      printCounter++;
   }
   //printing the window after divs are added
   window.print();
}

amazonButton.on("click", function() {

   var ingredientList =
   {
     "ingredients": [

         ]
   }

   //generating amazon links

   breakfastArr.forEach(function(item) {
    var ingredientObj = item.ingredients;
    Object.keys(ingredientObj).forEach(function(key) {
        var ingKey = ingredientObj[key];
        var ingKeyName = ingKey.name;
        if (ingKeyName !== undefined) {
            //define recipe item
            var breakObj = {
                "name": ingKey.name,
                "quantityList": [
                  {
                      "unit": ingKey.unit,
                      "amount": ingKey.amount
                  }
               ]
            }
            //push it into ingredients
            ingredientList.ingredients.push(breakObj);
        }
    })
   });

   lunchArr.forEach(function(item) {
    var ingredientObj = item.ingredients;
    Object.keys(ingredientObj).forEach(function(key) {
        var ingKey = ingredientObj[key];
        var ingKeyName = ingKey.name;
        if (ingKeyName !== undefined) {
            //define recipe item
            var breakObj = {
                "name": ingKey.name,
                "quantityList": [
                  {
                      "unit": ingKey.unit,
                      "amount": ingKey.amount
                  }
               ]
            }
            //push it into ingredients
            ingredientList.ingredients.push(breakObj);
        }
    })
   });

   dinnerArr.forEach(function(item) {
    var ingredientObj = item.ingredients;
    Object.keys(ingredientObj).forEach(function(key) {
        var ingKey = ingredientObj[key];
        var ingKeyName = ingKey.name;
        if (ingKeyName !== undefined) {
            //define recipe item
            var breakObj = {
                "name": ingKey.name,
                "quantityList": [
                  {
                      "unit": ingKey.unit,
                      "amount": ingKey.amount
                  }
               ]
            }
            //push it into ingredients
            ingredientList.ingredients.push(breakObj);
        }
    })
   });
   amazonInput.val(JSON.stringify(ingredientList));
});

//onboarding shit




