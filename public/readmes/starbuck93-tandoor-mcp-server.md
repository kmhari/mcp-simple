# Tandoor MCP Server

A Model Context Protocol (MCP) server for interacting with [Tandoor Recipe Manager](https://github.com/TandoorRecipes/recipes).

<img src="icon.jpg" width=20% height=20% alt="img generated with Gemini">

## Current Status

- ✅ **create_tandoor_recipe**: Successfully implemented and tested
- ✅ **create_tandoor_meal_plan**: Successfully implemented and tested
- ✅ **get_recipes**: Successfully implemented and tested
- ✅ **get_meal_plans**: Successfully implemented and tested
- ✅ **get_recipe_details**: Implemented
- ✅ **get_meal_types**: Implemented
- ✅ **get_keywords**: Implemented
- ✅ **get_foods**: Implemented
- ✅ **get_units**: Implemented
- ✅ **get_shopping_list**: Implemented
- ✅ **add_shopping_list_item**: Implemented (with name lookup)
- ✅ **update_shopping_list_item**: Implemented
- ✅ **remove_shopping_list_item**: Implemented

## Features

- Create recipes in Tandoor with ingredients and instructions
- Add recipes to meal plans for specific dates and meal types
- Search for recipes using various criteria (name, keywords, foods, rating)
- Retrieve meal plans filtered by date range and meal type
- Retrieve full details for a specific recipe
- List available meal types, keywords, foods, and units
- Manage shopping list items (view, add, update, remove)

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Build the server:
   ```
   npm run build
   ```

3. Run the server manually (for testing):
   ```
   # Windows PowerShell
   $env:TANDOOR_URL = "https://your-tandoor-instance.com"
   $env:TANDOOR_API_TOKEN = "your-api-token"
   node .\build\index.js
   
   # Windows CMD
   set TANDOOR_URL=https://your-tandoor-instance.com
   set TANDOOR_API_TOKEN=your-api-token
   node .\build\index.js
   
   # Linux/macOS
   TANDOOR_URL=https://your-tandoor-instance.com TANDOOR_API_TOKEN=your-api-token node ./build/index.js
   ```

4. Configure in MCP settings:
   ```json
   {
     "mcpServers": {
       "tandoor": {
         "command": "node",
         "args": ["path/to/tandoor-mcp-server/build/index.js"],
         "env": {
           "TANDOOR_URL": "https://your-tandoor-instance.com",
           "TANDOOR_API_TOKEN": "your-api-token"
         },
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```


5. If you want everything autoApprove...
```json
      "autoApprove": [
        "add_shopping_list_item",
        "create_tandoor_meal_plan",
        "create_tandoor_recipe",
        "get_foods",
        "get_keywords",
        "get_meal_plans",
        "get_meal_types",
        "get_recipe_details",
        "get_recipes",
        "get_recipes",
        "get_shopping_list",
        "get_units",
        "remove_shopping_list_item",
        "update_shopping_list_item"
      ]

```

6. Add `./.clinerules` to your project directory
- optionally also add `./memory-bank` with a markdown or text file list of foods you like or dislike in case you'd like suggestions for meals from the assistant.


## Available Tools

### create_tandoor_recipe

Creates a new recipe in Tandoor.

**Parameters:**
- `name` (string, required): The name of the recipe.
- `description` (string, optional): Description for the recipe.
- `servings` (number, optional): Number of servings.
- `ingredients_block` (string, required): A multi-line block of text listing ingredients, one per line.
- `instructions_block` (string, required): A multi-line block of text detailing the recipe instructions.

**Example:**
```json
{
  "name": "Simple Pasta",
  "description": "A quick and easy pasta dish.",
  "servings": 2,
  "ingredients_block": "200g pasta\n2 tbsp olive oil\n1 clove garlic, minced\nSalt and pepper to taste",
  "instructions_block": "1. Cook pasta according to package instructions.\n2. Heat oil in a pan and add garlic.\n3. Drain pasta and add to the pan.\n4. Season with salt and pepper."
}
```

### create_tandoor_meal_plan

Adds one or more recipes to the Tandoor meal plan for a specific date and meal type.

**Parameters:**
- `title` (string, optional): Title for the meal plan entry.
- `recipes` (array, required): Array of recipe names or IDs to add to the plan.
- `start_date` (string, required): The date for the meal plan entry (YYYY-MM-DD).
- `meal_type` (string, required): The name of the meal type (e.g., 'Dinner', 'Lunch').
- `servings` (number, optional): Number of servings for the meal plan entry (default: 1).
- `note` (string, optional): Note for the meal plan entry.

**Example:**
```json
{
  "title": "Friday Dinner",
  "recipes": [123, "Simple Pasta"],
  "start_date": "2025-03-29",
  "meal_type": "Dinner",
  "servings": 2,
  "note": "Quick dinner for Friday night."
}
```

### get_recipes

Search for recipes in Tandoor based on various criteria.

**Parameters:**
- `query` (string, optional): Search term to match against recipe names (fuzzy match).
- `keywords` (array of integers, optional): Array of Keyword IDs. Returns recipes matching ANY of these keywords.
- `foods` (array of integers, optional): Array of Food IDs. Returns recipes containing ANY of these foods.
- `rating` (integer, optional): Minimum rating (0-5) the recipe should have.
- `limit` (integer, optional): Maximum number of recipes to return. Defaults to 10.

**Example:**
```json
{
  "query": "chicken",
  "keywords": [5, 12],
  "rating": 4,
  "limit": 5
}
```

### get_meal_plans

Retrieve meal plan entries from Tandoor, optionally filtering by date range and meal type.

**Parameters:**
- `from_date` (string, optional): Start date (YYYY-MM-DD) to filter meal plans (inclusive).
- `to_date` (string, optional): End date (YYYY-MM-DD) to filter meal plans (inclusive).
- `meal_type_id` (integer, optional): Meal Type ID to filter by.

**Example:**
```json
{
  "from_date": "2025-03-01",
  "to_date": "2025-03-31",
  "meal_type_id": 1
}
```

### get_recipe_details

Retrieve the full details of a specific recipe.

**Parameters:**
- `recipe_id` (integer, required): The ID of the recipe to retrieve.

**Example:**
```json
{
  "recipe_id": 123
}
```

### get_meal_types

List all available meal types in Tandoor.

**Parameters:** None

**Example:**
```json
{}
```

### get_keywords

List or search for keywords.

**Parameters:**
- `query` (string, optional): Optional search term for keyword name.
- `root` (integer, optional): Optional ID to get first-level children (0 for root).
- `tree` (integer, optional): Optional ID to get all children in a tree.

**Example:**
```json
{
  "query": "italian"
}
```

### get_foods

List or search for foods.

**Parameters:**
- `query` (string, optional): Optional search term for food name.
- `root` (integer, optional): Optional ID to get first-level children (0 for root).
- `tree` (integer, optional): Optional ID to get all children in a tree.

**Example:**
```json
{
  "query": "chicken breast"
}
```

### get_units

List or search for units.

**Parameters:**
- `query` (string, optional): Optional search term for unit name.

**Example:**
```json
{
  "query": "gram"
}
```

### get_shopping_list

Retrieve the current shopping list items.

**Parameters:**
- `checked` (string, optional): Filter by checked status ("true", "false", "both", "recent"). Defaults to "recent".

**Example:**
```json
{
  "checked": "false" 
}
```

### add_shopping_list_item

Add an item to the shopping list, allowing food/unit names or IDs.

**Parameters:**
- `food_name_or_id` (string or integer, required): The name or ID of the food item.
- `amount` (string, required): The amount needed (e.g., '1', '2.5', '1/2').
- `unit_name_or_id` (string or integer, required): The name or ID of the unit (e.g., 'cup', 'g', 5).
- `note` (string, optional): Optional note for the item.

**Example (using names):**
```json
{
  "food_name_or_id": "Chicken Breast",
  "amount": "500",
  "unit_name_or_id": "g",
  "note": "For stir-fry"
}
```
**Example (using IDs):**
```json
{
  "food_name_or_id": 42,
  "amount": "2",
  "unit_name_or_id": 15
}
```

### update_shopping_list_item

Update an existing shopping list item (e.g., check/uncheck, change amount).

**Parameters:**
- `item_id` (integer, required): The ID of the shopping list item to update.
- `amount` (string, optional): Optional new amount.
- `unit_id` (integer, optional): Optional new unit ID.
- `checked` (boolean, optional): Optional new checked status.
- `note` (string, optional): Optional new note.

**Example (checking off an item):**
```json
{
  "item_id": 101,
  "checked": true
}
```

### remove_shopping_list_item

Remove an item from the shopping list.

**Parameters:**
- `item_id` (integer, required): The ID of the shopping list item to remove.

**Example:**
```json
{
  "item_id": 102
}
```

## Testing

A test script is included to help verify the server functionality without relying on the MCP connection:

```
# Set your API token (if not already set in the environment)
$env:TANDOOR_API_TOKEN = "your-api-token"

# Run the test script
npm run test
```

The test script provides a simple menu to:
1. List available tools
2. Test creating a recipe
3. Test adding a recipe to a meal plan

## Implementation Notes

The Tandoor API has some specific requirements for creating meal plans:

1. The `from_date` field must include a time component (`YYYY-MM-DDT00:00:00`)
2. The `recipe` field must be an object with `id`, `name`, and `keywords` properties
3. The `meal_type` field must be an object with `id` and `name` properties
4. The `servings` field must be a string, not a number

These requirements are handled automatically by the MCP server.

## Troubleshooting

If you encounter issues with the MCP server:

1. Ensure the server is running and showing `[Setup] Tandoor MCP server running on stdio.`
2. Check that your Tandoor URL and API token are correct
3. Look for error messages in the terminal where the server is running
4. Verify that the meal type names match exactly what's in your Tandoor instance
5. Use the test script to verify server functionality outside of the MCP system
6. Try running the server manually and check the console output for detailed error messages
