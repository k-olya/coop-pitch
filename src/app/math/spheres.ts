import { Point } from "./point";
import { distanceSquared } from "./distance";

export type Sphere = { center: Point; radius: number };

export function sphereCollision(sphere1: Sphere, sphere2: Sphere): boolean {
  const distSquared = distanceSquared(sphere1.center, sphere2.center);
  const radiusSumSquared = (sphere1.radius + sphere2.radius) ** 2;
  return distSquared <= radiusSumSquared;
}
