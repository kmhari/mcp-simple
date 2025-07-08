# 🧮 MathsIA API

API RESTful pour MathsIA, un système de mémocartes pour l'apprentissage des mathématiques.

## 📚 Description

MathsIA API est une application FastAPI qui permet la gestion d'un système de mémocartes pour l'apprentissage des mathématiques. Elle propose des fonctionnalités pour les étudiants et les administrateurs, avec une gestion complète des utilisateurs, des mémocartes et du suivi des progrès.

## 🚀 Fonctionnalités

- 🔐 Authentification complète avec JWT
- 👨‍🎓 Gestion des profils étudiants
- 🧠 Système de mémocartes pour l'apprentissage
- 📊 Suivi des progrès des étudiants
- 🛠️ Interface d'administration
- 📝 Documentation API interactive

## 🛠️ Technologies utilisées

- [FastAPI](https://fastapi.tiangolo.com/) - Framework API moderne et rapide
- [MongoDB](https://www.mongodb.com/) - Base de données NoSQL
- [Motor](https://motor.readthedocs.io/) - Driver MongoDB asynchrone
- [Pydantic](https://pydantic-docs.helpmanual.io/) - Validation de données
- [Python-Jose](https://github.com/mpdavis/python-jose) - Gestion des JWT
- [Uvicorn](https://www.uvicorn.org/) - Serveur ASGI
- [FastAPI-MCP](https://github.com/TadataInc/fastapi-mcp) - Intégration Model Control Protocol pour l'IA

## 🏁 Mise en route

### Prérequis

- Python 3.8+
- MongoDB

### Installation

1. Cloner le dépôt
```bash
git clone https://github.com/nicolassaint/mathsIA_api.git
cd mathsIA_api
```

2. Installer les dépendances
```bash
pip install -r requirements.txt
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
# Modifier les valeurs dans .env selon votre environnement
```

4. Lancer l'application
```bash
python main.py
```

L'API sera disponible à l'adresse: http://localhost:8000

## 📖 Documentation API

La documentation interactive de l'API est disponible aux URLs suivantes:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- Serveur MCP: http://localhost:8000/mcp

### 🤖 Utilisation avec MCP (Model Control Protocol)

MathsIA API intègre FastAPI-MCP, permettant aux modèles d'IA comme Claude, GPT, et autres de contrôler l'API directement.

#### Connexion avec Cursor

1. Lancez l'application
2. Dans Cursor, allez dans Settings -> MCP
3. Utilisez l'URL `http://localhost:8000/mcp` comme source SSE
4. Cursor découvrira automatiquement toutes les commandes disponibles

#### Connexion avec Claude Desktop ou d'autres clients

1. Lancez l'application
2. Installez mcp-proxy: `uv tool install mcp-proxy`
3. Ajoutez dans le fichier de configuration de Claude Desktop:

```json
{
  "mcpServers": {
    "mathsia-api-mcp-proxy": {
        "command": "mcp-proxy",
        "args": ["http://127.0.0.1:8000/mcp"]
    }
  }
}
```

## 🔄 Endpoints principaux

### 🔑 Authentification

- `POST /api/login` - Authentification et obtention du token JWT
- `POST /api/refresh` - Rafraîchissement du token JWT

### 👨‍🎓 Étudiants (Admin)

- `GET /api/admin/students` - Liste des étudiants
- `POST /api/admin/students` - Création d'un étudiant
- `GET /api/admin/students/{id}` - Détails d'un étudiant
- `PUT /api/admin/students/{id}` - Mise à jour d'un étudiant
- `DELETE /api/admin/students/{id}` - Suppression d'un étudiant

### 🧠 Mémocartes (Admin)

- `GET /api/admin/memocards` - Liste des mémocartes
- `POST /api/admin/memocards` - Création d'une mémocarte
- `GET /api/admin/memocards/{id}` - Détails d'une mémocarte
- `PUT /api/admin/memocards/{id}` - Mise à jour d'une mémocarte
- `DELETE /api/admin/memocards/{id}` - Suppression d'une mémocarte

### 👤 Profil étudiant

- `GET /api/student/profile` - Obtenir le profil
- `PUT /api/student/profile` - Mettre à jour le profil

### 📇 Mémocartes (Étudiant)

- `GET /api/student/memocards` - Liste des mémocartes accessibles
- `GET /api/student/memocards/{id}` - Détails d'une mémocarte
- `POST /api/student/memocards/{id}/review` - Soumettre une révision

### 📈 Progrès (Étudiant)

- `GET /api/student/progress` - Statistiques globales de progression
- `GET /api/student/progress/memocards` - Progression par mémocarte

## 📝 Exemple d'utilisation

### Authentification

```bash
curl -X 'POST' \
  'http://localhost:8000/api/login' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "student@example.com",
  "password": "password123"
}'
```

Réponse:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Récupérer les mémocartes

```bash
curl -X 'GET' \
  'http://localhost:8000/api/student/memocards' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

Réponse:
```json
{
  "items": [
    {
      "id": "60d21b4667d0d8992e610c85",
      "title": "Dérivée d'une fonction",
      "content": "La dérivée de f(x) = x² est f'(x) = 2x",
      "category": "Calcul différentiel",
      "difficulty": 2
    },
    {
      "id": "60d21b4667d0d8992e610c86",
      "title": "Théorème de Pythagore",
      "content": "Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés",
      "category": "Géométrie",
      "difficulty": 1
    }
  ],
  "total": 2,
  "page": 1,
  "size": 10
}
```

## 👩‍💻 Développement

### Structure du projet

```
mathsIA_api/
├── app/
│   ├── api/
│   │   └── routes/         # Endpoints de l'API
│   ├── core/               # Configuration, sécurité
│   ├── db/                 # Configuration et connexion MongoDB
│   ├── middleware/         # Middlewares personnalisés
│   ├── models/             # Modèles de données pour MongoDB
│   ├── repositories/       # Couche d'accès aux données
│   ├── schemas/            # Schémas Pydantic  
│   └── services/           # Logique métier
├── .env                    # Variables d'environnement (à ne pas committer)
├── .env.example            # Exemple de variables d'environnement
├── .gitignore              # Fichiers à ignorer par Git
├── main.py                 # Point d'entrée de l'application
├── README.md               # Documentation
└── requirements.txt        # Dépendances Python
```