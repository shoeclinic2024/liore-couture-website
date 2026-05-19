# Free Deployment Guide: Vercel + Render + Supabase

You can deploy the entire Lioré Couture website and backend completely for free using the following stack:

1. **Database**: **Supabase** (Free permanent PostgreSQL database)
2. **Backend**: **Render** (Free hosting for the FastAPI web server)
3. **Frontend**: **Vercel** (Free hosting for the Next.js frontend)

---

## Step 1: Create a PostgreSQL Database on Supabase

1. Go to [supabase.com](https://supabase.com/) and click **Sign Up** (or log in via GitHub).
2. Create a new project named `liore-db`. Set a strong database password.
3. Choose the **Free Tier**.
4. Once the project is ready, go to **Project Settings** → **Database** → **Connection String** → **URI**.
5. Copy the connection string. Replace `[YOUR-PASSWORD]` with the database password you chose.
   * *Example string:* `postgresql://postgres:[PASSWORD]@db.xxxx.supabase.co:5432/postgres`

---

## Step 2: Deploy the FastAPI Backend on Koyeb

1. Go to [koyeb.com](https://www.koyeb.com/) and sign up or sign in using GitHub.
2. Click **Create Service**.
3. Select **GitHub** as the deployment method.
4. Select your repository `liore-couture-website` (if not shown, follow the prompt on Koyeb to grant access to the repo).
5. Configure the Koyeb service settings:
   * **App Name**: `liore-couture`
   * **Builder**: Select **Buildpack** (it will auto-detect Python using our `Procfile` and `requirements.txt`).
   * **Subdirectory**: Set to `backend` (this is critical so it deploys the backend subfolder).
   * **Instance Type**: Choose **Eco** (free tier).
6. Under **Environment Variables**, add the following:
   * `DATABASE_URL`: Paste the Supabase connection string from Step 1.
   * `SECRET_KEY`: Generate a random long string (e.g. `your-jwt-secret-key`).
   * `ALGORITHM`: `HS256`
   * `API_V1_STR`: `/api/v1`
   * `PROJECT_NAME`: `Lioré Couture API`
7. Under **Ports**:
   * Internal Port: Set to `8000` (FastAPI's port).
   * Path: Set to `/`.
8. Click **Deploy**. Koyeb will build and deploy the backend. Once active, copy the public URL provided by Koyeb (e.g., `https://liore-couture-xxxx.koyeb.app`).

---

## Step 3: Deploy the Next.js Frontend on Vercel

1. Go to [vercel.com](https://vercel.com/) and sign in using your GitHub account.
2. Click **Add New** → **Project**.
3. Import your GitHub repository `liore-couture-website`.
4. Configure the Project settings:
   * **Framework Preset**: `Next.js`
   * **Root Directory**: Click Edit and select `frontend`.
5. Under **Environment Variables**, add:
   * **Key**: `NEXT_PUBLIC_API_URL`
   * **Value**: Paste your Koyeb backend API URL (with `/api/v1` appended, e.g., `https://liore-couture-xxxx.koyeb.app/api/v1`).
6. Click **Deploy**. Vercel will build and host your frontend on a free `.vercel.app` domain.

---

## Step 4: Update CORS Settings on the Backend

Once Vercel gives you your frontend URL (e.g., `https://liore-couture-website.vercel.app`):
1. In your local editor, open `backend/app/main.py`.
2. Add the Vercel URL to the `origins` list:
   ```python
   origins = [
       "http://localhost:3000",
       "http://127.0.0.1:3000",
       "https://your-app-name.vercel.app",  # Add your live Vercel URL
   ]
   ```
3. Commit and push the changes:
   ```bash
   git add .
   git commit -m "Update backend CORS for Vercel domain"
   git push origin main
   ```
4. Koyeb will automatically rebuild and apply the updated CORS settings. Your website is now fully live and connected!

