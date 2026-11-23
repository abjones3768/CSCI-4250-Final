import * as THREE from 'three';
import * as HELPERS from './helpers.js';
import * as MATERIALS from "./materials.js";

export function buildPipe()
{
    const points = [
    new THREE.Vector2(0.5, 1),
    new THREE.Vector2(0.5, -1),
    new THREE.Vector2(0.4, -1),
    new THREE.Vector2(0.4, 1),
    new THREE.Vector2(0.5, 1)
    ];

    const geometry = new THREE.LatheGeometry(points, 36);

    const mesh = new THREE.Mesh(geometry, MATERIALS.metalLight);
    return mesh
}

export function buildCornerPipe() {
    // 1. Hollow ring profile matching outer radius 0.5 and inner radius 0.4
    const outerRadius = 0.5;
    const innerRadius = 0.4;
    const curveSegments = 36;

    const ringShape = new THREE.Shape();
    ringShape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    ringShape.holes.push(holePath);

    // 2. Smooth 90° corner path (turn radius >= outerRadius prevents inner self-intersection)
    const turnRadius = 1.0;
    const path = new THREE.CurvePath();

    path.add(new THREE.LineCurve3(
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0, turnRadius, 0)
    ));
    path.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, turnRadius, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(turnRadius, 0, 0)
    ));
    path.add(new THREE.LineCurve3(
        new THREE.Vector3(turnRadius, 0, 0),
        new THREE.Vector3(2, 0, 0)
    ));

    // 3. Extrude ring along path
    const geometry = new THREE.ExtrudeGeometry(ringShape, {
        steps: 64,
        bevelEnabled: false,
        extrudePath: path,
        curveSegments: curveSegments
    });

    const mesh = new THREE.Mesh(geometry, MATERIALS.metalLight);
    return mesh;
}
