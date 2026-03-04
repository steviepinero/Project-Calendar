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

- **CORS (your public URL):**
  - `CORS_ORIGIN=https://calendar.yourdomain.com` or `http://YOUR_SERVER_IP:8000`

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
# App port (default 8000) – use this in browser: http://YOUR_IP:8000
sudo ufw allow 8000/tcp
sudo ufw enable
sudo ufw status
```

**Connection refused?** Use **port 8000**, not 8080: `http://YOUR_SERVER_IP:8000`. If you prefer 8080, set `PORT=8080` in `.env`, add `sudo ufw allow 8080/tcp`, and run `docker compose up -d` again.

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

## Updating the app (pull and redeploy)

```bash
cd /opt/msp-project-calendar
git pull
docker compose build --no-cache app
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

The app will be available at `http://YOUR_SERVER_IP:8000`. Use Nginx (section 6) for port 80/443 and HTTPS.

---

## Troubleshooting

- **Connection refused on port 8080** – The app uses **port 8000**. Use `http://YOUR_IP:8000`. To use 8080 instead, set `PORT=8080` in `.env`, run `sudo ufw allow 8080/tcp`, then `docker compose up -d`.
- **Connection refused on 8000** – Check: `docker compose ps` (both containers Up?), `docker compose logs app` (errors?). Ensure firewall allows 8000: `sudo ufw allow 8000/tcp && sudo ufw reload`.
- **Still failing** – From the server run `curl http://localhost:8000/api/health`. If that works, the issue is firewall or network (security group / cloud firewall).
