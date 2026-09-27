# BotWorkshop site

Static site for Hostinger: Home, Courses, Products, Foundation class hub, Turtle/Tello coding.

## Local preview

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/`. Optional LAN preview: `npm run dev:lan`.

## Upcoming workshop (no rebuild)

Edit **`workshop.json`** in Hostinger `public_html` (same folder as `index.html`).
Change the date, title, and blurb there. Set `"enabled": false` to hide the upcoming card.

Register is only on the **Home** page (email or Instagram).

## Hostinger

1. `npm run build`
2. Upload **everything inside** `dist/` into Hostinger `public_html` (domain root).
3. Students use the live site for blocks; upload sketches with Arduino IDE on each laptop (UART driver as on the Setup tab).

No Node, compile API, or SSL on the server — plain HTML/CSS/JS.

Upcoming date is set in **`workshop.json`** on the server (no redeploy). Register on Home by email or Instagram (`botworkshopau@gmail.com` / Instagram chat).
