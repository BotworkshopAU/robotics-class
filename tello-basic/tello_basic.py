"""Basic Tello flight: takeoff, hover 3 seconds, land. Steps are in STEPS.txt."""
import socket
import time

TELLO = ("192.168.10.1", 8889)
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("", 9000))
sock.settimeout(8)


def send(cmd, wait=4):
    print(">", cmd)
    sock.sendto(cmd.encode("utf-8"), TELLO)
    try:
        reply, _ = sock.recvfrom(1024)
        print("<", reply.decode(errors="replace"))
    except OSError:
        print("< (no reply)")
    time.sleep(wait)


send("command", 2)
send("takeoff", 8)
time.sleep(3)  # hover: lift = weight
send("land", 6)
sock.close()
