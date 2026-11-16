import * as THREE from 'three';

export function cylinderY(rTop, rBot, h, mat) {
  const geo = new THREE.CylinderGeometry(rTop, rBot, h, 24);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}