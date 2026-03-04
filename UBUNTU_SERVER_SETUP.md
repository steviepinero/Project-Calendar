# Ubuntu Server Setup with Docker – MSP Project Calendar

Commands to host the app on Ubuntu using **Docker** and the Git URL:  
**https://github.com/steviepinero/Project-Calendar.git**

---

## 1. Update system and install Docker

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git
```

Install Docker Engine and Docker Compose:

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

Log out and back in (or run `newgrp docker`) so your user can run Docker without `sudo`.

Verify:

```bash
docker --version
docker compose version
```

---

## 2. Clone the app

```bash
cd /opt
sudo git clone https://github.com/steviepinero/Project-Calendar.git msp-project-calendar
sudo chown -R $USER:$USER msp-project-calendar
cd msp-project-calendar
```

(You can use another path, e.g. `~/msp-project-calendar`.)

---

## 3. Environment file

```bash
cp env.example .env
nano .env
```

Set at least:

- **Database (used by both app and PostgreSQL container):**
  - `DB_HOST=localhost` (ignored in Docker; Compose sets `DB_HOST=db`)
  - `DB_PORT=5432`
  - `DB_NAME=msp_calendar_dev`
  - `DB_USER=postgres`
  - `DB_PASSWORD=` **strong password** (same value is used for the Postgres container)

- **Server:**
  - `NODE_ENV=production`
  - `PORT=8000`
  - `HOST=0.0.0.0`

- **Security:**
  - `JWT_SECRET=` **long random string**

- **CORS (origin where you open the app in the browser):**
  - Local/LAN: `CORS_ORIGIN=http://192.168.50.75:8000`
  - Or domain: `CORS_ORIGIN=https://calendar.yourdomain.com`

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

---

## 4. Build and start with Docker Compose

```bash
docker compose build
docker compose up -d
```

Check that both containers are running:

```bash
docker compose ps
```

Test the app:

```bash
curl http://localhost:8000/api/health
```

Expected: `{"status":"ok","message":"Server is running"}`.

---

## 5. Firewall

The app listens on **port 8000** by default. Open it (and 80/443 if using Nginx):

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
# App port (default 8000) – e.g. http://192.168.50.75:8000
sudo ufw allow 8000/tcp
sudo ufw enable
sudo ufw status
```

**Connection refused?** Use **port 8000**, not 8080 (e.g. `http://192.168.50.75:8000`). If you prefer 8080, set `PORT=8080` in `.env`, add `sudo ufw allow 8080/tcp`, and run `docker compose up -d` again.

---

## 6. Nginx reverse proxy (optional, for port 80/443 and SSL)

Install Nginx:

```bash
sudo apt install -y nginx
```

Create a site config (replace `calendar.yourdomain.com` with your domain):

```bash
sudo nano /etc/nginx/sites-available/msp-calendar
```

Paste (proxy to the app container on port 8000):

```nginx
server {
    listen 80;
    server_name calendar.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/msp-calendar /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

HTTPS with Let’s Encrypt:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d calendar.yourdomain.com
```

---

## 7. Syncfusion license (optional)

If you use Syncfusion UI, create the license file on the server (it’s not in Git):

```bash
nano syncfusion-license.js
```

Add (replace with your real key if different):

```javascript
if (typeof ej !== 'undefined' && ej.base) {
  ej.base.registerLicense('YOUR_SYNCFUSION_LICENSE_KEY');
  console.log('Syncfusion license registered');
}
```

Rebuild and restart so the file is in the image, or mount it with a volume in `docker-compose.yml`:

```yaml
# Under app service, add:
volumes:
  - ./syncfusion-license.js:/app/syncfusion-license.js:ro
```

Then:

```bash
docker compose up -d --build
```

---

## Useful Docker commands

| Command | Description |
|--------|-------------|
| `docker compose ps` | List running containers |
| `docker compose logs -f app` | Follow app logs |
| `docker compose logs -f db` | Follow database logs |
| `docker compose restart app` | Restart app only |
| `docker compose down` | Stop and remove containers (data volume kept) |
| `docker compose up -d --build` | Rebuild and start |

---

## Update the Docker instance from GitHub

When you push changes to **https://github.com/steviepinero/Project-Calendar** and want the server to run the latest code:

**On the Ubuntu server:**

```bash
cd /opt/msp-project-calendar
git pull origin main
docker compose build --no-cache app
docker compose up -d
```

