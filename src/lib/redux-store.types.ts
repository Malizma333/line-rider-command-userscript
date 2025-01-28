export interface DispatchAction {
  type: string
  payload: null | boolean | number | string | object
  meta?: object
}

export interface Track { engine: { state: { riders: object[] } } }
export interface EditorPosition { x: number, y: number }
export interface Dimensions { width: number, height: number }
