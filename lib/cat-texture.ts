type Point = { x: number; y: number };

const insideEllipse = (point: Point, center: Point, radius: Point) => {
  const dx = (point.x - center.x) / radius.x;
  const dy = (point.y - center.y) / radius.y;
  return dx * dx + dy * dy <= 1;
};

const insideTriangle = (point: Point, a: Point, b: Point, c: Point) => {
  const sign = (p1: Point, p2: Point, p3: Point) =>
    (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
  const d1 = sign(point, a, b);
  const d2 = sign(point, b, c);
  const d3 = sign(point, c, a);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
};

export function isInsideCatSilhouette(x: number, y: number) {
  const point = { x, y };
  const body = insideEllipse(point, { x: 0.68, y: 0.55 }, { x: 0.17, y: 0.21 });
  const head = insideEllipse(point, { x: 0.68, y: 0.31 }, { x: 0.11, y: 0.11 });
  const leftEar = insideTriangle(point, { x: 0.6, y: 0.23 }, { x: 0.63, y: 0.1 }, { x: 0.68, y: 0.23 });
  const rightEar = insideTriangle(point, { x: 0.68, y: 0.23 }, { x: 0.75, y: 0.1 }, { x: 0.78, y: 0.25 });
  const tail = insideEllipse(point, { x: 0.84, y: 0.55 }, { x: 0.09, y: 0.19 }) && y < 0.72;
  return body || head || leftEar || rightEar || tail;
}
