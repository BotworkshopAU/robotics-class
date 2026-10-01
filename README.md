# BotWorkshop site

Static site for day robotics workshops: Home, Courses, Products, Explore, Foundation class hub, Turtle/Tello coding.

## Live site (browse only)

**https://botworkshopau.github.io/robotics-class/**

GitHub Pages hosts the public site for learning and browsing. **Upload to Turtle does not work there** — flashing needs a local compile service on the same PC as the USB cable.

## Upload to Turtle (local only)

To program the Turtle from the browser on a laptop:

1. **Download / clone this project** onto that PC (not just open the Pages URL).
2. Install once:
   ```bash
   npm install
   npm run setup:cli   # Arduino CLI + Uno core + Servo + IRremote libraries
   ```
3. Run the site locally every class session:
   ```bash
   npm run dev
   ```
4. In Chrome or Edge open `http://localhost:5173/code.html`, plug in USB, unplug Bluetooth, then **Upload to Turtle**.

The compile API listens on `127.0.0.1` only (this machine). The public website cannot flash robots by design.

Site without compile API (browse / Download .ino only): `npm run vite`.

## Hosting (GitHub Pages — free)

Updates: push to `private/botworkshop-site` or `main` — GitHub Actions builds and deploys automatically.

Upcoming workshop date: edit `public/workshop.json` and push.

Register is only on the **Home** page (email or Instagram).
