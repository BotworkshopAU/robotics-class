import * as Blockly from "blockly";
import { getLang, ui } from "./i18n.js";

export function defineTelloBlocks(lang = getLang()) {
  const t = ui(lang).tello;
  const define =
    Blockly.common?.defineBlocksWithJsonArray || Blockly.defineBlocksWithJsonArray;
  define([
    {
      type: "tello_start",
      message0: t.start,
      nextStatement: null,
      colour: 200,
      tooltip: t.startTip,
    },
    {
      type: "tello_takeoff",
      message0: t.takeoff,
      previousStatement: null,
      nextStatement: null,
      colour: 210,
      tooltip: t.takeoffTip,
    },
    {
      type: "tello_land",
      message0: t.land,
      previousStatement: null,
      nextStatement: null,
      colour: 210,
      tooltip: t.landTip,
    },
    {
      type: "tello_hover",
      message0: t.hover,
      args0: [
        {
          type: "field_number",
          name: "SECS",
          value: 3,
          min: 0.5,
          max: 20,
          precision: 0.5,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 160,
      tooltip: t.hoverTip,
    },
    {
      type: "tello_up",
      message0: t.up,
      args0: [
        {
          type: "field_number",
          name: "CM",
          value: 40,
          min: 20,
          max: 200,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210,
      tooltip: t.upTip,
    },
    {
      type: "tello_down",
      message0: t.down,
      args0: [
        {
          type: "field_number",
          name: "CM",
          value: 40,
          min: 20,
          max: 200,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210,
      tooltip: t.downTip,
    },
    {
      type: "tello_forward",
      message0: t.forward,
      args0: [
        {
          type: "field_number",
          name: "CM",
          value: 40,
          min: 20,
          max: 200,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 230,
      tooltip: t.forwardTip,
    },
    {
      type: "tello_back",
      message0: t.back,
      args0: [
        {
          type: "field_number",
          name: "CM",
          value: 40,
          min: 20,
          max: 200,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 230,
    },
    {
      type: "tello_left",
      message0: t.left,
      args0: [
        {
          type: "field_number",
          name: "CM",
          value: 40,
          min: 20,
          max: 200,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 230,
    },
    {
      type: "tello_right",
      message0: t.right,
      args0: [
        {
          type: "field_number",
          name: "CM",
          value: 40,
          min: 20,
          max: 200,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 230,
    },
    {
      type: "tello_cw",
      message0: t.cw,
      args0: [
        {
          type: "field_number",
          name: "DEG",
          value: 90,
          min: 1,
          max: 360,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 260,
      tooltip: t.cwTip,
    },
    {
      type: "tello_ccw",
      message0: t.ccw,
      args0: [
        {
          type: "field_number",
          name: "DEG",
          value: 90,
          min: 1,
          max: 360,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 260,
    },
    {
      type: "tello_speed",
      message0: t.speed,
      args0: [
        {
          type: "field_number",
          name: "SPEED",
          value: 30,
          min: 10,
          max: 100,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 20,
      tooltip: t.speedTip,
    },
    {
      type: "tello_wait",
      message0: t.wait,
      args0: [
        {
          type: "field_number",
          name: "SECS",
          value: 2,
          min: 0.5,
          max: 20,
          precision: 0.5,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 120,
    },
    {
      type: "tello_repeat",
      message0: t.repeat,
      args0: [
        { type: "field_number", name: "TIMES", value: 4, min: 1, max: 10 },
        { type: "input_dummy" },
        { type: "input_statement", name: "DO" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 120,
    },
  ]);
}

export function getTelloToolbox(lang = getLang()) {
  const c = ui(lang).cat;
  return {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: c.start,
        colour: "200",
        contents: [{ kind: "block", type: "tello_start" }],
      },
      {
        kind: "category",
        name: c.lift,
        colour: "210",
        contents: [
          { kind: "block", type: "tello_takeoff" },
          { kind: "block", type: "tello_land" },
          { kind: "block", type: "tello_hover" },
          { kind: "block", type: "tello_up" },
          { kind: "block", type: "tello_down" },
        ],
      },
      {
        kind: "category",
        name: c.thrust,
        colour: "230",
        contents: [
          { kind: "block", type: "tello_forward" },
          { kind: "block", type: "tello_back" },
          { kind: "block", type: "tello_left" },
          { kind: "block", type: "tello_right" },
          { kind: "block", type: "tello_speed" },
        ],
      },
      {
        kind: "category",
        name: c.yaw,
        colour: "260",
        contents: [
          { kind: "block", type: "tello_cw" },
          { kind: "block", type: "tello_ccw" },
        ],
      },
      {
        kind: "category",
        name: c.control,
        colour: "120",
        contents: [
          { kind: "block", type: "tello_wait" },
          { kind: "block", type: "tello_repeat" },
        ],
      },
    ],
  };
}

/** @deprecated use getTelloToolbox() */
export const telloToolbox = getTelloToolbox("en");


function startNext(block) {
  return {
    blocks: {
      languageVersion: 0,
      blocks: [
        {
          type: "tello_start",
          id: "tello-start",
          x: 40,
          y: 40,
          next: { block },
        },
      ],
    },
  };
}

export function telloStarterWorkspace() {
  return startNext({
    type: "tello_takeoff",
    next: {
      block: {
        type: "tello_hover",
        fields: { SECS: 3 },
        next: { block: { type: "tello_land" } },
      },
    },
  });
}

export const telloDemos = {
  takeoff: startNext({
    type: "tello_takeoff",
    next: { block: { type: "tello_land" } },
  }),
  hover: telloStarterWorkspace(),
  forward: startNext({
    type: "tello_takeoff",
    next: {
      block: {
        type: "tello_forward",
        fields: { CM: 40 },
        next: {
          block: {
            type: "tello_back",
            fields: { CM: 40 },
            next: { block: { type: "tello_land" } },
          },
        },
      },
    },
  }),
  climb: startNext({
    type: "tello_takeoff",
    next: {
      block: {
        type: "tello_up",
        fields: { CM: 50 },
        next: {
          block: {
            type: "tello_hover",
            fields: { SECS: 2 },
            next: {
              block: {
                type: "tello_down",
                fields: { CM: 50 },
                next: { block: { type: "tello_land" } },
              },
            },
          },
        },
      },
    },
  }),
  square: startNext({
    type: "tello_takeoff",
    next: {
      block: {
        type: "tello_speed",
        fields: { SPEED: 30 },
        next: {
          block: {
            type: "tello_repeat",
            fields: { TIMES: 4 },
            inputs: {
              DO: {
                block: {
                  type: "tello_forward",
                  fields: { CM: 40 },
                  next: {
                    block: { type: "tello_cw", fields: { DEG: 90 } },
                  },
                },
              },
            },
            next: { block: { type: "tello_land" } },
          },
        },
      },
    },
  }),
  yaw: startNext({
    type: "tello_takeoff",
    next: {
      block: {
        type: "tello_hover",
        fields: { SECS: 2 },
        next: {
          block: {
            type: "tello_cw",
            fields: { DEG: 90 },
            next: {
              block: {
                type: "tello_wait",
                fields: { SECS: 1 },
                next: {
                  block: {
                    type: "tello_ccw",
                    fields: { DEG: 90 },
                    next: { block: { type: "tello_land" } },
                  },
                },
              },
            },
          },
        },
      },
    },
  }),
};

const telloGen = new Blockly.Generator("TelloPython");
telloGen.PRECEDENCE = 0;
telloGen.scrub_ = function (block, code, thisOnly) {
  const next = block.nextConnection && block.nextConnection.targetBlock();
  const more = !thisOnly && next ? this.blockToCode(next) : "";
  return code + more;
};

function num(block, name) {
  return Number(block.getFieldValue(name));
}

function moveWait(cm) {
  return Math.max(4, Math.round(Number(cm) / 25) + 2);
}

telloGen.forBlock["tello_start"] = function (block) {
  return telloGen.statementToCode(block, "DO");
};
telloGen.forBlock["tello_takeoff"] = () => `send("takeoff", 8)\n`;
telloGen.forBlock["tello_land"] = () => `send("land", 6)\n`;
telloGen.forBlock["tello_hover"] = (block) =>
  `time.sleep(${num(block, "SECS")})  # hover: lift = weight\n`;
telloGen.forBlock["tello_up"] = (block) => {
  const cm = num(block, "CM");
  return `send("up ${cm}", ${moveWait(cm)})\n`;
};
telloGen.forBlock["tello_down"] = (block) => {
  const cm = num(block, "CM");
  return `send("down ${cm}", ${moveWait(cm)})\n`;
};
telloGen.forBlock["tello_forward"] = (block) => {
  const cm = num(block, "CM");
  return `send("forward ${cm}", ${moveWait(cm)})\n`;
};
telloGen.forBlock["tello_back"] = (block) => {
  const cm = num(block, "CM");
  return `send("back ${cm}", ${moveWait(cm)})\n`;
};
telloGen.forBlock["tello_left"] = (block) => {
  const cm = num(block, "CM");
  return `send("left ${cm}", ${moveWait(cm)})\n`;
};
telloGen.forBlock["tello_right"] = (block) => {
  const cm = num(block, "CM");
  return `send("right ${cm}", ${moveWait(cm)})\n`;
};
telloGen.forBlock["tello_cw"] = (block) =>
  `send("cw ${num(block, "DEG")}", 4)\n`;
telloGen.forBlock["tello_ccw"] = (block) =>
  `send("ccw ${num(block, "DEG")}", 4)\n`;
telloGen.forBlock["tello_speed"] = (block) =>
  `send("speed ${num(block, "SPEED")}", 1)\n`;
telloGen.forBlock["tello_wait"] = (block) =>
  `time.sleep(${num(block, "SECS")})\n`;
telloGen.forBlock["tello_repeat"] = function (block) {
  const n = block.getFieldValue("TIMES");
  const inner = telloGen.statementToCode(block, "DO") || "    time.sleep(0.2)\n";
  return `for _ in range(${n}):\n${inner}`;
};

export function workspaceToTelloPython(workspace) {
  const hats = workspace.getBlocksByType("tello_start", false);
  let body = "";
  if (hats.length) {
    const first = hats[0].getNextBlock();
    body = first ? telloGen.blockToCode(first) : "";
  } else {
    body = telloGen.workspaceToCode(workspace);
  }
  if (!/\bsend\("land"/.test(body)) {
    body += `send("land", 6)\n`;
  }

  return `"""BotWorkshop Tello mission
Physics of flight: lift, weight, thrust, drag.

1. Charge Tello. On this PC join Wi-Fi TELLO-xxxxxx (no internet). Close the phone app.
2. This file is your block program: py -3 tello_mission.py
3. Test flight (keys + camera) is a separate download on the Setup tab.
Indoor, stay low. Official max: 13 min, 100 m, 8 m/s, 30 m height.
"""
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
${body}sock.close()
`;
}
