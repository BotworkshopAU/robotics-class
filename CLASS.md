# Class night (after Hostinger)

Students use the **live website** for blocks. Upload with **Arduino IDE** on each laptop.

They do **not** need Kidsblock, Arduino CLI, or browser USB flashing.

## Before class — every laptop

1. [Arduino IDE](https://academy.arduino.cc/pages/download-software) (desktop, not Microsoft Store).
2. Tools → Board → **Arduino Uno**.
3. [Silicon Labs CP210x UART](https://www.silabs.com/software-and-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads) (Windows and Mac).
4. Blink once with Bluetooth unplugged (first compile can be slow).

## In class

1. Open your site → Foundation class hub → **Coding** (new page).
2. Turtle or Tello → build blocks → Download.
3. Turtle: open `turtle.ino` in Arduino IDE → Upload (Bluetooth out, DIP ON for motors).
4. Tello: join `TELLO-xxxxxx`, run the Python file (test flight from Setup if needed).

## Optional: local teacher PC instead of Hostinger

```bash
npm run dev
```

Or share on the room Wi‑Fi / hotspot:

```bash
npm run dev:lan
```

Then students open `http://YOUR_IP:5173/`.
