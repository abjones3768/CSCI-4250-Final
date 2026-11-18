// Breck extra object

import * as THREE from 'three';
import * as HELPERS from './helpers.js';
import * as MATERIALS from "./materials.js";

export function buildBelt()
{
    const beltGeom = new THREE.BoxGeometry(2, 0.2, 1.9);
    const belt = new THREE.Mesh(beltGeom, MATERIALS.black)
    belt.position.set(0, 2, -.25)

    const beltSideGeom = new THREE.BoxGeometry(2, 0.4, 0.4);
    const beltSide = new THREE.Mesh(beltSideGeom, MATERIALS.metalLight);
    beltSide.position.set(0, 0, 1);
    belt.add(beltSide);
    const beltSide2 = beltSide.clone()
    beltSide2.position.set(0, 0, -1);
    belt.add(beltSide2)

    const beltBottomGeom = new THREE.BoxGeometry(2, 0.2, 2);
    const beltBottom = new THREE.Mesh(beltBottomGeom, MATERIALS.metalLight);
    beltBottom.position.set(0, -0.1, 0)
    belt.add(beltBottom);

    const beltStand = HELPERS.cylinderY(0.2, 0.2, 2, MATERIALS.metalLight)
    beltStand.position.set(0, -1, 0)
    belt.add(beltStand)

    belt.traverse((child) => {
    if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
    }
    });

    return belt;
}

export function buildCornerBelt()
{
    const beltGeom = new THREE.BoxGeometry(2, 0.2, 2);
    const belt = new THREE.Mesh(beltGeom, MATERIALS.black)
    belt.position.set(0, 2, -.25)

    const beltSideGeom = new THREE.BoxGeometry(2, 0.4, 0.4);
    const beltSide = new THREE.Mesh(beltSideGeom, MATERIALS.metalLight);
    beltSide.position.set(0, 0, 1);
    belt.add(beltSide);
    const beltSide2 = beltSide.clone()
    beltSide2.position.set(-1, 0, 0);
    beltSide2.rotation.set(0, Math.PI / 2, 0)
    belt.add(beltSide2)

    const beltCornerGeom = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const beltCorner = new THREE.Mesh(beltCornerGeom, MATERIALS.metalLight)
    beltCorner.position.set(1, 0, -1)
    belt.add(beltCorner);

    const beltBottomGeom = new THREE.BoxGeometry(2, 0.2, 2);
    const beltBottom = new THREE.Mesh(beltBottomGeom, MATERIALS.metalLight);
    beltBottom.position.set(0, -0.1, 0)
    belt.add(beltBottom);

    const beltStand = HELPERS.cylinderY(0.2, 0.2, 2, MATERIALS.metalLight)
    beltStand.position.set(0, -1, 0)
    belt.add(beltStand)

    belt.traverse((child) => {
    if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
    }
    });

    return belt;
}