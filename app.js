const http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var flash = require('connect-flash-plus');
var request = require("request");
var unirest = require("unirest");
var Food = require("./models/fooditem");
var Plan = require("./models/mealPlan");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
var methodOverride = require("method-override");
var MongoClient = require("mongodb").MongoClient;
var profileImgArray = ["/icons/profile_pics/1.PNG", "/icons/profile_pics/2.PNG", "/icons/profile_pics/3.PNG", "/icons/profile_pics/4.PNG", "/icons/profile_pics/5.PNG", "/icons/profile_pics/6.PNG"];
var descriptionArr = ["Makes model trains in free time (we think).", "Is afraid of flies and other flying creatures.", "Is so, so lost. It hurts to watch.", "Has a weird obsession with komodo dragons.", "Has a $1B net worth. Ask them for money.", "We ran out of things to put here."]
var pp = 0;
// //create server
// const server = http.createServer((req, res) => {
//   //Set the response HTTP header with HTTP status and Content type
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

//seedDB();
mongoose.connect(process.env.DATABASEURL, {dbName: 'food_app', useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//======================
//    PASSPORT CODE
//======================
app.use(require("express-session")({
	secret: "Something",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.get("/", function(req, res) {
    res.render("newhome.ejs");
});

app.get("/newhome", function(req, res) {
    res.render("newhome.ejs");
});

app.get("/newrecipe", async function(req, res) {

    var logged;
    var calorieCount = req.query.calorieCount;
    var mealInput = parseInt(req.query.mealInput);
    var dietInput = req.query.food;
    var goalPerMeal = (calorieCount / mealInput);
    var whichDiet = "diet." + dietInput;

    var breakfastGoal = goalPerMeal;
    var lunchGoal = goalPerMeal;
    var dinnerGoal = goalPerMeal;

    var extraBreakfast = 0;
    var extraLunch = 0;
    var extraDinner = 0;

    var breakfastArr = [];
    var lunchArr = [];
    var dinnerArr = [];

    var extraBreakfastArr = [];
    var extraLunchArr = [];
    var extraDinnerArr = [];

    //generating inital meal lists

    async function getBreakfastArr(){
                var breakfastQuery = {"breakfast": true, [whichDiet]: true};
                while (breakfastGoal >= 150) {
                    await new Promise((resolve, reject) => {
                        Food.count(breakfastQuery, function(err, count) {
                            if (err) {
                                console.log(err);
                            } else {
                        var random = Math.floor(Math.random() * count);
                        Food.findOne(breakfastQuery).skip(random).exec(
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    breakfastGoal -= result.nutrition.calories;
                                    breakfastArr.push(result);
                                    resolve();
                                }
                          });
                     }
                 });
            });
        }
    }

    async function getLunchArr(){
                var lunchQuery = {"lunch": true, [whichDiet]: true};
                while (lunchGoal >= 150) {
                    await new Promise((resolve, reject) => {
                        Food.count(lunchQuery, function(err, count) {
                            if (err) {
                                console.log(err);
                            } else {
                        var random = Math.floor(Math.random() * count);
                        Food.findOne(lunchQuery).skip(random).exec(
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    lunchGoal -= result.nutrition.calories;
                                    lunchArr.push(result);
                                    resolve();
                                }
                          });
                     }
                 });
            });
        }
    }

    async function getDinnerArr(){
                var dinnerQuery = {"dinner": true, [whichDiet]: true};
                while (dinnerGoal >= 150) {
                    await new Promise((resolve, reject) => {
                        Food.count(dinnerQuery, function(err, count) {
                            if (err) {
                                console.log(err);
                            } else {
                        var random = Math.floor(Math.random() * count);
                        Food.findOne(dinnerQuery).skip(random).exec(
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    dinnerGoal -= result.nutrition.calories;
                                    dinnerArr.push(result);
                                    resolve();
                                }
                          });
                     }
                 });
            });
        }
    }

    // generating extra recipes if user chooses to refresh one

    async function generateExtraBreakfast(){
                var breakfastQuery = {"breakfast": true, [whichDiet]: true};
                while (extraBreakfast <= 30) {
                    await new Promise((resolve, reject) => {
                        Food.count(breakfastQuery, function(err, count) {
                            if (err) {
                                console.log(err);
                            } else {
                        var random = Math.floor(Math.random() * count);
                        Food.findOne(breakfastQuery).skip(random).exec(
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    extraBreakfastArr.push(result);
                                    extraBreakfast += 1;
                                    resolve();
                                }
                          });
                     }
                 });
            });
        }
    }

    async function generateExtraLunch(){
                var lunchQuery = {"lunch": true, [whichDiet]: true};
                while (extraLunch <= 30) {
                    await new Promise((resolve, reject) => {
                        Food.count(lunchQuery, function(err, count) {
                            if (err) {
                                console.log(err);
                            } else {
                        var random = Math.floor(Math.random() * count);
                        Food.findOne(lunchQuery).skip(random).exec(
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    extraLunchArr.push(result);
                                    extraLunch += 1;
                                    resolve();
                                }
                          });
                     }
                 });
            });
        }
    }

    async function generateExtraDinner(){
                var dinnerQuery = {"dinner": true, [whichDiet]: true};
                while (extraDinner <= 30) {
                    await new Promise((resolve, reject) => {
                        Food.count(dinnerQuery, function(err, count) {
                            if (err) {
                                console.log(err);
                            } else {
                        var random = Math.floor(Math.random() * count);
                        Food.findOne(dinnerQuery).skip(random).exec(
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    extraDinnerArr.push(result);
                                    extraDinner += 1;
                                    resolve();
                                }
                          });
                     }
                 });
            });
        }
    }

    try {

        await getBreakfastArr();
        await getLunchArr();
        await getDinnerArr();

        await generateExtraBreakfast();
        await generateExtraLunch();
        await generateExtraDinner();

        var breakfastCalories = 0;
        var lunchCalories = 0;
        var dinnerCalories = 0;
        var totalCalories = 0;

       breakfastArr.forEach(function(item) {
           var calories = item.nutrition.calories;
           breakfastCalories += calories;
           totalCalories += calories;
       });
       lunchArr.forEach(function(item) {
           var calories = item.nutrition.calories;
           lunchCalories += calories;
           totalCalories += calories;
       });
       dinnerArr.forEach(function(item) {
           var calories = item.nutrition.calories;
           dinnerCalories += calories;
           totalCalories += calories;
       });

       console.log(totalCalories);


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

      if (req.user) {
          logged = "logged";
      } else {
          logged = "nonlogged";
      }

        res.render("newmealpage.ejs", { meal: mealInput, calories: calorieCount, diet: dietInput, totalCalories: totalCalories, breakfastArr: breakfastArr, lunchArr: lunchArr, dinnerArr: dinnerArr, breakfastCalories: breakfastCalories, lunchCalories: lunchCalories, dinnerCalories: dinnerCalories, ingredientList: ingredientList, extraBreakfastArr: extraBreakfastArr, extraLunchArr: extraLunchArr, extraDinnerArr: extraDinnerArr, logged: logged});
    } catch (e){
        res.json(e);
    }

});