- `git pull origin main` – fetches and merges the latest code from GitHub (use `master` if your default branch is `master`).
- Your `.env` and the `postgres_data` volume are not touched, so settings and database data stay as-is.

**One-liner (same as above):**

```bash
cd /opt/msp-project-calendar && git pull origin main && docker compose build --no-cache app && docker compose up -d
```

**If you get “Already up to date”** but want to force a rebuild (e.g. after changing dependencies):

```bash
cd /opt/msp-project-calendar
git fetch origin
git reset --hard origin/main
docker compose build --no-cache app
docker compose up -d
```

---

## Clone your local environment (.env) to the Ubuntu server

To use the same API keys and settings on the server as on your local machine, copy your local `.env` to the server. **Never commit `.env` to Git** (it’s in `.gitignore`).

### Option A: Copy from your local machine with SCP (Windows PowerShell or any terminal)

From your **local machine** (in the project folder, e.g. `c:\Users\stevi\msp-project-calendar`), run:

```powershell
scp .env USER@192.168.50.75:/opt/msp-project-calendar/.env
```

Replace `USER` with your Ubuntu username (e.g. `ubuntu`). You’ll be prompted for the server password (or use SSH keys for passwordless copy).

**Windows:** `scp` is available in PowerShell on Windows 10/11. If your server path is different, change `/opt/msp-project-calendar` to match.

### Option B: Copy using RSYNC (if installed locally)

```bash
rsync -avz .env USER@192.168.50.75:/opt/msp-project-calendar/.env
```

### Option C: Copy-paste manually

1. On your **local machine**, open `.env` and copy its full contents.
2. On the **server**, run:
   ```bash
   cd /opt/msp-project-calendar
   nano .env
   ```
3. Paste the contents, then adjust for production:
   - `NODE_ENV=production`
   - `CORS_ORIGIN=http://192.168.50.75:8000` (or your public URL)
   - `DB_PASSWORD` – must be a strong password; the Postgres container uses it too.
4. Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

### After copying .env to the server

Restart the app so it picks up the new env (including API keys):

```bash
cd /opt/msp-project-calendar
docker compose up -d
```

Docker Compose uses `env_file: .env`, so all variables (OpenAI, Twilio, DocuSign, SendGrid, etc.) are available inside the app container.

### Copy config.js (frontend API keys: OpenAI, Gemini)

The app loads **config.js** in the browser for API keys used by the frontend (e.g. OpenAI summarization, Gemini company intelligence). It’s gitignored; copy it from your local machine or create it from the example.

**Copy from local (same folder as `.env`):**

```powershell
scp config.js USER@192.168.50.75:/opt/msp-project-calendar/config.js
```

**Or on the server**, create it from the example and add your keys:

```bash
cd /opt/msp-project-calendar
cp config.example.js config.js
nano config.js   # add OPENAI_API_KEY and GEMINI_API_KEY
```

Docker Compose mounts `./config.js` into the app container, so the file is served at `/config.js` and the frontend can use `window.CONFIG`. Restart after adding or changing it:

```bash
docker compose up -d
```

---

## Quick reference – copy/paste block

Run in order on a fresh Ubuntu server (then edit `.env` with your values):

```bash
# System + Docker
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
# Log out and back in, or: newgrp docker

# Clone and configure
cd /opt
sudo git clone https://github.com/steviepinero/Project-Calendar.git msp-project-calendar
sudo chown -R $USER:$USER msp-project-calendar
cd msp-project-calendar
cp env.example .env
nano .env   # set DB_PASSWORD, JWT_SECRET, CORS_ORIGIN, NODE_ENV=production, PORT=8000

# Run
docker compose build
docker compose up -d
curl http://localhost:8000/api/health
```

The app will be available at `http://192.168.50.75:8000` (or your server’s IP). Use Nginx (section 6) for port 80/443 and HTTPS.

---

## Troubleshooting

- **Connection refused on port 8080** – The app uses **port 8000**. Use `http://YOUR_IP:8000`. To use 8080 instead, set `PORT=8080` in `.env`, run `sudo ufw allow 8080/tcp`, then `docker compose up -d`.
- **Connection refused on 8000** – Check: `docker compose ps` (both containers Up?), `docker compose logs app` (errors?). Ensure firewall allows 8000: `sudo ufw allow 8000/tcp && sudo ufw reload`. Open in browser: `http://192.168.50.75:8000`.
- **Still failing** – From the server run `curl http://localhost:8000/api/health`. If that works, the issue is firewall or network (security group / cloud firewall).
