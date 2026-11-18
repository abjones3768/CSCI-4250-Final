// Models used for basic environment display

import * as THREE from 'three';
import * as HELPERS from './helpers.js';
import * as MATERIALS from "./materials.js";

export function buildRoom()
{
    const room = new THREE.Group();
    
    var leftWall = new THREE.BoxGeometry(.125, 4, 4);
    var leftMesh = new THREE.Mesh(leftWall, MATERIALS.wall)
    leftMesh.position.set(-2, 0, 0);

    var rightMesh = leftMesh.clone();
    rightMesh.position.set(2, 0, 0);

    var frontWall = new THREE.BoxGeometry(4, 4, .125);
    var frontMesh = new THREE.Mesh(frontWall, MATERIALS.wall)
    frontMesh.position.set(0, 0, 2);

    var backMesh = frontMesh.clone();
    backMesh.position.set(0, 0, -2);

    room.add(leftMesh, rightMesh, frontMesh, backMesh);
    return room;
}