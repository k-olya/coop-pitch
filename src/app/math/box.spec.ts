import { Point } from "./point";
import { distanceToBox, isBoxNearPoint, Box } from "./box";

describe("distanceToBox", () => {
  it("should return 0 when the point is inside the box", () => {
    const point: Point = [0, 0, 0];
    const box: Box = {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    };
    expect(distanceToBox(point, box)).toEqual(0);
  });

  it("should return 0 when the point is on the surface of the box", () => {
    const point: Point = [0.5, 0.5, 0.5];
    const box: Box = {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    };
    expect(distanceToBox(point, box)).toEqual(0);
  });

  it("should calculate the correct distance for a point outside the box", () => {
    const point: Point = [0, 2, 0];
    const box: Box = {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    };
    expect(distanceToBox(point, box)).toEqual(1);
  });

  it("should calculate the correct distance for a point outside the rotated and scaled box", () => {
    const point: Point = [3, 0, 0];
    const box: Box = {
      position: [0, 0, 0],
      rotation: [0, Math.PI / 4, 0],
      scale: [2, 1, 1],
    };
    expect(distanceToBox(point, box)).toBeCloseTo(1.707, 3);
  });
});

describe("isBoxNearPoint", () => {
  const boxes: Box[] = [
    { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
    { position: [2, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
    { position: [4, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
    { position: [6, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
  ];

  it("should return true when a box is within the distance", () => {
    const point: Point = [1, 0, 0];
    const distance = 1.5;
    expect(isBoxNearPoint(boxes, point, distance)).toEqual(true);
  });

  it("should return false when no box is within the distance", () => {
    const point: Point = [1, 0, 0];
    const distance = 0.5;
    expect(isBoxNearPoint(boxes, point, distance)).toEqual(false);
  });

  it("should return true when a box is exactly at the distance", () => {
    const point: Point = [1.5, 0, 0];
    const distance = 1.5;
    expect(isBoxNearPoint(boxes, point, distance)).toEqual(true);
  });
});
