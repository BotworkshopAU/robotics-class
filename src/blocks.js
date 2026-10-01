import * as Blockly from "blockly";
import "./field_matrix.js";
import { getLang, ui } from "./i18n.js";

export function defineTurtleBlocks(lang = getLang()) {
  const t = ui(lang).turtle;
  const define = Blockly.common?.defineBlocksWithJsonArray || Blockly.defineBlocksWithJsonArray;
  define([
    {
      type: "turtle_start",
      message0: t.start,
      nextStatement: null,
      colour: 20,
      tooltip: t.startTip,
    },
    {
      type: "turtle_forward",
      message0: t.forward,
      args0: [
        {
          type: "field_number",
          name: "SECS",
          value: 1,
          min: 0,
          max: 30,
          precision: 0.1,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210,
    },
    {
      type: "turtle_backward",
      message0: t.backward,
      args0: [
        {
          type: "field_number",
          name: "SECS",
          value: 1,
          min: 0,
          max: 30,
          precision: 0.1,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210,
    },
    {
      type: "turtle_left",
      message0: t.left,
      args0: [
        {
          type: "field_number",
          name: "SECS",
          value: 0.5,
          min: 0,
          max: 30,
          precision: 0.1,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210,
    },
    {
      type: "turtle_right",
      message0: t.right,
      args0: [
        {
          type: "field_number",
          name: "SECS",
          value: 0.5,
          min: 0,
          max: 30,
          precision: 0.1,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210,
    },
    {
      type: "turtle_stop",
      message0: t.stop,
      previousStatement: null,
      nextStatement: null,
      colour: 210,
    },
    {
      type: "turtle_speed",
      message0: t.speed,
      args0: [
        {
          type: "field_number",
          name: "SPEED",
          value: 160,
          min: 0,
          max: 255,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210,
    },
    {
      type: "turtle_led",
      message0: t.led,
      args0: [
        {
          type: "field_dropdown",
          name: "STATE",
          options: [
            [t.ledOn, "HIGH"],
            [t.ledOff, "LOW"],
          ],
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 45,
    },
    {
      type: "turtle_wait",
      message0: t.wait,
      args0: [
        {
          type: "field_number",
          name: "SECS",
          value: 1,
          min: 0,
          max: 60,
          precision: 0.1,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 120,
    },
    {
      type: "turtle_forever",
      message0: t.forever,
      args0: [
        { type: "input_dummy" },
        { type: "input_statement", name: "DO" },
      ],
      previousStatement: null,
      colour: 120,
    },
    {
      type: "turtle_repeat",
      message0: t.repeat,
      args0: [
        {
          type: "field_number",
          name: "TIMES",
          value: 4,
          min: 1,
          max: 100,
        },
        { type: "input_dummy" },
        { type: "input_statement", name: "DO" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 120,
    },
    {
      type: "turtle_if",
      message0: t.if,
      args0: [
        { type: "input_value", name: "COND", check: "Boolean" },
        { type: "input_dummy" },
        { type: "input_statement", name: "DO" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210,
    },
    {
      type: "turtle_if_else",
      message0: t.ifElse,
      args0: [{ type: "input_value", name: "COND", check: "Boolean" }],
      message1: "%1",
      args1: [{ type: "input_statement", name: "DO" }],
      message2: t.else,
      args2: [{ type: "input_statement", name: "ELSE" }],
      previousStatement: null,
      nextStatement: null,
      colour: 210,
    },
    {
      type: "turtle_distance",
      message0: t.distance,
      output: "Number",
      colour: 160,
    },
    {
      type: "turtle_distance_lt",
      message0: t.distanceLt,
      args0: [
        {
          type: "field_number",
          name: "CM",
          value: 20,
          min: 2,
          max: 400,
        },
      ],
      output: "Boolean",
      colour: 160,
    },
    {
      type: "turtle_line",
      message0: t.line,
      args0: [
        {
          type: "field_dropdown",
          name: "PIN",
          options: [
            [t.lineL, "LINE_L"],
            [t.lineM, "LINE_M"],
            [t.lineR, "LINE_R"],
          ],
        },
      ],
      output: "Boolean",
      colour: 160,
    },
    {
      type: "turtle_ir_pressed",
      message0: t.irPressed,
      args0: [
        {
          type: "field_dropdown",
          name: "CODE",
          options: [
            [t.irUp, "0xFF629D"],
            [t.irDown, "0xFFA857"],
            [t.irLeft, "0xFF22DD"],
            [t.irRight, "0xFFC23D"],
            [t.irOk, "0xFF02FD"],
            [t.ir1, "0xFF6897"],
            [t.ir2, "0xFF9867"],
            [t.ir3, "0xFFB04F"],
            [t.ir4, "0xFF30CF"],
            [t.ir5, "0xFF18E7"],
            [t.ir6, "0xFF7A85"],
            [t.ir7, "0xFF10EF"],
            [t.ir8, "0xFF38C7"],
            [t.ir9, "0xFF5AA5"],
            [t.ir0, "0xFF4AB5"],
            [t.irStar, "0xFF42BD"],
            [t.irHash, "0xFF52AD"],
          ],
        },
      ],
      output: "Boolean",
      colour: 65,
      tooltip: t.irTip,
    },
    {
      type: "turtle_servo",
      message0: t.servo,
      args0: [
        {
          type: "field_number",
          name: "DEG",
          value: 90,
          min: 0,
          max: 180,
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 230,
    },
    {
      type: "turtle_matrix",
      message0: t.matrix,
      previousStatement: null,
      nextStatement: null,
      colour: 45,
      tooltip: t.matrixTip,
    },
    {
      type: "turtle_matrix_clear",
      message0: t.matrixClear,
      previousStatement: null,
      nextStatement: null,
      colour: 45,
    },
  ]);
}

export function getTurtleToolbox(lang = getLang()) {
  const c = ui(lang).cat;
  return {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: c.start,
        colour: "20",
        contents: [{ kind: "block", type: "turtle_start" }],
      },
      {
        kind: "category",
        name: c.drive,
        colour: "210",
        contents: [
          { kind: "block", type: "turtle_forward" },
          { kind: "block", type: "turtle_backward" },
          { kind: "block", type: "turtle_left" },
          { kind: "block", type: "turtle_right" },
          { kind: "block", type: "turtle_stop" },
          { kind: "block", type: "turtle_speed" },
        ],
      },
      {
        kind: "category",
        name: c.lights,
        colour: "45",
        contents: [
          { kind: "block", type: "turtle_led" },
          { kind: "block", type: "turtle_matrix" },
          { kind: "block", type: "turtle_matrix_clear" },
        ],
      },
      {
        kind: "category",
        name: c.control,
        colour: "120",
        contents: [
          { kind: "block", type: "turtle_wait" },
          { kind: "block", type: "turtle_repeat" },
          { kind: "block", type: "turtle_forever" },
          { kind: "block", type: "turtle_if" },
          { kind: "block", type: "turtle_if_else" },
        ],
      },
      {
        kind: "category",
        name: c.sensing,
        colour: "160",
        contents: [
          { kind: "block", type: "turtle_distance" },
          { kind: "block", type: "turtle_distance_lt" },
          { kind: "block", type: "turtle_line" },
        ],
      },
      {
        kind: "category",
        name: c.remote,
        colour: "65",
        contents: [{ kind: "block", type: "turtle_ir_pressed" }],
      },
      {
        kind: "category",
        name: c.servo,
        colour: "230",
        contents: [{ kind: "block", type: "turtle_servo" }],
      },
    ],
  };
}

/** @deprecated use getTurtleToolbox() */
export const toolbox = getTurtleToolbox("en");

export function starterWorkspace() {
  return {
    blocks: {
      languageVersion: 0,
      blocks: [
        {
          type: "turtle_start",
          id: "start",
          x: 40,
          y: 40,
          next: {
            block: {
              type: "turtle_led",
              fields: { STATE: "HIGH" },
              next: {
                block: {
                  type: "turtle_wait",
                  fields: { SECS: 1 },
                  next: {
                    block: {
                      type: "turtle_led",
                      fields: { STATE: "LOW" },
                      next: {
                        block: {
                          type: "turtle_forward",
                          fields: { SECS: 1 },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
  };
}

export const demos = {
  blink: starterWorkspace(),
  square: {
    blocks: {
      languageVersion: 0,
      blocks: [
        {
          type: "turtle_start",
          id: "start",
          x: 40,
          y: 40,
          next: {
            block: {
              type: "turtle_repeat",
              fields: { TIMES: 4 },
              inputs: {
                DO: {
                  block: {
                    type: "turtle_forward",
                    fields: { SECS: 1 },
                    next: {
                      block: {
                        type: "turtle_right",
                        fields: { SECS: 0.6 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
  },
  scan: startNext({
    type: "turtle_servo",
    fields: { DEG: 90 },
    next: {
      block: {
        type: "turtle_forever",
        inputs: {
          DO: {
            block: {
              type: "turtle_if_else",
              inputs: {
                COND: {
                  block: {
                    type: "turtle_distance_lt",
                    fields: { CM: 22 },
                  },
                },
                DO: {
                  block: {
                    type: "turtle_stop",
                    next: {
                      block: {
                        type: "turtle_servo",
                        fields: { DEG: 40 },
                        next: {
                          block: {
                            type: "turtle_wait",
                            fields: { SECS: 0.3 },
                            next: {
                              block: {
                                type: "turtle_if_else",
                                inputs: {
                                  COND: {
                                    block: {
                                      type: "turtle_distance_lt",
                                      fields: { CM: 28 },
                                    },
                                  },
                                  DO: {
                                    block: {
                                      type: "turtle_servo",
                                      fields: { DEG: 140 },
                                      next: {
                                        block: {
                                          type: "turtle_wait",
                                          fields: { SECS: 0.3 },
                                          next: {
                                            block: {
                                              type: "turtle_right",
                                              fields: { SECS: 0.45 },
                                              next: {
                                                block: {
                                                  type: "turtle_servo",
                                                  fields: { DEG: 90 },
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                  ELSE: {
                                    block: {
                                      type: "turtle_left",
                                      fields: { SECS: 0.45 },
                                      next: {
                                        block: {
                                          type: "turtle_servo",
                                          fields: { DEG: 90 },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                ELSE: {
                  block: {
                    type: "turtle_speed",
                    fields: { SPEED: 130 },
                    next: {
                      block: {
                        type: "turtle_forward",
                        fields: { SECS: 0.12 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  }),
  blinkloop: startNext({
    type: "turtle_forever",
    inputs: {
      DO: {
        block: {
          type: "turtle_led",
          fields: { STATE: "HIGH" },
          next: {
            block: {
              type: "turtle_wait",
              fields: { SECS: 0.3 },
              next: {
                block: {
                  type: "turtle_led",
                  fields: { STATE: "LOW" },
                  next: {
                    block: {
                      type: "turtle_wait",
                      fields: { SECS: 0.3 },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  }),
  dance: startNext({
    type: "turtle_forever",
    inputs: {
      DO: {
        block: {
          type: "turtle_if",
          inputs: {
            COND: {
              block: {
                type: "turtle_ir_pressed",
                fields: { CODE: "0xFF629D" },
              },
            },
            DO: {
              block: {
                type: "turtle_speed",
                fields: { SPEED: 180 },
                next: {
                  block: {
                    type: "turtle_forward",
                    fields: { SECS: 0.3 },
                    next: {
                      block: {
                        type: "turtle_left",
                        fields: { SECS: 0.25 },
                        next: {
                          block: {
                            type: "turtle_backward",
                            fields: { SECS: 0.3 },
                            next: {
                              block: {
                                type: "turtle_right",
                                fields: { SECS: 0.25 },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          next: {
            block: {
              type: "turtle_if",
              inputs: {
                COND: {
                  block: {
                    type: "turtle_ir_pressed",
                    fields: { CODE: "0xFF6897" },
                  },
                },
                DO: {
                  block: {
                    type: "turtle_speed",
                    fields: { SPEED: 200 },
                    next: {
                      block: {
                        type: "turtle_left",
                        fields: { SECS: 0.35 },
                        next: {
                          block: {
                            type: "turtle_right",
                            fields: { SECS: 0.35 },
                            next: {
                              block: {
                                type: "turtle_left",
                                fields: { SECS: 0.35 },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              next: {
                block: {
                  type: "turtle_if",
                  inputs: {
                    COND: {
                      block: {
                        type: "turtle_ir_pressed",
                        fields: { CODE: "0xFF9867" },
                      },
                    },
                    DO: {
                      block: {
                        type: "turtle_speed",
                        fields: { SPEED: 180 },
                        next: {
                          block: {
                            type: "turtle_forward",
                            fields: { SECS: 0.2 },
                            next: {
                              block: {
                                type: "turtle_backward",
                                fields: { SECS: 0.2 },
                                next: {
                                  block: {
                                    type: "turtle_forward",
                                    fields: { SECS: 0.2 },
                                    next: {
                                      block: {
                                        type: "turtle_backward",
                                        fields: { SECS: 0.2 },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  next: {
                    block: {
                      type: "turtle_if",
                      inputs: {
                        COND: {
                          block: {
                            type: "turtle_ir_pressed",
                            fields: { CODE: "0xFFB04F" },
                          },
                        },
                        DO: {
                          block: {
                            type: "turtle_speed",
                            fields: { SPEED: 160 },
                            next: {
                              block: {
                                type: "turtle_forward",
                                fields: { SECS: 0.25 },
                                next: {
                                  block: {
                                    type: "turtle_right",
                                    fields: { SECS: 0.35 },
                                    next: {
                                      block: {
                                        type: "turtle_forward",
                                        fields: { SECS: 0.25 },
                                        next: {
                                          block: {
                                            type: "turtle_right",
                                            fields: { SECS: 0.35 },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                      next: {
                        block: {
                          type: "turtle_if",
                          inputs: {
                            COND: {
                              block: {
                                type: "turtle_ir_pressed",
                                fields: { CODE: "0xFF02FD" },
                              },
                            },
                            DO: {
                              block: { type: "turtle_stop" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  }),
  waitgo: startNext({
    type: "turtle_led",
    fields: { STATE: "HIGH" },
    next: {
      block: {
        type: "turtle_wait",
        fields: { SECS: 3 },
        next: {
          block: {
            type: "turtle_led",
            fields: { STATE: "LOW" },
            next: {
              block: {
                type: "turtle_forward",
                fields: { SECS: 2 },
              },
            },
          },
        },
      },
    },
  }),
  look: startNext({
    type: "turtle_servo",
    fields: { DEG: 45 },
    next: {
      block: {
        type: "turtle_wait",
        fields: { SECS: 0.5 },
        next: {
          block: {
            type: "turtle_servo",
            fields: { DEG: 135 },
            next: {
              block: {
                type: "turtle_wait",
                fields: { SECS: 0.5 },
                next: {
                  block: {
                    type: "turtle_servo",
                    fields: { DEG: 90 },
                  },
                },
              },
            },
          },
        },
      },
    },
  }),
  line: startNext({
    type: "turtle_forever",
    inputs: {
      DO: {
        block: {
          type: "turtle_if_else",
          inputs: {
            COND: {
              block: { type: "turtle_line", fields: { PIN: "LINE_M" } },
            },
            DO: {
              block: { type: "turtle_forward", fields: { SECS: 0.08 } },
            },
            ELSE: {
              block: {
                type: "turtle_if_else",
                inputs: {
                  COND: {
                    block: { type: "turtle_line", fields: { PIN: "LINE_L" } },
                  },
                  DO: {
                    block: { type: "turtle_left", fields: { SECS: 0.1 } },
                  },
                  ELSE: {
                    block: {
                      type: "turtle_if_else",
                      inputs: {
                        COND: {
                          block: {
                            type: "turtle_line",
                            fields: { PIN: "LINE_R" },
                          },
                        },
                        DO: {
                          block: {
                            type: "turtle_right",
                            fields: { SECS: 0.1 },
                          },
                        },
                        ELSE: {
                          block: { type: "turtle_stop" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  }),
  face: startNext({
    type: "turtle_matrix",
  }),
};


function startNext(block) {
  return {
    blocks: {
      languageVersion: 0,
      blocks: [
        {
          type: "turtle_start",
          id: "start",
          x: 40,
          y: 40,
          next: { block },
        },
      ],
    },
  };
}
