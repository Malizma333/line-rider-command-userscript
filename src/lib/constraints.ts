import { CONSTRAINT_TYPE } from "./constraints.types";

export const CONSTRAINT = {
  INTERPOLATE: { DEFAULT: true, TYPE: CONSTRAINT_TYPE.BOOL },
  SMOOTH: { DEFAULT: 20, MIN: 0, MAX: 40, TYPE: CONSTRAINT_TYPE.INT },
  FRAME: { DEFAULT: 0, MIN: 0, MAX: 39, TYPE: CONSTRAINT_TYPE.INT },
  SECOND: { DEFAULT: 0, MIN: 0, MAX: 59, TYPE: CONSTRAINT_TYPE.INT },
  MINUTE: { DEFAULT: 0, MIN: 0, MAX: 99, TYPE: CONSTRAINT_TYPE.INT },
  ZOOM: { DEFAULT: 1, MIN: -50, MAX: 50, TYPE: CONSTRAINT_TYPE.FLOAT },
  PAN_X: { DEFAULT: 0, MIN: -100, MAX: 100, TYPE: CONSTRAINT_TYPE.FLOAT },
  PAN_Y: { DEFAULT: 0, MIN: -100, MAX: 100, TYPE: CONSTRAINT_TYPE.FLOAT },
  PAN_WIDTH: { DEFAULT: 0.4, MIN: 0, MAX: 2, TYPE: CONSTRAINT_TYPE.FLOAT },
  PAN_HEIGHT: { DEFAULT: 0.4, MIN: 0, MAX: 2, TYPE: CONSTRAINT_TYPE.FLOAT },
  FOCUS_WEIGHT: { DEFAULT: 0, MIN: 0, MAX: 1, TYPE: CONSTRAINT_TYPE.FLOAT },
  TIME_SPEED: { DEFAULT: 1, MIN: 0.01, MAX: 10, TYPE: CONSTRAINT_TYPE.FLOAT },
  GRAVITY_X: { DEFAULT: 0.175, MIN: -100, MAX: 100, TYPE: CONSTRAINT_TYPE.FLOAT },
  GRAVITY_Y: { DEFAULT: 0, MIN: -100, MAX: 100, TYPE: CONSTRAINT_TYPE.FLOAT }
} as const;
