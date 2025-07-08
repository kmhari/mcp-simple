# MCP Game Helper

**MCP Game Helper** is a custom Model Context Protocol (MCP) Server that provides AI-powered tools to assist game developers in tasks related to combat balancing, skill analysis, level pacing, and simulation.

> Built for integration with [Cursor](https://cursor.sh), using the official `@modelcontextprotocol/sdk`

---

## 🚀 Available Commands

### 1. `suggest_balancing`

Analyzes the HP and damage of two entities to evaluate if a matchup is balanced.

#### Input Example:

```json
{
  "player": { "hp": 2040, "damage": 1500 },
  "enemy": { "hp": 2080, "damage": 1000 }
}
```

#### Prompt Example:

```
I want to check if my player and enemy are balanced.
Player: 2040 HP, 1500 DMG
Enemy: 2080 HP, 1000 DMG
```

---

### 2. `simulate_combat`

Simulates a combat scenario and estimates time-to-kill (TTK) for both entities.

#### Input Example:

```json
{
  "player": { "hp": 100, "damage": 10, "attackSpeed": 1.0 },
  "enemy": { "hp": 80, "damage": 20, "attackSpeed": 0.5 }
}
```

#### Prompt Example:

```
Simulate a fight:
Player has 100 HP, 10 DMG, 1.0 attack speed
Enemy has 80 HP, 20 DMG, 0.5 attack speed
```

---

### 3. `simulate_room_survival_time`

Estimates how long a player can survive against multiple enemies and the time it takes to clear the room.

#### Input Example:

```json
{
  "player": { "hp": 100, "damage": 15, "attackSpeed": 1.2 },
  "enemies": [
    { "hp": 40, "damage": 10, "attackSpeed": 0.8 },
    { "hp": 50, "damage": 12, "attackSpeed": 1.0 }
  ]
}
```

#### Prompt Example:

```
How long will my player survive in a room?
Player: 100 HP, 15 damage, 1.2 speed
Enemies: One with 40 HP, 10 damage, 0.8 speed, another with 50 HP, 12 damage, 1.0 speed
```

---

### 4. `simulate_skill_impact`

Simulates how effective a skill is based on its damage, area of effect, and cooldown.

#### Input Example:

```json
{
  "skill": {
    "damage": 80,
    "cooldown": 5,
    "area": 3
  },
  "enemies": [{ "hp": 100 }, { "hp": 80 }, { "hp": 60 }]
}
```

#### Prompt Example:

```
My skill deals 80 damage, has 5s cooldown, and hits 3 enemies.
Enemy HPs: 100, 80, 60
How good is this skill?
```

---

### 5. `suggest_difficulty_ramp`

Analyzes progression between levels and provides feedback on how smooth or steep the difficulty ramp is.

#### Input Example:

```json
{
  "levels": [
    { "name": "Forest", "enemyHp": 50 },
    { "name": "Cave", "enemyHp": 80 },
    { "name": "Castle", "enemyHp": 120 }
  ],
  "player": { "damage": 25, "attackSpeed": 1.0 }
}
```

#### Prompt Example:

```
My player deals 25 dmg/sec.
Forest enemies: 50 HP
Cave: 80 HP
Castle: 120 HP
Is this difficulty curve balanced?
```

---

### 6. `predict_performance_impact`

Scans a code snippet and provides feedback on potential performance issues.

#### Input Example:

```json
{
  "code": "for (let i = 0; i < 10000; i++) { this.spawnEnemy(); }"
}
```

#### Prompt Example:

```
Can you check this code for performance issues?

for (let i = 0; i < 10000; i++) {
  this.spawnEnemy();
}

Also, I sometimes use setInterval inside update(). Is that bad?
```

---

### 7. `suggest_ai_state_machine`

Creates an AI state machine suggestion based on natural language behavior.

#### Input Example:

```json
{
  "description": "This enemy walks around the map until it sees the player, then it chases them. If close enough, it attacks. If it loses sight, it goes back to patrolling."
}
```

#### Prompt Example:

```
This enemy walks around the map until it sees the player, then it chases them.
If close enough, it attacks. If it loses sight, it goes back to patrolling.
Can you suggest a state machine?
```

---

### 8. `suggest_wave_timing`

Suggests the ideal time between waves of enemies based on the player's DPS and enemy HP.

#### Input Example:

```json
{
  "player": { "damage": 30, "attackSpeed": 2 },
  "enemyHp": 100,
  "enemiesPerWave": 3
}
```

#### Prompt Example:

```
My player deals 30 damage per hit and attacks twice per second.
Each enemy has 100 HP, and I spawn 3 enemies per wave.
What should be the ideal time between waves?
```

---

## 🛠 How to Run Locally

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

3. Install the package globally:

```bash
npm install -g .
```

4. Make sure you register the server in your `.cursor-config.json`:

```json
{
  "mcpServers": {
    "mcp-game-helper": {
      "command": "npx",
      "args": ["-y", "mcp-game-helper"]
    }
  }
}
```

---

## 💡 Contributing

Feel free to suggest new useful commands for game developers — especially those focused on AI, balancing, and simulation!

---

## 📘 License

MIT