app.get("/test", function(req, res) {
    res.render("test.ejs");
});

app.get("/how-it-works", function(req, res) {
    res.render("howitworks.ejs");
});

app.get("/about-us", function(req, res) {
    res.render("aboutus.ejs");
});

app.get("/contact", function(req, res) {
    res.render("contact.ejs");
});

app.get("/recipes", function(req, res) {
    MongoClient.connect('mongodb://localhost', function (err, client) {
        if (err) throw err;

        var db = client.db('food_app');

        db.collection("recipes").find({}).toArray(function(err, results) {
            if (err) {
                console.log(err);
            } else {
                client.close();
            }
        res.render("recipes.ejs", {recipes:results});
        })
    });
});

app.get("/recipes/new", function(req, res) {
    res.render("newrecipe.ejs");
});

app.get("/meal-plan", async function(req, res) {

    var calorieCount = req.query.calorieCount;
    var mealInput = parseInt(req.query.mealInput);
    var dietInput = req.query.food;
    var goalPerMeal = (calorieCount / mealInput);
    var whichDiet = "diet." + dietInput;

    var breakfastGoal = goalPerMeal;
    var lunchGoal = goalPerMeal;
    var dinnerGoal = goalPerMeal;

    var extraBreakfast = 0;
    var extraLunch = 0;
    var extraDinner = 0;

    var breakfastArr = [];
    var lunchArr = [];
    var dinnerArr = [];

    var extraBreakfastArr = [];
    var extraLunchArr = [];
    var extraDinnerArr = [];

    //generating inital meal lists

    async function getBreakfastArr(){
                var breakfastQuery = {"breakfast": true, [whichDiet]: true};
                while (breakfastGoal >= 150) {
                    await new Promise((resolve, reject) => {
                        Food.count(breakfastQuery, function(err, count) {
                            if (err) {
                                console.log(err);
                            } else {
                        var random = Math.floor(Math.random() * count);
                        Food.findOne(breakfastQuery).skip(random).exec(
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    breakfastGoal -= result.nutrition.calories;
                                    breakfastArr.push(result);
                                    resolve();
                                }
                          });
                     }
                 });
            });
        }
    }

    async function getLunchArr(){
                var lunchQuery = {"lunch": true, [whichDiet]: true};
                while (lunchGoal >= 150) {
                    await new Promise((resolve, reject) => {
                        Food.count(lunchQuery, function(err, count) {
                            if (err) {
                                console.log(err);
                            } else {
                        var random = Math.floor(Math.random() * count);
                        Food.findOne(lunchQuery).skip(random).exec(
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    lunchGoal -= result.nutrition.calories;
                                    lunchArr.push(result);
                                    resolve();
                                }
                          });
                     }
                 });
            });
        }
    }

    async function getDinnerArr(){
                var dinnerQuery = {"dinner": true, [whichDiet]: true};
                while (dinnerGoal >= 150) {
                    await new Promise((resolve, reject) => {
                        Food.count(dinnerQuery, function(err, count) {
                            if (err) {
                                console.log(err);
                            } else {
                        var random = Math.floor(Math.random() * count);
                        Food.findOne(dinnerQuery).skip(random).exec(
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    dinnerGoal -= result.nutrition.calories;
                                    dinnerArr.push(result);
                                    resolve();
                                }
                          });
                     }
                 });
            });
        }
    }

    // generating extra recipes if user chooses to refresh one

    async function generateExtraBreakfast(){
                var breakfastQuery = {"breakfast": true, [whichDiet]: true};
                while (extraBreakfast <= 30) {
                    await new Promise((resolve, reject) => {
                        Food.count(breakfastQuery, function(err, count) {
                            if (err) {
                                console.log(err);
                            } else {
                        var random = Math.floor(Math.random() * count);
                        Food.findOne(breakfastQuery).skip(random).exec(
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    extraBreakfastArr.push(result);
                                    extraBreakfast += 1;
                                    resolve();
                                }
                          });
                     }
                 });
            });
        }
    }

    async function generateExtraLunch(){
                var lunchQuery = {"lunch": true, [whichDiet]: true};
                while (extraLunch <= 30) {
                    await new Promise((resolve, reject) => {
                        Food.count(lunchQuery, function(err, count) {
                            if (err) {
                                console.log(err);
                            } else {
                        var random = Math.floor(Math.random() * count);
                        Food.findOne(lunchQuery).skip(random).exec(
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    extraLunchArr.push(result);
                                    extraLunch += 1;
                                    resolve();
                                }
                          });
                     }
                 });
            });
        }
    }

    async function generateExtraDinner(){
                var dinnerQuery = {"dinner": true, [whichDiet]: true};
                while (extraDinner <= 30) {
                    await new Promise((resolve, reject) => {
                        Food.count(dinnerQuery, function(err, count) {
                            if (err) {
                                console.log(err);
                            } else {
                        var random = Math.floor(Math.random() * count);
                        Food.findOne(dinnerQuery).skip(random).exec(
                            function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    extraDinnerArr.push(result);
                                    extraDinner += 1;
                                    resolve();
                                }
                          });
                     }
                 });
            });
        }
    }

    try {

        await getBreakfastArr();
        await getLunchArr();
        await getDinnerArr();

        await generateExtraBreakfast();
        await generateExtraLunch();
        await generateExtraDinner();

        var breakfastCalories = 0;
        var lunchCalories = 0;
        var dinnerCalories = 0;
        var totalCalories = 0;

       breakfastArr.forEach(function(item) {
           var calories = item.nutrition.calories;
           breakfastCalories += calories;
           totalCalories += calories;
       });
       lunchArr.forEach(function(item) {
           var calories = item.nutrition.calories;
           lunchCalories += calories;
           totalCalories += calories;
       });
       dinnerArr.forEach(function(item) {
           var calories = item.nutrition.calories;
           dinnerCalories += calories;
           totalCalories += calories;
       });

       console.log(totalCalories);


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


        res.render("meal-plan.ejs", { meal: mealInput, calories: calorieCount, diet: dietInput, totalCalories: totalCalories, breakfastArr: breakfastArr, lunchArr: lunchArr, dinnerArr: dinnerArr, breakfastCalories: breakfastCalories, lunchCalories: lunchCalories, dinnerCalories: dinnerCalories, ingredientList: ingredientList, extraBreakfastArr: extraBreakfastArr, extraLunchArr: extraLunchArr, extraDinnerArr: extraDinnerArr});
    } catch (e){
        res.json(e);
    }

});

