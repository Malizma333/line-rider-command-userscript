import {FONT_SIZE_SETTING, SETTINGS_KEY, VIEWPORT_SETTING} from './settings-storage.types';

const LOCAL_STORAGE_PREFIX = 'CMD_EDITOR_MOD_';

const DEFAULTS = {
  [SETTINGS_KEY.FONT_SIZE]: FONT_SIZE_SETTING.MEDIUM,
  [SETTINGS_KEY.VIEWPORT]: VIEWPORT_SETTING.HD,
} as const;

/**
 *
 * @param key
 */
export function getSetting(key: SETTINGS_KEY): number {
  const item = window.localStorage.getItem(LOCAL_STORAGE_PREFIX + key);

  if (!item) {
    return DEFAULTS[key];
  }

  const parsed = parseInt(item, 10);

  if (isNaN(parsed)) {
    return DEFAULTS[key];
  }

  return parsed;
}

/**
 *
 * @param key
 * @param value
 */
export function saveSetting(key: SETTINGS_KEY, value: number): void {
  window.localStorage.setItem(LOCAL_STORAGE_PREFIX + key, String(value));
}
