// Breck Primitive Object

import * as THREE from 'three';
import * as HELPERS from './helpers.js';
import * as MATERIALS from "./materials.js";

export function buildDesk()
{
  const desk = new THREE.Group();
  // Desk Feet
  var baseCylinder = HELPERS.cylinderY(.125, .125, .0625, MATERIALS.foot)
  var cylinderLeftFront = baseCylinder.clone()
  var cylinderRightFront = baseCylinder.clone()
  var cylinderLeftBack = baseCylinder.clone()
  var cylinderRightBack = baseCylinder.clone()
  cylinderLeftFront.position.set(-2, 0, 1)
  cylinderRightFront.position.set(2, 0, 1)
  cylinderLeftBack.position.set(-2, 0, -1)
  cylinderRightBack.position.set(2, 0, -1)
  desk.add(cylinderLeftFront, cylinderRightFront, cylinderLeftBack, cylinderRightBack)

  // Desk Legs
  var baseLeg = new THREE.BoxGeometry(.125, 2, .125);
  var legMesh = new THREE.Mesh(baseLeg, MATERIALS.lightWood);
  legMesh.castShadow = true
  legMesh.receiveShadow = true;
  var leg1 = legMesh.clone()
  var leg2 = legMesh.clone()
  var leg3 = legMesh.clone()
  var leg4 = legMesh.clone()
  leg1.position.set(-2, 1, 1)
  leg2.position.set(2, 1, 1)
  leg3.position.set(-2, 1, -1)
  leg4.position.set(2, 1, -1)
  desk.add(leg1, leg2, leg3, leg4);

  // Desktop
  var desktopBase = new THREE.BoxGeometry(4.2, .125, 2.2);
  var desktop = new THREE.Mesh(desktopBase, MATERIALS.darkWood);
  desktop.castShadow = true
  desktop.receiveShadow = true;
  desktop.position.set(0, 2, 0)
  desk.add(desktop);

  // PC Mat
  var matBase = HELPERS.cylinderY (.75, .75, .0390625, MATERIALS.matErial)
  var mat = matBase.clone()
  mat.position.set(-1, 2.05, 0)
  desk.add(mat)

  // Drawer Container
  var containerBase = new THREE.BoxGeometry(2, 1.5, 2)
  var container = new THREE.Mesh(containerBase, MATERIALS.wood);
  container.castShadow = true;
  container.receiveShadow = true;
  container.position.set(1, 1.25, 0);
  desk.add(container)

  // Drawers
  var drawerBase = new THREE.BoxGeometry(1.5, .5, .125);
  var drawer = new THREE.Mesh(drawerBase, MATERIALS.lightWood)
  drawer.castShadow = true;
  drawer.receiveShadow = true;
  drawer.position.set(1, 1, 1);
  var sphereGeom = new THREE.SphereGeometry(0.125, 16, 16, 0, Math.PI * 2, 0 , Math.PI / 2)
  var drawerHandle = new THREE.Mesh(sphereGeom, MATERIALS.black)
  drawerHandle.position.set(0, -0.05, 0)
  drawer.add(drawerHandle);
  var drawer2 = drawer.clone();
  drawer2.position.set(1, 1.6, 1);
  desk.add(drawer, drawer2)
  
  return desk;
}