# Model Context Protocol and Fireproof Demo: JSON Document Collection Server

<h1>
<img alt="Fireproof" src="./images/fp-logo.svg" height="30pt">
❤️
<img alt="MCP" src="./images/mcp-light.png" height="30pt">
</h1>

This is an example of how to use a [Fireproof](https://fireproof.storage/) database in a [Model Context Protocol](https://github.com/modelcontextprotocol) server (used for plugging code and data into A.I. systems such as [Claude Desktop](https://claude.ai/download)).

This server:

  * allows the creation of multiple "JSON Document Databases" (implemented using Fireproof)
  * implements basic CRUD operations (Create, Read, Update, Delete) within any database and the ability to query documents sorted by any field.
  * allows sharing of any database with others using the Fireproof Cloud service and dashboard

Prior art: This is based on https://github.com/fireproof-storage/mcp-database-server - it adds multiple databases plus the ability to sync to the cloud.

## Running the Server

First, build it:

```
npm install
npm build
```

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "json-db-collections": {
      "command": "<base-dir>/mcp-json-db-collection-server/build/index.js"
    }
  }
}
```

# Sample Claude Desktop chat session

Here is a sample session using Claude Desktop where I create 3 document databases and sync them to the cloud:

## 1. Chat Session: Database of Elements

**human** (Dec 29, 2024, 03:59 PM)

create a json document database named elements

**assistant** (Dec 29, 2024, 04:00 PM)

 I'll help you create a JSON document database named "elements".



The database has been created successfully. You can now use this database to store and manage JSON documents. Would you like to add any documents to it?

**human** (Dec 29, 2024, 04:00 PM)

add noble gases from period table as individual docs

**assistant** (Dec 29, 2024, 04:00 PM)

 I'll help you add the noble gases as individual documents to the elements database. I'll include key properties for each noble gas.



I've added all seven noble gases (Helium, Neon, Argon, Krypton, Xenon, Radon, and Oganesson) to the database. For each element, I included:
- Name and symbol
- Atomic number and mass
- Period, group, and block
- Electron configuration
- Melting and boiling points (in Kelvin)
- Density (in g/cm³)

Note that for Oganesson, some physical properties are marked as null since it's a synthetic element with very short half-life and its properties aren't well-determined experimentally.

Would you like to query any specific information about these noble gases from the database?

**human** (Dec 29, 2024, 04:01 PM)

show docs

**assistant** (Dec 29, 2024, 04:01 PM)

 I'll query all the documents from the elements database, sorted by atomic number.



Here are all the noble gases in the database, listed in order of atomic number (from highest to lowest):

1. Oganesson (Og) - Element 118
2. Radon (Rn) - Element 86
3. Xenon (Xe) - Element 54
4. Krypton (Kr) - Element 36
5. Argon (Ar) - Element 18
6. Neon (Ne) - Element 10
7. Helium (He) - Element 2

Each document contains detailed information about the element, including its atomic mass, density, melting and boiling points (where known), and electron configuration. Would you like to examine any specific properties or compare certain aspects of these elements?

## 2. Chat Session: Database of Cookie Ingredients

**human** (Dec 29, 2024, 04:01 PM)

create json document db called cookie_ingredients

**assistant** (Dec 29, 2024, 04:01 PM)

 I'll create a new JSON document database called "cookie_ingredients".



The database has been created successfully. Would you like to add any ingredients to it?

**human** (Dec 29, 2024, 04:02 PM)

add ingredients from chocolate chip cookie recipe as individual docs

**assistant** (Dec 29, 2024, 04:02 PM)

 I'll add common ingredients for chocolate chip cookies as individual documents with their typical measurements and properties.



I've added all the essential ingredients for a classic chocolate chip cookie recipe. For each ingredient, I included:
- Name and amount
- Unit of measurement
- Type (dry, wet, leavening, etc.)
- Purpose in the recipe
- Possible substitutes
- Weight measurements
- Important notes about usage

Would you like to query any specific information about these ingredients from the database?

**human** (Dec 29, 2024, 04:02 PM)

show ingredients as table

**assistant** (Dec 29, 2024, 04:03 PM)

 I'll query the ingredients and format them as a markdown table.



| Ingredient | Amount | Unit | Type | Purpose | Weight/Unit |
|------------|--------|------|------|---------|------------|
| All-Purpose Flour | 2¼ | cups | dry | structure | 120g/cup |
| Unsalted Butter | 1 | cup | fat | texture and flavor | 227g/cup |
| Granulated Sugar | ¾ | cup | sweetener | sweetness and texture | 200g/cup |
| Brown Sugar | ¾ | cup | sweetener | moisture and flavor | 220g/cup |
| Large Eggs | 2 | whole | binding | structure and richness | 50g each |
| Vanilla Extract | 1 | teaspoon | flavoring | flavor enhancement | 5g/tsp |
| Salt | 1 | teaspoon | seasoning | flavor enhancement | 6g/tsp |
| Baking Soda | 1 | teaspoon | leavening | rise and spread | 4.8g/tsp |
| Chocolate Chips | 2 | cups | mix-in | flavor and texture | 170g/cup |

I've organized the ingredients by type and included their amounts, units, purposes, and weight measurements. Would you like to see any additional details about specific ingredients?

## 3. Chat Session: Database of Horse Breeds

**human** (Dec 29, 2024, 04:03 PM)

create new json document db called horse_breeds

**assistant** (Dec 29, 2024, 04:03 PM)

 I'll create a new JSON document database for horse breeds.



The database has been created successfully. Would you like to add some horse breeds to it?

**human** (Dec 29, 2024, 04:03 PM)

yes

**assistant** (Dec 29, 2024, 04:04 PM)

 I'll add several popular horse breeds with their key characteristics, origins, and typical uses.



I've added six distinctive horse breeds to the database:
1. Arabian - known for endurance and refinement
2. Thoroughbred - famous for racing and athleticism
3. Clydesdale - a powerful draft horse
4. Quarter Horse - America's versatile stock horse
5. Friesian - elegant black horse from the Netherlands
6. Appaloosa - known for spotted patterns and Native American heritage

Each entry includes information about:
- Origin and type
- Height range (in hands - where 1 hand = 4 inches)
- Common colors
- Physical characteristics
- Typical uses
- Temperament
- Notable traits

Would you like to see the information presented in a specific way or learn more about any particular breed?

## 4. Chat Session: Sync to Cloud

**human** (Dec 29, 2024, 04:04 PM)

list json document dbs

**assistant** (Dec 29, 2024, 04:04 PM)

 I'll list all the JSON document databases that have been created.



We have three JSON document databases:
1. horse_breeds
2. elements
3. cookie_ingredients

Each database contains documents related to its specific theme:
- horse_breeds has information about different horse breeds
- elements contains data about noble gases
- cookie_ingredients has details about chocolate chip cookie ingredients

Would you like to query any specific information from these databases?

**human** (Dec 29, 2024, 04:04 PM)

sync horse_breeds to cloud

**assistant** (Dec 29, 2024, 04:04 PM)

 I'll help you connect the horse_breeds database to cloud sync service.



The horse_breeds database has been successfully connected to the cloud. You can access the dashboard using the URL provided above. This will allow you to view and manage your horse breeds data through the cloud interface. Would you like to sync any other databases to the cloud as well?

**human** (Dec 29, 2024, 04:05 PM)

show url

**assistant** (Dec 29, 2024, 04:05 PM)

 Here's the dashboard URL for the horse_breeds database:

https://dashboard.fireproof.storage/fp/databases/connect?endpoint=fireproof%3A%2F%2Fcloud.fireproof.direct%2F&localName=horse_breeds&remoteName=019414e1-2db0-70aa-b9a4-2e2f78a7adce

You can use this URL to access and manage the horse breeds data through the cloud interface.

**human** (Dec 29, 2024, 04:05 PM)

sync elements db to cloud

**assistant** (Dec 29, 2024, 04:05 PM)

 I'll connect the elements database to the cloud sync service.



The elements database has been successfully connected to the cloud. You can access the dashboard at:

https://dashboard.fireproof.storage/fp/databases/connect?endpoint=fireproof%3A%2F%2Fcloud.fireproof.direct%2F&localName=elements&remoteName=019414e1-db52-75e7-b8d0-21ce605176a7

Would you like to sync the cookie_ingredients database as well?

**human** (Dec 29, 2024, 04:05 PM)

yes

**assistant** (Dec 29, 2024, 04:05 PM)

 I'll connect the cookie_ingredients database to the cloud sync service.



Here's the dashboard URL for the cookie_ingredients database:

https://dashboard.fireproof.storage/fp/databases/connect?endpoint=fireproof%3A%2F%2Fcloud.fireproof.direct%2F&localName=cookie_ingredients&remoteName=019414e2-1f47-72d7-bf8f-a721d29a24c7

Now all three databases (horse_breeds, elements, and cookie_ingredients) are synchronized to the cloud and can be accessed through their respective dashboard URLs.

## 5. Chat Session: Cleanup

**human** (Dec 29, 2024, 04:06 PM)

delete all databases

**assistant** (Dec 29, 2024, 04:06 PM)

 I'll help you delete all three databases.



All three databases have been successfully deleted:
1. horse_breeds
2. elements
3. cookie_ingredients

Let me verify that they're all gone.



Confirmed - there are no remaining databases in the system. Would you like to create any new databases?

**Converted to Markdown thanks to**: https://simonwillison.net/2024/Aug/8/convert-claude-json-to-markdown/

# Future development ideas

* prompts
* resources
* multiuser with permissions
* indexing
* generate static websites from Claude Desktop using Firebase npm libraries

# Development

```bash
pnpm install
pnpm build
pnpm run inspector
# To reset, do: rm -rf ~/.fireproof /tmp/dist
```

`~/Library/Application\ Support/Claude/claude_desktop_config.json`:
```
{
  "mcpServers": {
    "json-db-collections": {
      "command": "<base-dir>/mcp-json-db-collection-server/build/index.js"
    }
  }
}
```

# License

MIT or Apache 2