app.get("/user/:username", function(req, res) {
    //find user
    User.find({username: req.params.username}, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            var user = foundUser[0];
            res.render("profile.ejs", {user: user});
        }
    })
});

//route for saving recipe

app.post("/saverecipe", isLoggedIn, function(req, res) {
    //find the user
    User.findById(req.user._id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            //create the meal plan
            var entirePlan = {
                plan: req.body.plan,
                name: req.body.name,
                image: req.body.image,
                dietType: req.body.dietType,
                description: req.body.description,
                backgroundColor: req.body.backgroundColor,
                creator: req.user.username
            }
            Plan.create(entirePlan, function(err, plan) {
                if (err) {
                    console.log(err);
                } else {
                    //push meal plan into user
                    // console.log(plan);
                    user.mealPlans.push(plan);
                    console.log(plan);
                    user.save();
                    console.log("saved.");
                }
            })
        }
    })
});

app.get("/plan/:id", function(req, res) {
    var calorieTotal = 0;
        carbTotal = 0;
        fatTotal = 0;
        proteinTotal = 0;
        fiberTotal = 0;
        sodiumTotal = 0;
        cholesterolTotal = 0;
    Plan.findById(req.params.id, function(err, plan) {
        if (err) {
            console.log(err);
        } else {
            plan.plan.forEach(function(item) {
                item.forEach(function(food) {
                    calorieTotal += parseInt(food.nutrition.calories);
                    carbTotal += parseInt(food.nutrition.carbs);
                    fatTotal += parseInt(food.nutrition.fat);
                    proteinTotal += parseInt(food.nutrition.protein);
                    fiberTotal += parseInt(food.nutrition.fiber);
                    sodiumTotal += parseInt(food.nutrition.sodium);
                    cholesterolTotal += parseInt(food.nutrition.cholesterol);
                });
            });
            res.render("viewplan.ejs", {plan: plan, calorieTotal: calorieTotal, carbTotal: carbTotal, fatTotal: fatTotal, proteinTotal: proteinTotal, fiberTotal: fiberTotal, sodiumTotal: sodiumTotal, cholesterolTotal: cholesterolTotal})
        }
    })
})

