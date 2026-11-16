// AI Statement: I completed this assignment without using generative AI tools.

/*
Running this program displays a desk and a computer. The desk is created with the three.js
cube, sphere, and cylinder primitives. The computer is a mesh object with hardcoded points defined in the code
*/
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/* ---------------- Scene / Renderer / Camera ---------------- */
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x404040);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(3.5, 2.0, 3.8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.55, 0);
controls.enableDamping = true;

/* ---------------- Lights & Ground ---------------- */
scene.add(new THREE.HemisphereLight(0xffffff, 0x334455, 0.6));
const key = new THREE.DirectionalLight(0xffffff, 0.9);
key.position.set(4, 6, 3);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
scene.add(key);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({ color: 0xd9dde2 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

/* ---------------- Materials ---------------- */
const lightWood = new THREE.MeshStandardMaterial({ color: 0xad7c50, roughness: 0.75, metalness: 0.05 });
const wood = new THREE.MeshStandardMaterial({ color: 0x9c6b3f, roughness: 0.75, metalness: 0.05 });
const foot = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 1, metalness: 0.0 });
const matErial = new THREE.MeshStandardMaterial({ color: 0x008800, roughness: 0.2, metalness: 0.0 });
const black = new THREE.MeshStandardMaterial({ color: 0x000000 });
const darkWood = new THREE.MeshStandardMaterial({ color: 0x8b5a2e, roughness: 0.75, metalness: 0.05 });
const beige = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, metalness: 0.1, roughness: 0.7, side: THREE.DoubleSide, flatShading: true });

/* ---------------- Helpers ---------------- */
function cylinderY(rTop, rBot, h, mat) {
  const geo = new THREE.CylinderGeometry(rTop, rBot, h, 24);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function buildBench()
{
  const bench = new THREE.Group();
  // Desk Feet
  var baseCylinder = cylinderY(.125, .125, .0625, foot)
  var cylinderLeftFront = baseCylinder.clone()
  var cylinderRightFront = baseCylinder.clone()
  var cylinderLeftBack = baseCylinder.clone()
  var cylinderRightBack = baseCylinder.clone()
  cylinderLeftFront.position.set(-2, 0, 1)
  cylinderRightFront.position.set(2, 0, 1)
  cylinderLeftBack.position.set(-2, 0, -1)
  cylinderRightBack.position.set(2, 0, -1)
  bench.add(cylinderLeftFront, cylinderRightFront, cylinderLeftBack, cylinderRightBack)

  // Desk Legs
  var baseLeg = new THREE.BoxGeometry(.125, 2, .125);
  var legMesh = new THREE.Mesh(baseLeg, lightWood);
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
  bench.add(leg1, leg2, leg3, leg4);

  // Desktop
  var desktopBase = new THREE.BoxGeometry(4.2, .125, 2.2);
  var desktop = new THREE.Mesh(desktopBase, darkWood);
  desktop.castShadow = true
  desktop.receiveShadow = true;
  desktop.position.set(0, 2, 0)
  bench.add(desktop);

  // PC Mat
  var matBase = cylinderY (.75, .75, .0390625, matErial)
  var mat = matBase.clone()
  mat.position.set(-1, 2.05, 0)
  bench.add(mat)

  // Drawer Container
  var containerBase = new THREE.BoxGeometry(2, 1.5, 2)
  var container = new THREE.Mesh(containerBase, wood);
  container.castShadow = true;
  container.receiveShadow = true;
  container.position.set(1, 1.25, 0);
  bench.add(container)

  // Drawers
  var drawerBase = new THREE.BoxGeometry(1.5, .5, .125);
  var drawer = new THREE.Mesh(drawerBase, lightWood)
  drawer.castShadow = true;
  drawer.receiveShadow = true;
  drawer.position.set(1, 1, 1);
  var sphereGeom = new THREE.SphereGeometry(0.125, 16, 16, 0, Math.PI * 2, 0 , Math.PI / 2)
  var drawerHandle = new THREE.Mesh(sphereGeom, black)
  drawerHandle.position.set(0, -0.05, 0)
  drawer.add(drawerHandle);
  var drawer2 = drawer.clone();
  drawer2.position.set(1, 1.6, 1);
  //drawer.add(drawerHandle);
  bench.add(drawer, drawer2)

  return bench;
}

function buildPC() {
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
  const geometryBase = cylinderY(0.6, 0.6, 1, beige)

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
  const pc = new THREE.Mesh(geometryPC, beige);
  pc.castShadow = true;
  pc.receiveShadow = true;

  // Add monitor base
  geometryBase.position.set(0, 0.5, 0)
  pc.add(geometryBase);

  // Create monitor mesh
  const monitor = new THREE.Mesh(geometryMonitor, beige)
  monitor.castShadow = true
  monitor.receiveShadow = true;
  monitor.position.set(0, 0.6, 0);
  monitor.scale.set(.9, 1 + (1/3), .9);
  pc.add(monitor)

  // Create screen mesh
  const screen = new THREE.Mesh(geometryScreen, black)
  screen.position.set(0, 0.6, 0);
  screen.scale.set(.9, 1 + (1/3), .9);
  pc.add(screen);

  return pc;
}

const bench = buildBench();
const pc = buildPC();
pc.position.set(-1, 2.05, 0); // Position on table mat
pc.scale.set(0.5, 0.5, 0.5);
scene.add(bench, pc);

/* ---------------- Resize & Render ---------------- */
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
