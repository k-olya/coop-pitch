import { Point } from "./point";

// Calculates the squared distance between two points
export function distanceSquared(p1: Point, p2: Point): number {
  const [x1, y1, z1] = p1;
  const [x2, y2, z2] = p2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dz = z2 - z1;
  return dx * dx + dy * dy + dz * dz;
}

// Calculates the distance between two points
export function distance(p1: Point, p2: Point): number {
  return Math.sqrt(distanceSquared(p1, p2));
}