app.get("/onboarding", function(req, res) {
    res.render("onboarding.ejs");
})

app.get("/signup", function(req, res) {
    res.render("signup.ejs");
});

app.post("/signup", function(req, res) {
    var random = Math.floor(Math.random() * 6);
    var profilePic = profileImgArray[random];
    var description = descriptionArr[random];
    User.register(new User({username: req.body.username, email: req.body.email, profilePicture: profilePic, description: description}), req.body.password, function(err, newUser) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect(301, "/onboarding");
            });
        }
    })
});

app.get("/login", function(req, res) {
    res.render("login.ejs", {referer: req.headers.referer});
});

app.post("/login", passport.authenticate("local", {failureRedirect: "/login"}), (req, res) => {
    if (req.body.referer && (req.body.referer !== undefined && req.body.referer.slice(-6) !== "/login")) {
        res.redirect(req.body.referer);
    } else {
        res.redirect("/");
    }
});


app.post("/createuser", function(req, res) {

    
    function calcGoal(goal, bmr) {
        return (goal === "maintain") ? bmr
            : (goal === "lose1") ? bmr = bmr - (bmr * .10)
            : (goal === "lose2") ? bmr = bmr - (bmr * .25)
            : (goal === "gain1") ? bmr = bmr + (bmr * .10)
            : bmr = bmr + (bmr * .25);
    }
    
    function calcProtein(goal, bmr, proteinGoal) {
        if (req.body.food === "paleo") {
            return proteinGoal = (bmr * .50);
        } else if (req.body.food === "ketogenic") {
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
        if (req.body.food === "ketogenic") {
            return fatGoal = (bmr * .75);
        } else {
            return (goal === "maintain") ? fatGoal = (bmr * .30)
                : (goal === "lose1") ? fatGoal = (bmr * .25)
                : (goal === "lose2") ? fatGoal = (bmr * .20)
                : fatGoal = (bmr * .35);
        }
    }
    
    function calcCarbs(goal, bmr, carbGoal) {
        if (req.body.food === "ketogenic") {
            return carbGoal = (bmr * .05);
        } else if (req.body.food === "paleo") {
            return carbGoal = (bmr * .20);
        } else {
            return (goal === "maintain") ? carbGoal = (bmr * .50)
                : (goal === "lose1") ? carbGoal = (bmr * .45)
                : (goal === "lose2") ? carbGoal = (bmr * .35)
                : (goal === "gain1") ? carbGoal = (bmr * .55)
                : carbGoal = (bmr * .65)
        }
    }

    var gender = req.body.gender;
    var weight = Math.floor(parseInt(req.body.weight) * 0.45359237);
    var height = parseInt(req.body.height);
    var goalType = req.body.goal;
    var exerciseLevel = parseFloat(req.body.exercise);
    var age = parseInt(req.body.age);

    var basalMetabolicRate = 0;
    var carbGoal = 0;
    var proteinGoal = 0;
    var fatGoal = 0;
    var endBMR = 0;
    var newCarb = 0;
    var newFat = 0;
    var newProtein = 0;
    if (gender === "male") {
        basalMetabolicRate = Math.round(((10 * weight) + (6.25 * height) - (5 * age) + 5) * exerciseLevel);
        endBMR = calcGoal(goalType, basalMetabolicRate);
        newCarb = calcCarbs(goalType, endBMR, carbGoal);
        newFat = calcFats(goalType, endBMR, fatGoal);
        newProtein = calcProtein(goalType, endBMR, proteinGoal);
    } else {
        basalMetabolicRate = Math.round(((10 * weight) + (6.25 * height) - (5 * age) - 161) * exerciseLevel);
        endBMR = calcGoal(goalType, basalMetabolicRate);
        newCarb = calcCarbs(goalType, endBMR, carbGoal);
        newFat = calcFats(goalType, endBMR, fatGoal);
        newProtein = calcProtein(goalType, endBMR, proteinGoal);
    }

    var userSettings = {
        onboarding: true,
        allergieList: req.body.allergie,
        firstName: req.body.firstName,
        targetCalories: endBMR,
        targetFats: newFat,
        targetCarbs: newCarb,
        targetProteins: newProtein,
        gender: gender,
        weight: weight,
        height: height,
        preferredDiet: req.body.food,
        exerciseLevel: exerciseLevel,
        age: age
    }

    User.findByIdAndUpdate(req.user._id, userSettings, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "You're now registered in as " + user.username + "!");
            res.redirect(301, "/");
        }
    })
});

