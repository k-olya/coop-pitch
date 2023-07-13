import { Point } from "app/math/point";

export interface Box {
  position: Point;
  rotation: Point;
  scale: Point;
  id?: string;
}

export function distanceToBoxByCoordinates(point: Point, box: Box): Point {
  // Get the position, rotation, and scale of the box
  const [boxX, boxY, boxZ] = box.position;
  const [boxRotationX, boxRotationY, boxRotationZ] = box.rotation;
  const [boxScaleX, boxScaleY, boxScaleZ] = box.scale;

  // Convert the point to the box's local coordinate system
  const localPointX = (point[0] - boxX) / boxScaleX;
  const localPointY = (point[1] - boxY) / boxScaleY;
  const localPointZ = (point[2] - boxZ) / boxScaleZ;

  // Rotate the point around the box's origin
  const cosX = Math.cos(boxRotationX);
  const sinX = Math.sin(boxRotationX);
  const cosY = Math.cos(boxRotationY);
  const sinY = Math.sin(boxRotationY);
  const cosZ = Math.cos(boxRotationZ);
  const sinZ = Math.sin(boxRotationZ);
  const rotatedPointX =
    localPointX * (cosY * cosZ) +
    localPointY * (cosY * sinZ) -
    localPointZ * sinY;
  const rotatedPointY =
    localPointX * (sinX * sinY * cosZ - cosX * sinZ) +
    localPointY * (sinX * sinY * sinZ + cosX * cosZ) +
    localPointZ * sinX * cosY;
  const rotatedPointZ =
    localPointX * (cosX * sinY * cosZ + sinX * sinZ) +
    localPointY * (cosX * sinY * sinZ - sinX * cosZ) +
    localPointZ * cosX * cosY;

  // Calculate the distance between the rotated point and the box
  const dx = Math.max(Math.abs(rotatedPointX) - 0.5, 0);
  const dy = Math.max(Math.abs(rotatedPointY) - 0.5, 0);
  const dz = Math.max(Math.abs(rotatedPointZ) - 0.5, 0);
  return [dx * boxScaleX, dy * boxScaleY, dz * boxScaleZ];
}

export function distanceToBox(point: Point, box: Box): number {
  const [dx, dy, dz] = distanceToBoxByCoordinates(point, box);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function isBoxNearPoint(
  boxes: Box[],
  point: Point,
  distance: number
): boolean {
  for (const box of boxes) {
    const dist = distanceToBox(point, box);
    if (dist <= distance) {
      return true;
    }
  }
  return false;
}
