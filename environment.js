// Models used for basic environment display

import * as THREE from 'three';
import * as HELPERS from './helpers.js';
import * as MATERIALS from "./materials.js";

export function buildRoom()
{
    const room = new THREE.Group();
    
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(4, 0);
    shape.lineTo(4, 4);
    shape.lineTo(0, 4);
    shape.closePath();

    const hole = new THREE.Path();
    hole.moveTo(1, 1);
    hole.lineTo(1, 3);
    hole.lineTo(3, 3);
    hole.lineTo(3, 1);
    hole.closePath();
    shape.holes.push(hole);

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.125,
        bevelEnabled: false,
    });

    var wallHalf = new THREE.Mesh(geometry, MATERIALS.wall)
    var window = new THREE.PlaneGeometry(2, 2);
    var windowMesh = new THREE.Mesh(window, MATERIALS.glass);
    var bar1Geom = new THREE.BoxGeometry(.125, 2, .125)
    var bar1 = new THREE.Mesh(bar1Geom, MATERIALS.wall)
    windowMesh.position.set(2, 2, .0625)
    bar1.position.set(2, 2, .0625)
    wallHalf.add(windowMesh)
    wallHalf.add(bar1)

    // Front wall
    wallHalf.scale.set(0.5, 1, 1);
    wallHalf.position.set(-2, -2, 2);
    var wallHalf2 = wallHalf.clone();
    wallHalf2.position.set(0, -2, 2);
    
    // Back wall
    var wallHalf3 = wallHalf.clone();
    wallHalf3.position.set(0, -2, -2);
    var wallHalf4 = wallHalf.clone();
    wallHalf4.position.set(-2, -2, -2);

    // Left wall
    var wallHalf5 = wallHalf.clone();
    wallHalf5.rotation.set(0, Math.PI / 2, 0)
    wallHalf5.position.set(-2, -2, 0)
    var wallHalf6 = wallHalf5.clone();
    wallHalf6.position.set(-2, -2, 2)

    // Right wall
    var wallHalf7 = wallHalf.clone();
    wallHalf7.rotation.set(0, Math.PI / 2, 0)
    wallHalf7.position.set(2, -2, 0)
    var wallHalf8 = wallHalf7.clone();
    wallHalf8.position.set(2, -2, 2)

    room.add(wallHalf, wallHalf2, wallHalf3, wallHalf4, wallHalf5, wallHalf6, wallHalf7, wallHalf8);

    var ceiling = new THREE.PlaneGeometry(4, 4);
    var ceilingMesh = new THREE.Mesh(ceiling, MATERIALS.ceiling);
    ceilingMesh.position.set(0, 1.99, 0);
    ceilingMesh.rotation.set(Math.PI / 2, 0, 0)

    //room.add(ceilingMesh)

    var rim = new THREE.BoxGeometry(1.5, .1, .05);
    var rimMesh = new THREE.Mesh(rim, MATERIALS.metal);
    rimMesh.position.set(-1.125, 0, -.5)
    var rimMesh2 = rimMesh.clone();
    rimMesh2.rotation.set(0, Math.PI / 2, 0)
    rimMesh2.position.set(-.5, 0, -1.125)
    var rimMesh3 = rimMesh.clone();
    rimMesh3.rotation.set(0, 0, Math.PI / 2)
    rimMesh3.scale.set(1, 0.5, 1)
    rimMesh3.position.set(-0.5, -0.5, -0.5);
    var rimMesh4 = rimMesh3.clone();
    rimMesh4.position.set(-0.5, -1.5, -0.5)
    room.add(rimMesh, rimMesh2, rimMesh3, rimMesh4);

    var glass = new THREE.PlaneGeometry(1.5, 2)
    var glassMesh = new THREE.Mesh(glass, MATERIALS.glass);
    glassMesh.position.set(-1.25, -1, -0.5)
    room.add(glassMesh);

    var glassL = new THREE.PlaneGeometry(0.5, 2);
    var glassLMesh = new THREE.Mesh(glassL, MATERIALS.glass)
    glassLMesh.position.set(-0.5, -1, -0.75)
    glassLMesh.rotation.set(0, Math.PI / 2, 0)
    room.add(glassLMesh);

    var glassRMesh = glassLMesh.clone();
    glassRMesh.position.set(-0.5, -1, -1.65);
    room.add(glassRMesh)

    var glassT = new THREE.PlaneGeometry(0.4, 0.5);
    var glassTMesh = new THREE.Mesh(glassT, MATERIALS.glass);
    glassTMesh.rotation.set(0, Math.PI / 2, 0)
    glassTMesh.position.set(-0.5, -0.25, -1.2);
    room.add(glassTMesh);

    var door = new THREE.BoxGeometry(.5, 1.5, 0.025);
    var doorMesh = new THREE.Mesh(door, MATERIALS.wood);
    doorMesh.rotation.set(0, Math.PI / 2, 0);
    doorMesh.position.set(-0.5, -1.25, -1.2)

    var knob = new THREE.SphereGeometry(0.025, 32, 16);
    var knobMesh = new THREE.Mesh(knob, MATERIALS.black);
    knobMesh.scale.set(0.5, 1, 0.5)
    knobMesh.position.set(-0.2, 0, .025)
    doorMesh.add(knobMesh);
    var knobMesh2 = knobMesh.clone();
    knobMesh2.position.set(-0.2, 0, -0.025)
    doorMesh.add(knobMesh2)

    room.add(doorMesh)


    room.traverse((child) => {
    if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
    }
    });
    return room;
}