import { TimedTrigger } from "../lib/TriggerDataManager.types";

export const CONSTRAINTS = {
  INTERPOLATE: {
    DEFAULT: true
  },
  SMOOTH: {
    DEFAULT: 20, MIN: 0, MAX: 40, INT: true
  },
  FRAME: {
    DEFAULT: 0, MIN: 0, MAX: 39, INT: true
  },
  SECOND: {
    DEFAULT: 0, MIN: 0, MAX: 59, INT: true
  },
  MINUTE: {
    DEFAULT: 0, MIN: 0, MAX: 99, INT: true
  },
  ZOOM: {
    DEFAULT: 1, MIN: -50, MAX: 50, INT: false
  },
  PAN_X: {
    DEFAULT: 0, MIN: -100, MAX: 100, INT: false
  },
  PAN_Y: {
    DEFAULT: 0, MIN: -100, MAX: 100, INT: false
  },
  PAN_WIDTH: {
    DEFAULT: 0.4, MIN: 0, MAX: 2, INT: false
  },
  PAN_HEIGHT: {
    DEFAULT: 0.4, MIN: 0, MAX: 2, INT: false
  },
  FOCUS_WEIGHT: {
    DEFAULT: 0, MIN: 0, MAX: 1, INT: false
  },
  TIME_SPEED: {
    DEFAULT: 1, MIN: 0.01, MAX: 10, INT: false
  },
  SKIN_ZOOM: {
    DEFAULT: 1, MIN: 1, MAX: 4, INT: false
  },
  ALPHA_SLIDER: {
    DEFAULT: 1, MIN: 0, MAX: 1, INT: false
  },
  GRAVITY_X: {
    DEFAULT: 0.175, MIN: -100, MAX: 100, INT: false
  },
  GRAVITY_Y: {
    DEFAULT: 0, MIN: -100, MAX: 100, INT: false
  }
} as const;

export function validateTimes (triggers: TimedTrigger[]): boolean[] {
  const invalidIndices = Array(triggers.length).map(() => false);

  const firstTime = triggers[0][0];
  if (firstTime[0] !== 0 || firstTime[1] !== 0 || firstTime[2] !== 0) {
    invalidIndices[0] = true;
  }

  for (let i = 0; i < triggers.length - 1; i += 1) {
    const time1 = triggers[i][0] as number[];
    const time2 = triggers[i + 1][0] as number[];
    const index1 = (
      time1[0] * 60 + time1[1]
    ) * 40 + time1[2];
    const index2 = (
      time2[0] * 60 + time2[1]
    ) * 40 + time2[2];

    if (index1 >= index2) {
      invalidIndices[i + 1] = true;
    }
  }

  return invalidIndices;
}
