// Breck Extruded Object

import * as THREE from 'three';
import * as HELPERS from './helpers.js';
import * as MATERIALS from "./materials.js";

export function buildMachine()
{   
    const machine = new THREE.Shape();

    machine.moveTo(0, 0);
    machine.lineTo(0, 6);
    machine.lineTo(8, 6);
    machine.lineTo(8, 0);
    machine.closePath();

    const extrudeSettings = {
        depth: 7,
        steps: 16.739,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 3,
        bevelOffset: -1,
        bevelSegments: 5
    };

    const geometry = new THREE.ExtrudeGeometry(machine, extrudeSettings);
    const mesh = new THREE.Mesh(geometry, MATERIALS.metalLight);
    mesh.scale.set(0.5, 0.5, 0.5)
    mesh.position.set(0, 1.01, 0)

    const outerSize = 4;
    const wallThickness = 0.5;
    const tubeLength = 2;

    const halfOuter = outerSize / 2;
    const halfInner = halfOuter - wallThickness;

    // 1. Outer square (counter-clockwise)
    const shape = new THREE.Shape();
    shape.moveTo(-halfOuter, -halfOuter);
    shape.lineTo(halfOuter, -halfOuter);
    shape.lineTo(halfOuter, halfOuter);
    shape.lineTo(-halfOuter, halfOuter);
    shape.closePath();

    // 2. Inner square hole (clockwise)
    const hole = new THREE.Path();
    hole.moveTo(-halfInner, -halfInner);
    hole.lineTo(-halfInner, halfInner);
    hole.lineTo(halfInner, halfInner);
    hole.lineTo(halfInner, -halfInner);
    hole.closePath();

    shape.holes.push(hole);

    // 3. Extrude into a 3D tube
    const geometryHole = new THREE.ExtrudeGeometry(shape, {
    depth: tubeLength,
    bevelEnabled: false
    });

    // Optional: Center the tube along its length
    geometryHole.translate(0, 0, -tubeLength / 2);

    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    const squareTube = new THREE.Mesh(geometryHole, MATERIALS.metal);
    squareTube.rotation.set(0, Math.PI / 2, 0)
    squareTube.position.set(-2, 3, 3.5);

    var maskGeometry = new THREE.BoxGeometry(3.9, 3.9, 0.5);
    var maskMesh = new THREE.Mesh(maskGeometry, MATERIALS.black)
    squareTube.add(maskMesh)
    mesh.add(squareTube);
    var squareTube2 = squareTube.clone()
    squareTube2.position.set(10, 3, 3.5)
    mesh.add(squareTube2)

    const plateGeometry = new THREE.BoxGeometry(12, 11, 4);
    const plateMesh = new THREE.Mesh(plateGeometry, MATERIALS.metalLight)

    plateMesh.rotation.set(Math.PI / 2, 0, 0)
    plateMesh.position.set(4, -1, 3.5)

    const plateHatchGeom = new THREE.BoxGeometry(0.5, 4, 0.5);
    const plateHatch = new THREE.Mesh(plateHatchGeom, MATERIALS.metal)
    plateHatch.position.set(3, 5.5, -4)
    plateHatch.rotation.set(Math.PI / 2, 0, 0)
    const plateHatch2 = plateHatch.clone()
    plateHatch2.position.set(-3, 5.5, -4)
    plateMesh.add(plateHatch, plateHatch2)

    const plateTopGeom = new THREE.BoxGeometry(6.5, 0.5, 0.5);
    const plateTop = new THREE.Mesh(plateTopGeom, MATERIALS.metal)
    plateTop.position.set(0, 5.5, -6)
    plateMesh.add(plateTop)
    const plateTop2 = plateTop.clone();
    plateTop2.position.set(0, 5.5, -2)
    plateMesh.add(plateTop2)

    mesh.add(plateMesh)

    const beltGeometry = new THREE.BoxGeometry(4, 0.5, 10);
    const beltMesh = new THREE.Mesh(beltGeometry, MATERIALS.black)

    beltMesh.rotation.set(0, Math.PI / 2, 0)
    beltMesh.position.set(4, 1.25, 3.5)
    mesh.add(beltMesh)

    var spotlight = new THREE.SpotLight(
        0xffffff, //color: The color of the light (e.g., 0xffffff)
        16, //intensity: Brightness of the light.
        0, //distance: Maximum range of the light (default is 0 for unlimited).
        Math.PI / 2, //angle: Maximum angle of light dispersion, capped at Math.PI / 2 (90 degrees).
        1, //penumbra: Percent of the spotlight cone that is attenuated/softened at the edges, ranging from 0 to 1.
        2 //decay: The amount the light dims along the distance of the light (typically 2)
    )
    spotlight.position.set(4, 5, 3.5);
    spotlight.target.position.set(4, 3, 3.5);
    spotlight.castShadow = true;
    spotlight.shadow.camera.near = 0.5; // Adjust based on your scene scale
    spotlight.shadow.camera.far = 50;  
    spotlight.shadow.camera.updateProjectionMatrix();
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    spotlight.shadow.bias = -0.0005;
    mesh.add(spotlight, spotlight.target);

    const window = new THREE.PlaneGeometry(4, 6);
    const windowMesh = new THREE.Mesh(window, MATERIALS.glass);
    windowMesh.rotation.set(0, 0, Math.PI / 2)
    windowMesh.position.set(4, 3, 8.5)
    mesh.add(windowMesh);

    mesh.traverse((child) => {
    if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
    }
    });
    return mesh; 
}