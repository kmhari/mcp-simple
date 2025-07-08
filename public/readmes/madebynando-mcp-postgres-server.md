# MCP Postgres Server

Ce serveur implémente le protocole MCP (Model Context Protocol) pour Cursor, permettant d'utiliser une base de données PostgreSQL comme stockage pour les contextes de modèle.

## Prérequis

- Docker
- Docker Compose

## Installation et démarrage

1. Clonez ce dépôt
2. Démarrez le serveur avec Docker Compose:

```bash
docker-compose up -d
```

## Configuration dans Cursor

1. Ouvrez Cursor
2. Allez dans Paramètres > MCP
3. Ajoutez une nouvelle connexion avec les paramètres suivants:
   - Nom: MCP Postgres Server
   - Type: command
   - Commande: `docker exec -i mcp-postgres-server node dist/index.js`

## Résolution des problèmes

Si le serveur ne démarre pas correctement:

1. Vérifiez les logs du conteneur:

   ```bash
   docker logs mcp-postgres-server
   ```

2. Pour redémarrer le serveur:

   ```bash
   docker-compose restart
   ```

## Fonctionnalités du serveur MCP

Le serveur MCP PostgreSQL expose les outils suivants pour Cursor:

1. `postgres_query` - Exécuter une requête SQL en lecture seule
2. `postgres_list_tables` - Lister toutes les tables de la base de données
3. `postgres_describe_table` - Obtenir le schéma d'une table spécifique

Ces outils permettent à Cursor d'explorer et d'interroger la base de données de manière sécurisée.
