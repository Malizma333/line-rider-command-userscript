/* eslint-disable @typescript-eslint/no-unused-vars */

type Rider = any
type Layer = { id: number, visible: boolean, editable: boolean, name: string }

function getWindowFocused (state: ReduxState): boolean { return (state.views.Main as boolean) }

function getPlayerRunning (state: ReduxState): boolean { return state.player.running }

function getCurrentScript (state: ReduxState): string { return state.trackData.script }

function getRiders (state: ReduxState): Rider[] { return state.simulator.engine.engine.state.riders }

function getNumRiders (state: ReduxState): number { return getRiders(state).length }

function getPlayerIndex (state: ReduxState): number { return state.player.index }

function getPlayerMaxIndex(state: ReduxState): number { return Math.ceil(state.player.maxIndex) }

function getSidebarOpen (state: ReduxState): boolean { return (state.views.Sidebar as boolean) }

function getTrackTitle (state: ReduxState): string { return state.trackData.label }

function getActiveLayerId (state: ReduxState): number { return state.simulator.engine.engine.state.activeLayerId }

function getLayers (state: ReduxState): Layer[] { return state.simulator.engine.engine.state.layers.toArray() }

function getLayerIds (state: ReduxState): number[] { return getLayers(state).map((l: Layer) => l.id) }
