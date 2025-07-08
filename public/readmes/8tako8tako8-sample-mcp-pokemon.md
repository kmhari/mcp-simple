# MCP Pokémon

このリポジトリは、ポケモンの情報を取得するための MCP サーバーです。

## 機能

- `getPokemonList`: ポケモンのリストを取得します
- `getPokemonCharacteristic`: 指定した ID のポケモンの特徴を取得します

## 使い方

### ビルド

```sh
npm run build
```

## Claude Desktop 側の設定

```json
{
  "mcpServers": {
    "pokemon": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/PARENT/FOLDER/sample_mcp_pokemon/build/index.js"
      ]
    }
  }
}
```

## API エンドポイント

このサーバーは、[PokeAPI](https://pokeapi.co/api/v2)を利用しています。

## tool

### getPokemonList

Pokémon のリストを取得します。

パラメータ:

- `limit`: 返す Pokémon の数（1〜10、デフォルト: 10）
- `offset`: ページネーションの開始インデックス（デフォルト: 0）

### getPokemonCharacteristic

指定した ID のポケモンの特徴を取得します。

パラメータ:

- `id`: Pokémon の ID
