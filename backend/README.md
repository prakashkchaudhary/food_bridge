# FoodBridge Backend (Node + Express + MongoDB)

## Setup

1. Copy env file:

```powershell
Copy-Item .env.example .env
```

2. Update `.env` with your MongoDB URI and JWT secret.
3. Install packages:

```bash
npm install
```

4. Run in development:

```bash
npm run dev
```

## Windows MongoDB quick setup (persistent local data)

If you do not have MongoDB installed, install it once with:

```powershell
winget install -e --id MongoDB.Server --accept-package-agreements --accept-source-agreements
```

Then ensure the MongoDB service is running:

```powershell
Get-Service MongoDB
Start-Service MongoDB
```

With `MONGO_URI=mongodb://127.0.0.1:27017/foodbridge`, all backend data is persisted locally.

## API Base URL

`http://localhost:5000/api`

## Core Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `POST /food/add`
- `GET /food`
- `GET /food/:id`
- `PUT /food/update/:id`
- `DELETE /food/delete/:id`
- `POST /request/create`
- `GET /request/my`
- `PUT /request/update/:id`
- `GET /request/all`
- `GET /admin/users`
- `GET /admin/foods`
- `GET /admin/requests`
- `GET /admin/stats`

Use `Authorization: Bearer <token>` for protected routes.
