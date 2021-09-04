# HoloRPG

> Multi-platform MMORPG text-based game for players to hunt on the go. The game is revolved around the concept of players placing bounties on each other, competing to be the richest on the leaderboard.

## Table of Contents

- [Features](#features)
- [Platforms](#platforms)
- [Development](#development)
  - [Environment variables](#environment-variables)
  - [Configuration](#configuration)
  - [Installation of dependencies](#installation-of-dependencies)

## Features

| Feature         | Description                                                                                | Released             |
| --------------- | ------------------------------------------------------------------------------------------ | :------------------: |
| Bounty          | Place bounties on other players to make them lose their wealth                             | :heavy_check_mark:   |
| Leaderboards    | View the global standings of players                                                       | :heavy_check_mark:   |
| Shop            | Purchase in-game items to enhance players' statistics                                      | :heavy_check_mark:   |
| Properties      | Maintain properties that generate hourly income                                            | :heavy_check_mark:   |
| Class Selection | Choose individual classes with unique statistics                                           | :x:                  |
| PvP             | Attack players that are not on the bounty list to plunder their wealth                     | :x:                  |
| Stocks          | Gain additional income through trading stocks or receive dividends through passive stocks  | :x:                  |
| Friends         | Forge meaningful connections/aliances to take down other players                           | :x:                  |

## Platforms

Below is a list of platforms that is currently supported:
| Platform | Supported          |
| -------- | :----------------: |
| Web App  | :heavy_check_mark: |
| Discord  | :x:                |
| Telegram | :x:                |

## Development
### Environment variables
Environment variables are required to be injected at at build time.
- [frontend/.env.example](frontend/.env.example)
- [backend/.env.example](backend/.env.example)

Simply rename .env.example to .env with the necessary configurations and place it in the root directory of each folder

### Configuration
- Refer to [docs/frontend](docs/frontend.md) for details
- Refer to [docs/backend](docs/backend.md) for details

### Installation of dependencies
#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend

# Usage of Virtual Env
python3 -m venv .
source venv/bin/activate

# Installs dependencies
pip3 install -r requirements.txt

# Migration of MySQL DB
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py loaddata data.json    # Load fixtures
```
