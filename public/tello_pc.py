"""BotWorkshop — fly Tello from this PC, with camera.

1. Charge Tello. Power it on.
2. On this PC, join Wi-Fi named TELLO-xxxxxx (you will lose internet).
3. Close the Tello phone app (only one device should talk to the drone).
4. Install Python 3, then a camera decoder (pick one):

     Windows:  winget install --id Gyan.FFmpeg -e
     Mac:      brew install ffmpeg
     or:       py -3 -m pip install opencv-python

   FFmpeg must be on PATH so `ffplay -version` works. Restart the terminal after install.

5. Run:

     py -3 tello_pc.py

Keys (hold arrows on Windows):
  Space  takeoff / land (toggles)
  Arrows  forward, back, left, right
  r / f   up / down
  q / e   yaw
  c       camera on / off
  Esc     emergency

On Mac, type a word then Enter: space, up, down, left, right, r, f, q, e, c, esc
"""
from __future__ import annotations

import os
import shutil
import socket
import subprocess
import sys
import time
from multiprocessing import Process
from pathlib import Path

TELLO = ("192.168.10.1", 8889)
SPEED = 40
VIDEO = "udp://0.0.0.0:11111"

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("", 9000))
sock.settimeout(0.3)

airborne = False
ffplay_proc: subprocess.Popen | None = None
opencv_proc: Process | None = None


def send(cmd: str, wait: float = 0.0) -> str:
    print(">", cmd)
    sock.sendto(cmd.encode("utf-8"), TELLO)
    reply = ""
    if wait <= 0:
        return reply
    deadline = time.time() + wait
    while time.time() < deadline:
        try:
            data, _ = sock.recvfrom(1024)
            reply = data.decode(errors="replace")
            print("<", reply)
            return reply
        except OSError:
            pass
    print("< (no reply)")
    return reply


def rc(lr: int, fb: int, ud: int, yaw: int) -> None:
    send(f"rc {lr} {fb} {ud} {yaw}", 0)


def camera_running() -> bool:
    if ffplay_proc is not None and ffplay_proc.poll() is None:
        return True
    if opencv_proc is not None and opencv_proc.is_alive():
        return True
    return False


def opencv_viewer() -> None:
    import cv2

    cap = cv2.VideoCapture(VIDEO, cv2.CAP_FFMPEG)
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
    if not cap.isOpened():
        print("OpenCV could not open the Tello stream.")
        return
    print("Camera window open. Close it or press c in the controller to stop.")
    while True:
        ok, frame = cap.read()
        if ok:
            cv2.imshow("Tello camera", frame)
        if cv2.waitKey(1) & 0xFF in (27, ord("q")):
            break
    cap.release()
    cv2.destroyAllWindows()


def find_ffplay() -> str | None:
    found = shutil.which("ffplay")
    if found:
        return found
    # Winget Gyan.FFmpeg often installs under LocalAppData but PATH may lag.
    local = os.environ.get("LOCALAPPDATA", "")
    if local:
        root = Path(local) / "Microsoft" / "WinGet" / "Packages"
        if root.is_dir():
            for match in root.glob("Gyan.FFmpeg*/ffmpeg-*/bin/ffplay.exe"):
                return str(match)
    for folder in (
        Path(r"C:\ffmpeg\bin"),
        Path(r"C:\Program Files\ffmpeg\bin"),
    ):
        candidate = folder / "ffplay.exe"
        if candidate.is_file():
            return str(candidate)
    return None


