// Shared mutable store so DOM events and the R3F scene can talk without React re-renders.
export const store = {
  mouse: { x: 0, y: 0 }, // -1..1, written by Hero, read by BlobStage
  labels: {}, // id -> DOM element (hover labels drawn over the canvas)
}
