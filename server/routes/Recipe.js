const express = require("express");
const router = express.Router();
const {
  Users,
  Recipe,
  Recipe_Ingredient,
  Ingredient,
  FridgeIngredient,
  DietaryRestrictions,
  DietaryRestriction,
  HealthLabel,
  Sequelize,
  sequelize,
} = require("../models");
const jwt = require("jsonwebtoken");
const authenticate = require("../middlewares/authenticate");
const bcrypt = require("bcryptjs");

router.get('/random_recipe', async (req, res) => {
  console.log('RANDOM ROUTE')
  try {
    const random_recipe = await Recipe.findOne({
      order: sequelize.random(),
    })

    if (!random_recipe){
      return res.status(404).json({ message: 'No recipes found' })
    }

    return res.status(200).json(random_recipe);
  }
  catch(error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' }); 
  }
})

router.post("/recipes", async (req, res) => {
  try {
    // Getting the Data
    const recipe_name = await Recipe.findAll({
      attributes: ["id", "title"],
    });

    //Search
    const matchingRecipes = [];
    for (let i = 0; i < recipe_name.length; i++) {
      if (recipe_name[i].title.includes(req.body.search)) {
        matchingRecipes.push(recipe_name[i]);
        //console.log(recipe_name[i].title)
      }
    }

    res.json(matchingRecipes);
  } catch (error) {
    console.error("Error fetching valid recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/recipesIngredient", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    // let missingIng;
    // let ingredientName;
    // let nameOfRecipe;

    // let ingredientsForRecipe;

    const userIngredients = await FridgeIngredient.findAll({
      where: { user_id: userId },
      attributes: ["ingredient_id"],
    });

    const FinalOutput = {};

    for (let recipeId = 1; recipeId <= 10; recipeId++) {
      const recipeIngredients = await Recipe_Ingredient.findAll({
        where: { recipe_id: recipeId },
        attributes: ["ingredient_id"],
      });

      // Filter out recipes where the user has 3 or more ingredients in common
      const commonIngredients = recipeIngredients.filter((recipeIngredient) =>
        userIngredients.some(
          (userIngredient) =>
            userIngredient.ingredient_id === recipeIngredient.ingredient_id
        )
      );

      if (commonIngredients.length >= 3) {
        const missingIngredients = [];

        for (const recipeIngredient of recipeIngredients) {
          if (
            !commonIngredients.some(
              (common) =>
                common.ingredient_id === recipeIngredient.ingredient_id
            )
          ) {
            const ingredientName = await Ingredient.findOne({
              where: { id: recipeIngredient.ingredient_id },
              attributes: ["name"],
            });

            missingIngredients.push(ingredientName.name);
          }
        }

        const recipeTitle = await Recipe.findOne({
          where: { id: recipeId },
          attributes: ["title"],
        });

        FinalOutput[recipeTitle.title] = missingIngredients;
      }
    }

    res.json(FinalOutput);
  } catch (error) {
    console.error("Error fetching valid recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/allergy", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    // Getting the Data
    const healthLabelList = await DietaryRestrictions.findAll({
      where: { user_id: userId },
      attributes: ["healthLabel_id"],
    });
    // console.log(healthLabelList);

    const recipeHealthLabels = await Recipe.findAll({
      include: [
        {
          model: HealthLabel,
          through: "RecipeHealthLabels",
          attributes: ["label"],
        },
      ],
    });
    //console.log(recipeHealthLabels[0].HealthLabels[0].dataValues.RecipeHealthLabels.dataValues.healthLabel_id);
    let matchOnce = false;
    const matchingRecipes = [];
    for (let i = 0; i < recipeHealthLabels.length; i++) {
      for (let k = 0; k < healthLabelList.length; k++) {
        for (let j = 0; j < recipeHealthLabels[i].HealthLabels.length; j++) {
          if (
            recipeHealthLabels[i].HealthLabels[j].dataValues.RecipeHealthLabels
              .dataValues.healthLabel_id == healthLabelList[k].healthLabel_id
          ) {
            matchingRecipes.push(recipeHealthLabels[i].dataValues.title);
            matchOnce = true;
            break;
          }
        }
        if (matchOnce) {
          matchOnce = false;
          break;
        }
      }
    }

    //console.log(matchingRecipes);
    res.json(matchingRecipes);
  } catch (error) {
    console.error("Error fetching valid recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

});

router.get('/recipesIngredient', authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    // let missingIng;
    // let ingredientName;
    // let nameOfRecipe;
    
    // let ingredientsForRecipe;

    const userIngredients = await FridgeIngredient.findAll({
      where: { user_id: userId },
      attributes: ['ingredient_id'],
    });

    const FinalOutput = {};

    for (let recipeId = 1; recipeId <= 10; recipeId++) {
      const recipeIngredients = await Recipe_Ingredient.findAll({
        where: { recipe_id: recipeId },
        attributes: ['ingredient_id'],
      });

      // Filter out recipes where the user has 3 or more ingredients in common
      const commonIngredients = recipeIngredients.filter((recipeIngredient) =>
        userIngredients.some((userIngredient) => userIngredient.ingredient_id === recipeIngredient.ingredient_id)
      );

      if (commonIngredients.length >= 3) {
        const missingIngredients = [];

        for (const recipeIngredient of recipeIngredients) {
          if (!commonIngredients.some((common) => common.ingredient_id === recipeIngredient.ingredient_id)) {
            const ingredientName = await Ingredient.findOne({
              where: { id: recipeIngredient.ingredient_id },
              attributes: ['name'],
            });

            missingIngredients.push(ingredientName.name);
          }
        }

        const recipeTitle = await Recipe.findOne({
          where: { id: recipeId },
          attributes: ['title'],
        });

        FinalOutput[recipeTitle.title] = missingIngredients;
      }
    }

    res.json(FinalOutput);
  }
  catch (error) {
    console.error('Error fetching valid recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

router.get('/allergy', authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    // Getting the Data
    const healthLabelList = await DietaryRestrictions.findAll({
      where: {user_id : userId},
      attributes: ['healthLabel_id']
    });
    // console.log(healthLabelList);

    const recipeHealthLabels = await Recipe.findAll({
      include: [
        {
          model: HealthLabel,
          through: 'RecipeHealthLabels',
          attributes: ['label'],
        },
      ],
    });
    //console.log(recipeHealthLabels[0].HealthLabels[0].dataValues.RecipeHealthLabels.dataValues.healthLabel_id);
    let matchOnce = false;
    const matchingRecipes = [];
    for(let i = 0; i < recipeHealthLabels.length; i++) {

      for(let k = 0; k < healthLabelList.length; k++) {

        for(let j = 0; j < recipeHealthLabels[i].HealthLabels.length; j++) {

          if(recipeHealthLabels[i].HealthLabels[j].dataValues.RecipeHealthLabels.dataValues.healthLabel_id == healthLabelList[k].healthLabel_id) {

            matchingRecipes.push(recipeHealthLabels[i].dataValues.title);
            matchOnce = true;
            break;
          }
        }
        if(matchOnce) {
          matchOnce = false;
          break;
        }
      }
    }
    
    
    //console.log(matchingRecipes);
    res.json( matchingRecipes );
  }
  catch (error) {
    console.error('Error fetching valid recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

module.exports = router;