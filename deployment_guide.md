# Deployment Guide: Railway & GitHub

This guide walks you through deploying your **Lioré Couture** platform (Next.js frontend, FastAPI backend, and PostgreSQL database) to **Railway** using your GitHub account.

---

## Step 1: Push Code to GitHub

1. Open your terminal in the root `website/` folder (which contains `frontend/` and `backend/`).
2. Initialize git, commit your changes, and push them to a new repository on your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Lioré Couture platform"
   # Create a repository on github.com, then run:
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Deploy PostgreSQL Database on Railway

1. Go to [railway.app](https://railway.app/) and sign in with your GitHub account.
2. Click **New Project** → **Provision PostgreSQL**.
3. Once initialized, click on the **Postgres** service card, go to the **Variables** tab, and copy the `DATABASE_URL` (starts with `postgresql://`).

---

## Step 3: Deploy the FastAPI Backend

1. In your Railway project dashboard, click **+ New** → **GitHub Repo** and select your repository.
2. Under the service settings, rename the service to `backend` (optional, for clarity).
3. **Settings**:
   * **Source Directory**: Change this to `/backend` (so Railway knows to build from the backend folder).
   * **Start Command**: Set this to:
     ```bash
     uvicorn app.main:app --host 0.0.0.0 --port $PORT
     ```
4. **Variables (Environment)**:
   Add the following variables in the **Variables** tab:
   * `DATABASE_URL`: Paste the `DATABASE_URL` from your Postgres service.
   * `SECRET_KEY`: Generate a random long string (e.g. `your-jwt-secret-key`).
   * `ALGORITHM`: `HS256`
   * `API_V1_STR`: `/api/v1`
   * `PROJECT_NAME`: `Lioré Couture API`
5. Click **Deploy**. Railway will automatically generate a public URL for your backend (e.g. `https://backend-production.up.railway.app`). Copy this URL.

---

## Step 4: Deploy the Next.js Frontend

1. In your Railway project dashboard, click **+ New** → **GitHub Repo** and select the same repository again.
2. Rename this service to `frontend`.
3. **Settings**:
   * **Source Directory**: Change this to `/frontend`.
4. **Variables (Environment)**:
   * `NEXT_PUBLIC_API_URL`: Paste the live backend URL you copied from Step 3 (including `/api/v1` at the end, e.g. `https://backend-production.up.railway.app/api/v1`).
5. Click **Deploy**. Next.js will build and run on a public Railway domain.

---

## Step 5: Update CORS on the Backend

Once your frontend has a live domain (e.g. `https://frontend-production.up.railway.app`), you must update the backend CORS list so the frontend can securely talk to it:

1. Open `backend/app/main.py` in your code editor.
2. Add your live frontend domain to the `origins` list:
   ```python
   origins = [
       "http://localhost:3000",
       "http://127.0.0.1:3000",
       "https://your-frontend-domain.up.railway.app", # Add this line
   ]
   ```
3. Commit and push the change to GitHub. Railway will automatically rebuild and redeploy your backend!
