// Breck surface of revolution and lighting

import * as THREE from 'three';
import * as HELPERS from './helpers.js';
import * as MATERIALS from "./materials.js";

export function buildLight()
{
    const light = new THREE.Group();
    // Pole
    var pole = HELPERS.cylinderY(.125, .125, 2, MATERIALS.metal)
    pole.position.set(0, 2, 0);
    light.add(pole);

    // Light aperture thing or whatever
    const points = [];
    points.push(new THREE.Vector2(.5, 1))
    points.push(new THREE.Vector2(1, 0))
    const geometry = new THREE.LatheGeometry(
        points,
        32,
        0,
        Math.PI * 2
    );
    const domeMesh = new THREE.Mesh(geometry, MATERIALS.metal);
    domeMesh.castShadow = false;
    light.add(domeMesh);

    // Circle cover for top of light
    var circle = new THREE.CircleGeometry(0.5, 32);
    var circleMesh = new THREE.Mesh(circle, MATERIALS.metal);
    circleMesh.rotation.set(Math.PI / 2, 0, 0)
    circleMesh.position.set(0, 1, 0)
    light.add(circleMesh);

    // Light
    var spotlight = new THREE.SpotLight(
        0xfffff0, //color: The color of the light (e.g., 0xffffff)
        3, //intensity: Brightness of the light.
        0, //distance: Maximum range of the light (default is 0 for unlimited).
        Math.PI / 2.5, //angle: Maximum angle of light dispersion, capped at Math.PI / 2 (90 degrees).
        1, //penumbra: Percent of the spotlight cone that is attenuated/softened at the edges, ranging from 0 to 1.
        0.5 //decay: The amount the light dims along the distance of the light (typically 2)
    )
    spotlight.position.set(0, 0.2, 0);
    spotlight.target.position.set(0, -1, 0);
    spotlight.castShadow = true;
    spotlight.shadow.camera.near = 0.5; // Adjust based on your scene scale
    spotlight.shadow.camera.far = 50;  
    spotlight.shadow.camera.updateProjectionMatrix();
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    spotlight.shadow.bias = -0.0005;
    light.add(spotlight, spotlight.target);
    
    var bulb = new THREE.SphereGeometry(.5, 32, 32);
    var bulbMesh = new THREE.Mesh(bulb, MATERIALS.bulb)
    bulbMesh.castShadow = false;
    light.add(bulbMesh)
    return light;
}