def start_camera() -> None:
    global ffplay_proc, opencv_proc
    if camera_running():
        print("Camera already on.")
        return
    send("streamon", 2)
    ffplay = find_ffplay()
    if ffplay:
        ffplay_proc = subprocess.Popen(
            [
                ffplay,
                "-fflags",
                "nobuffer",
                "-flags",
                "low_delay",
                "-framedrop",
                "-loglevel",
                "error",
                "-i",
                VIDEO,
            ],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        print("Camera: ffplay window. Press c to close it.")
        return
    try:
        import cv2  # noqa: F401
    except ImportError:
        print("No camera decoder found.")
        print("  Windows:  winget install --id Gyan.FFmpeg -e")
        print("  then close this window and open a NEW terminal, or:  py -3 -m pip install opencv-python")
        send("streamoff", 1)
        return
    opencv_proc = Process(target=opencv_viewer, daemon=True)
    opencv_proc.start()
    print("Camera: OpenCV window. Press c to close it.")


def stop_camera() -> None:
    global ffplay_proc, opencv_proc
    if ffplay_proc is not None:
        ffplay_proc.terminate()
        try:
            ffplay_proc.wait(timeout=3)
        except subprocess.TimeoutExpired:
            ffplay_proc.kill()
        ffplay_proc = None
    if opencv_proc is not None:
        opencv_proc.terminate()
        opencv_proc = None
    send("streamoff", 1)
    print("Camera off.")


def sticks_from_key(key: str) -> tuple[int, int, int, int] | None:
    k = key.lower()
    if k in ("up", "arrow-up"):
        return (0, SPEED, 0, 0)
    if k in ("down", "arrow-down"):
        return (0, -SPEED, 0, 0)
    if k in ("left", "arrow-left"):
        return (-SPEED, 0, 0, 0)
    if k in ("right", "arrow-right"):
        return (SPEED, 0, 0, 0)
    if k == "r":
        return (0, 0, SPEED, 0)
    if k == "f":
        return (0, 0, -SPEED, 0)
    if k == "q":
        return (0, 0, 0, -SPEED)
    if k == "e":
        return (0, 0, 0, SPEED)
    if k == "h":
        return (0, 0, 0, 0)
    return None


def takeoff_or_land() -> None:
    global airborne
    rc(0, 0, 0, 0)
    if airborne:
        send("land", 6)
        airborne = False
        print("Landed. Space = takeoff again.")
    else:
        send("takeoff", 8)
        airborne = True
        print("In the air. Space = land. Arrows = fly.")


def handle_command(key: str) -> None:
    global airborne
    k = key.lower()
    if k in ("x", "esc", "\x1b"):
        send("emergency", 1)
        airborne = False
        return
    if k in (" ", "space"):
        takeoff_or_land()
        return
    if k == "c":
        if camera_running():
            stop_camera()
        else:
            start_camera()
        return
    if k == "p":
        print("battery", send("battery?", 2))
        return
    sticks = sticks_from_key(k)
    if sticks:
        rc(*sticks)


def read_windows_key() -> str | None:
    import msvcrt

    if not msvcrt.kbhit():
        return None
    ch = msvcrt.getwch()
    if ch == "\x03":
        raise KeyboardInterrupt
    if ch in ("\xe0", "\x00"):
        extra = msvcrt.getwch()
        arrows = {"H": "up", "P": "down", "K": "left", "M": "right"}
        return arrows.get(extra, "")
    if ch == " ":
        return "space"
    if ch == "\x1b":
        return "esc"
    return ch


def ensure_tello() -> bool:
    reply = send("command", 3).strip().lower()
    if reply == "ok":
        print("Tello ready.")
        return True
    print()
    print("Tello did not answer. Fix Wi-Fi, then run again:")
    print("  1. Power on Tello (LED blinking).")
    print("  2. On THIS PC, join Wi-Fi named TELLO-xxxxxx (you will lose internet).")
    print("  3. Close the Tello phone app completely (only one device can talk to it).")
    print("  4. Confirm: in a browser, nothing loads — that is normal on Tello Wi-Fi.")
    print()
    return False


def windows_live() -> None:
    print("Space = takeoff / land. Arrows = direction. c = camera. Esc = emergency.")
    last_move = 0.0
    if not ensure_tello():
        return
    start_camera()
    while True:
        ch = read_windows_key()
        if ch:
            handle_command(ch)
            if sticks_from_key(ch):
                last_move = time.time()
        elif time.time() - last_move > 0.35 and last_move:
            rc(0, 0, 0, 0)
            last_move = 0.0
        time.sleep(0.02)


def typed_loop() -> None:
    print("Type then Enter: space  up  down  left  right  r  f  q  e  c  esc  |  quit")
    if not ensure_tello():
        return
    start_camera()
    while True:
        try:
            line = input("> ").strip()
        except EOFError:
            break
        if not line or line.lower() in ("quit", "exit"):
            break
        token = line.lower()
        if token in ("space", "up", "down", "left", "right", "esc"):
            handle_command(token)
        else:
            handle_command(token[0])


def main() -> None:
    print("Connecting to Tello at 192.168.10.1 …")
    print("Wi-Fi must be TELLO-xxxxxx on this PC.")
    try:
        if sys.platform == "win32":
            windows_live()
        else:
            typed_loop()
    except KeyboardInterrupt:
        print("\nStopping.")
    finally:
        try:
            rc(0, 0, 0, 0)
            stop_camera()
            send("land", 4)
        except OSError:
            pass
        sock.close()


if __name__ == "__main__":
    main()