app.get("/logout", function(req, res) {
    console.log("logging out...");
    req.logout();
    req.flash("success", "You have logged out!");
    res.redirect(307, "/");
});

// ============================
//  API CALLS & DATA ADDING
// ============================

// var myNewObj = {

//     name: "Avocado Toast with Egg",
//     breakfast: false,
//     lunch: true,
//     dinner: false,
//     diet: {
//       anything: true,
//       paleo: false,
//       vegetarian: true,
//       vegan: false,
//       ketogenic: false,
//       mediterranean: false
//     },
//     image: "https://spoonacular.com/recipeImages/630714-556x370.jpg",
//     nutrition: {
//         calories: 426,
//         serving_size: "2",
//         carbs: 20,
//         fat: 9.77,
//         protein: 11.6,
//         fiber: 0,
//         sodium: 428,
//         cholesterol: 163,
//         sugar: 4
//     },
//     ingredients: {
//       one: {
//           name: "eggs",
//           image: "",
//           amount: 2,
//           unit: "eggs"
//       },
//       two: {
//           name: "avocado",
//           image: "",
//           amount: 1,
//           unit: "avocado"
//       },
//       three: {
//           name: "bread",
//           image: "",
//           amount: 2,
//           unit: "slices"
//       },
//       four: {
//           name: "salt and pepper",
//           image: "",
//           amount: 2,
//           unit: "pinches"
//       }
//     },
//     time_to_make: "15 minutes",
//     instructions: "Remove seed from avocado. Dig insides out of avocado and mash in a bowl. Spread mashed avocado onto bread. Put the eggs on a skillet and make 'em however ya like (fried, scrambled, etc.), then place them on top of avocado toast. Sprinkle with salt.",
//     price: 5
// }

// Food.create(myNewObj, function(err, newFood) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(newFood);
//     }
// })

// unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/560213/information?includeNutrition=true")
// .header("X-RapidAPI-Key", "8d15bb3109mshea1e309c7c36069p181194jsnb15d43138288")
// .end(function (result) {

//     var MongoClient = require("mongodb").MongoClient;
//     var data = result.body;

//     MongoClient.connect('mongodb://localhost', function (err, client) {
//         if (err) throw err;

//         var db = client.db('food_app');
//         var myObj = data;

//         db.collection('recipes').insertOne(myObj, function (findErr, result) {
//             if (findErr) throw findErr;
//             client.close();
//         });
//     });

//     console.log(result.status, result.headers, result.body);
// });


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        console.log("Must log in");
        res.redirect("/login");
        req.flash("error", "Please log in first.");
    }
};

function hasCompletedOnboarding(req, res, next) {
    if (req.user.onboarding) {
        req.flash("error", "You've already completed onboarding. Visit settings to change profile."); 
        res.redirect(301, "/");
    } else {
        next();
    }
}

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
