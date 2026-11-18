// Breck Mesh Object

import * as THREE from 'three';
import * as HELPERS from './helpers.js';
import * as MATERIALS from "./materials.js";

export function buildPC() {
  // data
  const vertices = [];
  const indices = [];
  let vertexIndex = 0;

  // Helper function to add a vertex
  function addVertex(x, y, z) {
    vertices.push(x, y, z);
    return vertexIndex++;
  }
  
  //-- Base of PC (tower resting on side) -- //

  var b0 = addVertex(-1, 0, 1); // Left bottom front
  var b1 = addVertex(-1, 0, -1); // Left bottom back
  var b2 = addVertex(1, 0, 1); // Right bottom front
  var b3 = addVertex(1, 0, -1); // Right bottom back

  var t0 = addVertex(-1, .5, 1); // Left top front
  var t1 = addVertex(-1, .5, -1); // Left top back
  var t2 = addVertex(1, .5, 1); // Right top front
  var t3 = addVertex(1, .5, -1); // Right top back

  // Bottom
  indices.push(b0, b1, b2);
  indices.push(b1, b2, b3);

  // Left side
  indices.push(b0, b1, t0)
  indices.push(b1, t0, t1)

  // Right side
  indices.push(b2, b3, t2)
  indices.push(b3, t2 ,t3)

  // Front side
  indices.push(b0, b2, t0)
  indices.push(b2, t0, t2)

  // Back side
  indices.push(b1, b3, t1)
  indices.push(b3, t1, t3)

  // Top side
  indices.push(t0, t1, t2)
  indices.push(t2, t1, t3)

  // PC Geometry
  const geometryPC = new THREE.BufferGeometry();
  geometryPC.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); //position is a built-in Three.js attribute name recognized by shaders.
  geometryPC.setIndex(indices);
  geometryPC.computeVertexNormals();

  // Clear arrays to prepare for new mesh
  vertices.length = 0
  indices.length = 0
  vertexIndex = 0;

  //-- Base of monitor -- //
  const geometryBase = HELPERS.cylinderY(0.6, 0.6, 1, MATERIALS.beige)

  //-- Monitor -- //
  // Shell
  var lbf = addVertex(-1, 0, 1);
  var rbf = addVertex(1, 0, 1);
  var ltf = addVertex(-1, 1, 1);
  var rtf = addVertex(1, 1, 1);

  var lbb = addVertex(-.6, .2, -1);
  var rbb = addVertex(.6, .2, -1);
  var ltb = addVertex(-.6, .8, -1);
  var rtb = addVertex(.6, .8, -1);

  // Front
  indices.push(lbf, rbf, ltf);
  indices.push(rtf, ltf, rbf);

  // Left back
  indices.push(lbf, ltf, ltb)
  indices.push(lbf, lbb, ltb)

  // Right back
  indices.push(rbf, rtf, rtb)
  indices.push(rbf, rbb, rtb)

  // Top
  indices.push(ltf, ltb, rtf)
  indices.push(ltb, rtb, rtf)

  // Bottom
  indices.push(lbf, lbb, rbf)
  indices.push(lbb, rbb, rbf)

  // Back
  indices.push(lbb, rbb, ltb)
  indices.push(ltb, rtb, rbb);
  

  // Monitor geometry
  const geometryMonitor = new THREE.BufferGeometry();
  geometryMonitor.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); //position is a built-in Three.js attribute name recognized by shaders.
  geometryMonitor.setIndex(indices);
  geometryMonitor.computeVertexNormals();

  vertices.length = 0
  indices.length = 0
  vertexIndex = 0;

  // Screen 
  var slb = addVertex(-.9, .1, 1.05);
  var srb = addVertex(.9, .1, 1.05);
  var slt = addVertex(-.9, .9, 1.05);
  var srt = addVertex(.9, .9, 1.05);

  indices.push(slb, srb, slt);
  indices.push(srb, srt, slt);

  const geometryScreen = new THREE.BufferGeometry();
  geometryScreen.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); //position is a built-in Three.js attribute name recognized by shaders.
  geometryScreen.setIndex(indices);
  geometryScreen.computeVertexNormals();

  // Create PC mesh
  const pc = new THREE.Mesh(geometryPC, MATERIALS.beige);
  pc.castShadow = true;
  pc.receiveShadow = true;

  // Add monitor base
  geometryBase.position.set(0, 0.5, 0)
  pc.add(geometryBase);

  // Create monitor mesh
  const monitor = new THREE.Mesh(geometryMonitor, MATERIALS.beige)
  monitor.castShadow = true
  monitor.receiveShadow = true;
  monitor.position.set(0, 0.6, 0);
  monitor.scale.set(.9, 1 + (1/3), .9);
  pc.add(monitor)

  // Create screen mesh
  const screen = new THREE.Mesh(geometryScreen, MATERIALS.black)
  screen.position.set(0, 0.6, 0);
  screen.scale.set(.9, 1 + (1/3), .9);
  pc.add(screen);

  return pc;
}