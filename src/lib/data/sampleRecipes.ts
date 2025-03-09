// app/lib/data/sampleRecipes.ts
import { Recipe } from '../context/RecipeContext';

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    name: "Classic vanilla sponge cake",
    description: "A light and fluffy vanilla sponge cake, perfect for birthdays and celebrations.",
    servings: 8,
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    difficulty: "easy",
    equipment: [
      "20cm round cake tin",
      "Electric mixer",
      "Mixing bowl",
      "Spatula",
      "Cooling rack"
    ],
    ingredients: [
      {
        id: "1-1",
        name: "unsalted butter, softened",
        quantity: 200,
        unit: "g"
      },
      {
        id: "1-2",
        name: "caster sugar",
        quantity: 200,
        unit: "g"
      },
      {
        id: "1-3",
        name: "large eggs",
        quantity: 4,
        unit: "piece"
      },
      {
        id: "1-4",
        name: "vanilla extract",
        quantity: 1,
        unit: "tsp",
        scalingFactor: 0.7 // Vanilla doesn't scale linearly
      },
      {
        id: "1-5",
        name: "self-raising flour",
        quantity: 200,
        unit: "g"
      },
      {
        id: "1-6",
        name: "baking powder",
        quantity: 1,
        unit: "tsp",
        scalingFactor: 0.8 // Leavening agents don't scale linearly
      },
      {
        id: "1-7",
        name: "salt",
        quantity: 0.25,
        unit: "tsp",
        scalingFactor: 0.7
      },
      {
        id: "1-8",
        name: "milk",
        quantity: 2,
        unit: "tbsp"
      }
    ],
    instructions: [
      "Preheat your oven to 180°C (160°C fan) and line a 20cm round cake tin with parchment paper.",
      "In a large bowl, cream together the butter and sugar until pale and fluffy.",
      "Beat in the eggs one at a time, adding a tablespoon of flour with each egg to prevent curdling.",
      "Stir in the vanilla extract.",
      "Fold in the remaining flour, baking powder, and salt until just combined.",
      "Add the milk and mix gently until the batter is smooth and dropping consistency.",
      "Pour the batter into the prepared tin and level the surface.",
      "Bake for 25-30 minutes or until golden brown and a skewer inserted into the center comes out clean.",
      "Allow to cool in the tin for 10 minutes before turning out onto a wire rack to cool completely."
    ],
    notes: [
      "The cake can be stored in an airtight container for up to 3 days.",
      "For a chocolate version, replace 50g of flour with cocoa powder."
    ],
    categories: ["Cake", "Dessert", "Baking", "Birthday"],
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b19c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "2",
    name: "Classic apple pie",
    description: "A homemade apple pie with a flaky crust and sweet-tart filling.",
    servings: 8,
    prepTime: 45,
    cookTime: 50,
    totalTime: 95,
    difficulty: "medium",
    equipment: [
      "9-inch pie dish",
      "Rolling pin",
      "Mixing bowls",
      "Pastry cutter or food processor",
      "Baking sheet"
    ],
    ingredients: [
      {
        id: "2-1",
        name: "all-purpose flour, plus extra for dusting",
        quantity: 350,
        unit: "g"
      },
      {
        id: "2-2",
        name: "salt",
        quantity: 1,
        unit: "tsp",
        scalingFactor: 0.7
      },
      {
        id: "2-3",
        name: "unsalted butter, cold and cubed",
        quantity: 170,
        unit: "g"
      },
      {
        id: "2-4",
        name: "ice water",
        quantity: 80,
        unit: "ml"
      },
      {
        id: "2-5",
        name: "large cooking apples (like Granny Smith), peeled, cored, and sliced",
        quantity: 1000,
        unit: "g"
      },
      {
        id: "2-6",
        name: "lemon juice",
        quantity: 1,
        unit: "tbsp",
        scalingFactor: 0.8
      },
      {
        id: "2-7",
        name: "granulated sugar",
        quantity: 150,
        unit: "g"
      },
      {
        id: "2-8",
        name: "ground cinnamon",
        quantity: 1,
        unit: "tsp",
        scalingFactor: 0.8
      },
      {
        id: "2-9",
        name: "cornstarch",
        quantity: 2,
        unit: "tbsp"
      },
      {
        id: "2-10",
        name: "egg, beaten (for egg wash)",
        quantity: 1,
        unit: "piece",
        minimumQuantity: 1
      },
      {
        id: "2-11",
        name: "coarse sugar for sprinkling",
        quantity: 2,
        unit: "tsp"
      }
    ],
    instructions: [
      "For the pastry: Mix flour and salt in a large bowl. Add cold cubed butter and rub in with fingertips until mixture resembles breadcrumbs.",
      "Gradually add ice water, mixing until the dough just comes together. Divide into two portions, one slightly larger than the other. Wrap in plastic and refrigerate for at least 30 minutes.",
      "For the filling: Toss sliced apples with lemon juice in a large bowl. In a separate bowl, mix sugar, cinnamon, and cornstarch, then add to apples and toss to coat.",
      "Preheat oven to 190°C (170°C fan). Roll out the larger portion of dough on a floured surface to fit your pie dish with overhang.",
      "Transfer dough to dish, pressing gently into corners. Fill with apple mixture, mounding slightly in the center.",
      "Roll out the remaining dough and place over the filling. Trim edges, then crimp to seal.",
      "Cut several slits in the top crust to allow steam to escape. Brush with beaten egg and sprinkle with coarse sugar.",
      "Bake for 20 minutes, then reduce temperature to 170°C (150°C fan) and bake for an additional 30-35 minutes until golden brown.",
      "Allow to cool for at least 2 hours before serving to let the filling set."
    ],
    notes: [
      "For best results, let the dough rest in the refrigerator overnight.",
      "Serve warm with vanilla ice cream or whipped cream.",
      "You can use a mix of different apple varieties for a more complex flavor."
    ],
    categories: ["Pie", "Dessert", "Baking", "Fruit"],
    imageUrl: "https://images.unsplash.com/photo-1562007908-17c67e878c88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "3",
    name: "Chocolate chip cookies",
    description: "Chewy in the middle, crisp at the edges, with melty chocolate chips throughout.",
    servings: 24,
    prepTime: 15,
    cookTime: 12,
    totalTime: 27,
    difficulty: "easy",
    equipment: [
      "Baking sheets",
      "Parchment paper",
      "Electric mixer",
      "Mixing bowls",
      "Cookie scoop or spoon",
      "Wire rack"
    ],
    ingredients: [
      {
        id: "3-1",
        name: "unsalted butter, softened",
        quantity: 225,
        unit: "g"
      },
      {
        id: "3-2",
        name: "light brown sugar, packed",
        quantity: 150,
        unit: "g"
      },
      {
        id: "3-3",
        name: "granulated sugar",
        quantity: 100,
        unit: "g"
      },
      {
        id: "3-4",
        name: "large eggs",
        quantity: 2,
        unit: "piece"
      },
      {
        id: "3-5",
        name: "vanilla extract",
        quantity: 2,
        unit: "tsp",
        scalingFactor: 0.7
      },
      {
        id: "3-6",
        name: "all-purpose flour",
        quantity: 280,
        unit: "g"
      },
      {
        id: "3-7",
        name: "baking soda",
        quantity: 1,
        unit: "tsp",
        scalingFactor: 0.8
      },
      {
        id: "3-8",
        name: "salt",
        quantity: 0.5,
        unit: "tsp",
        scalingFactor: 0.7
      },
      {
        id: "3-9",
        name: "chocolate chips or chunks",
        quantity: 300,
        unit: "g"
      }
    ],
    instructions: [
      "Preheat oven to 180°C (160°C fan). Line baking sheets with parchment paper.",
      "In a large bowl, cream together butter, brown sugar, and granulated sugar until light and fluffy (about 3 minutes).",
      "Beat in eggs one at a time, then stir in vanilla.",
      "In a separate bowl, whisk together flour, baking soda, and salt.",
      "Gradually add dry ingredients to wet ingredients, mixing just until combined.",
      "Fold in chocolate chips.",
      "Drop rounded tablespoons of dough onto prepared baking sheets, spacing them about 2 inches apart.",
      "Bake for 10-12 minutes until edges are golden but centers still look slightly underdone.",
      "Allow cookies to cool on baking sheet for 5 minutes before transferring to a wire rack to cool completely."
    ],
    notes: [
      "For extra chewy cookies, refrigerate the dough for at least 24 hours before baking.",
      "Add 100g chopped nuts for texture variation.",
      "Cookies can be stored in an airtight container for up to 5 days."
    ],
    categories: ["Cookies", "Dessert", "Baking", "Chocolate"],
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  }
];