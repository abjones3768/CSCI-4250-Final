//I will create a drinking bird 

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls, drinkBird = new THREE.Group(),moveBird = new THREE.Group(), saucer, cup;
let isDrinking = false, birdAngle = 0, birdRotation = 0;
const matRed = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const matGrey = new THREE.MeshBasicMaterial({ color: 0xd3d3d3 });
const matYellow  = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const matWhite = new THREE.MeshBasicMaterial({ color: 0xffffff }); 
const matBlack = new THREE.MeshBasicMaterial({ color: 0x000000 }); 
// Initialize scene
init();

// ──────────────────────────────────────────────────────────────────────────────
// SETUP (scene, camera, renderer)
// ──────────────────────────────────────────────────────────────────────────────
function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101418);

  // Camera
  const aspect = window.innerWidth / window.innerHeight;
  const orthoSize = 4;
  const height = orthoSize / 2;
  const width = height * aspect;

  camera = new THREE.OrthographicCamera(
    -width, width,
    height, -height,
    0.1, 100
  );

  camera.position.set(2, 2, 2);
  camera.lookAt(0, 0.5, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 0.5, 0);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 5);
  scene.add(directionalLight);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.8 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Grid helper
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);


  // Axes helper
  const axesHelper = new THREE.AxesHelper(2);
  scene.add(axesHelper);

  // Create the drinking bird
  createDrinkingBird();
  //create the saucer and cup
  createSaucer();
  createCup();
  // Handle resize
  window.addEventListener('resize', onWindowResize);

  animate();
}

// ──────────────────────────────────────────────────────────────────────────────
// CREATE DRINKING BIRD
// ──────────────────────────────────────────────────────────────────────────────
function createDrinkingBird() {
  const vertices = [];
  const indices = [];
  let vertexIndex = 0;
  
  scene.add(drinkBird);
  
  /* Create geometry for mesh object
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();*/

  //Create the foot platform, then the legs
  const baseWidth = 1;
  const baseHeight = 0.1;
  const baseDepth = 0.6;
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth),
    matRed
  );

  drinkBird.add(base); //Add the base for the drinking bird

  const legWidth = 0.1
  const legHeight = 1.5
  const legDepth = 0.3
  const leg = new THREE.Mesh(
    new THREE.BoxGeometry(legWidth, legHeight, legDepth),
    matRed
  );
  leg.position.y = 0.75
  leg.position.x = -0.4;
  const leg2 = leg.clone(true);
  leg2.position.x = 0.4;
  drinkBird.add(leg);
  drinkBird.add(leg2);

  //Create the 2 spheres connected by a long cylinder with a perpendicular cylinder piercing
  const poleWidth = 0.05;
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(
	poleWidth, poleWidth, 1.5, 12), matGrey);
  pole.position.y = 1;
  pole.rotation.z = -Math.PI/2;
  drinkBird.add(pole);

  const pole2 = new THREE.Mesh(new THREE.CylinderGeometry(
	poleWidth, poleWidth, 1, 12), matGrey);
  moveBird.add(pole2);

  const bottomSphere = new THREE.Mesh(
    new THREE.SphereGeometry( 0.2, 32, 16 ),
    matGrey
  );
  bottomSphere.position.y = -0.60;
  
  const topSphere = new THREE.Mesh(
    new THREE.SphereGeometry( 0.2, 32, 16 ),
    matRed
  );
  topSphere.position.y = 0.6;

  moveBird.add(bottomSphere);
  moveBird.add(topSphere);
  
  //it. Then a cone for a beak and flat circles for eyes
  const beak = new THREE.Mesh(
    new THREE.ConeGeometry( 0.13, 0.25, 10),
    matYellow
  );

   beak.rotation.x = Math.PI/2;
   moveBird.add(beak);
   beak.position.z = 0.2;
   beak.position.y = 0.55;

  const eye = new THREE.Group();
  moveBird.add(eye);
  const eyeBall = new THREE.Mesh(
    new THREE.SphereGeometry( 0.05, 32, 16 ),
    matWhite
   );

   eyeBall.position.z = 0.2;
   eyeBall.position.y = 0.7;

  const pupil = new THREE.Mesh(
    new THREE.SphereGeometry( 0.03, 32, 16 ),
    matBlack
   );
    pupil.position.z = 0.23;
    pupil.position.y = 0.7;
    eye.add(pupil);

   eye.add(eyeBall);
   eye.position.x = -0.1;
   eye.position.y = -0.05
   eye.position.z = -0.05;

   const eye2 = eye.clone(true);
   moveBird.add(eye2);
   eye2.position.x = 0.1;
   moveBird.position.set(0, 0.65, 0);
   moveBird.position.y = 1;
   drinkBird.add(moveBird);

  // Create mesh
  drinkBird.castShadow = true;
  drinkBird.receiveShadow = true;
  drinkBird.position.y = 0.05; // Move bird up a little
}

//
// CUP AND SAUCER
//

function createSaucer(){
  const vertices = [
    //PLATE
    -0.5, 0, -0.5, //0. top left plate vertex when facing the front of the drinking bird
    0.5, 0, -0.5, //1.Top right
    0.5, 0, 0.5, //2.Bottom right
    -0.5, 0, 0.5, //3.bottom left
    
    //SLOPES//
    -0.6, 0.1, -0.6, //4.Top-leftmost corner of the plate when facing the dront of bird
    -0.6, 0.1, 0.6, //5.Bottom-leftmost corner of the plate slopes
    0.6, 0.1, 0.6, //6.Bottom-rightmost corrner of the plate slopes
    0.6, 0.1, -0.6, //7.Top-rightmost corner slopes

    //SLOPETOPS
    -0.7, 0.1, -0.6, //8. Left of 4
    -0.7, 0.1, 0.7, //9. Bottomleft of 5
    0.7, 0.1, 0.7, //10. Bottomright of 6
    0.7, 0.1, -0.6 //11. right of 7

    
  ]

  const indices = [
    0, 2, 1,//Flat bottom
    0, 2, 3,

    0, 5, 3, //Left slope
    0, 4, 5,

    3, 6, 2, //Back slope
    3, 6, 5,
    
    2, 1, 7, //right slope
    2, 7, 6,

    4, 8, 9, //Left slopetop
    4, 9, 5,

    5, 9, 10, //backslope
    5, 10, 6,

    6, 10, 11,
    6, 11, 7

  ]

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: 0x808080, // Medium gray
    metalness: 0.1,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  
  saucer = new THREE.Mesh(geometry, material);

  saucer.castShadow = true;
  saucer.receiveShadow = true;
  saucer.position.y = 0.01;
  saucer.position.z = 0.85;
  scene.add(saucer);
}

//Repurposing the function from bin.js to make an extra cup object outside of the 
//required mesh extrusion and primitives
function createCup(){
    // Trash can dimensions
    const radius = 0.3;      // Outer radius (width)
    const height = 0.95;      // Height (taller than width)
    const thickness = 0.05;  // Wall thickness
    const innerRadius = radius - thickness; // Inner radius
    const numSides = 36;      // Hexagonal (6 sides)
  
    const vertices = [];
    const indices = [];
    let vertexIndex = 0;
  
    // Helper function to create a hexagon at a given height
    function createHexagon(y, r) {
      const hexVerts = [];
      for (let i = 0; i < numSides; i++) {
        const angle = (i / numSides) * Math.PI * 2;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        hexVerts.push({ x, y, z });
      }
      return hexVerts;
    }
  
    // Create outer and inner hexagons at bottom and top
    const bottomOuter = createHexagon(0, radius);
    const bottomInner = createHexagon(0, innerRadius);
    const topOuter = createHexagon(height, radius);
    const topInner = createHexagon(height, innerRadius);
  
    // Add vertices for outer hexagons
    const bottomOuterStart = vertexIndex;
    bottomOuter.forEach(v => {
      vertices.push(v.x, v.y, v.z);
      vertexIndex++;
    });
  
    const topOuterStart = vertexIndex;
    topOuter.forEach(v => {
      vertices.push(v.x, v.y, v.z);
      vertexIndex++;
    });
  
    // Add vertices for inner hexagons
    const bottomInnerStart = vertexIndex;
    bottomInner.forEach(v => {
      vertices.push(v.x, v.y, v.z);
      vertexIndex++;
    });
  
    const topInnerStart = vertexIndex;
    topInner.forEach(v => {
      vertices.push(v.x, v.y, v.z);
      vertexIndex++;
    });
  
    // Create solid wall faces (6 sides)
    // Each side connects outer hexagon to inner hexagon, forming a solid wall
    for (let i = 0; i < numSides; i++) {
      const next = (i + 1) % numSides;
      
      // Outer vertices
      const ob1 = bottomOuterStart + i;  // outer bottom current
      const ob2 = bottomOuterStart + next; // outer bottom next
      const ot1 = topOuterStart + i;     // outer top current
      const ot2 = topOuterStart + next;  // outer top next
      
      // Inner vertices
      const ib1 = bottomInnerStart + i;  // inner bottom current
      const ib2 = bottomInnerStart + next; // inner bottom next
      const it1 = topInnerStart + i;     // inner top current
      const it2 = topInnerStart + next;  // inner top next
  
      // Outer face (facing outward, CCW when viewed from outside)
      // Quad: ob1(bottom-left) → ob2(bottom-right) → ot2(top-right) → ot1(top-left)
      indices.push(ob1, ob2, ot2);  // Triangle 1: ob1 → ob2 → ot2 (CCW)
      indices.push(ob1, ot2, ot1);  // Triangle 2: ob1 → ot2 → ot1 (CCW)
  
      // Inner face (facing inward, CCW when viewed from outside)
      // Quad: ib1(bottom-left) → ib2(bottom-right) → it2(top-right) → it1(top-left)
      indices.push(ib1, ib2, it2);  // Triangle 1: ib1 → ib2 → it2 (CCW from outside)
      indices.push(ib1, it2, it1);  // Triangle 2: ib1 → it2 → it1 (CCW from outside)
  
    }
  
    // Create top rim (connecting outer and inner hexagons at the top)
    for (let i = 0; i < numSides; i++) {
      const next = (i + 1) % numSides;
      
      const ot1 = topOuterStart + i;     // outer top current
      const ot2 = topOuterStart + next;  // outer top next
      const it1 = topInnerStart + i;     // inner top current
      const it2 = topInnerStart + next;  // inner top next
  
      // Top rim face (connecting outer to inner at top edge, CCW when viewed from above)
      // Quad: ot1(outer-left) → ot2(outer-right) → it2(inner-right) → it1(inner-left)
      indices.push(ot1, ot2, it2);  // Triangle 1: ot1 → ot2 → it2 (CCW from above)
      indices.push(ot1, it2, it1);  // Triangle 2: ot1 → it2 → it1 (CCW from above)
    }
  
    // Create bottom cap (outer hexagon with inner hole)
    // Add center point for outer hexagon
    const bottomOuterCenter = vertexIndex;
    vertices.push(0, 0, 0);
    vertexIndex++;
    
    // Outer ring triangles (fan from center, CCW when viewed from below)
    // Normal should point down, so CCW from below: center → next → current
    for (let i = 0; i < numSides; i++) {
      const next = (i + 1) % numSides;
      indices.push(bottomOuterCenter, bottomOuterStart + next, bottomOuterStart + i);
    }
  
  
    // Create geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
  
    // Medium gray material
    const material = new THREE.MeshStandardMaterial({
      color: matWhite, // Medium gray
      metalness: 0.1,
      roughness: 0.0,
      side: THREE.DoubleSide
    });
    material.transparent = true;
    material.opacity = 0.75;
  
    // Create mesh
    cup = new THREE.Mesh(geometry, material);
    cup.castShadow = true;
    cup.receiveShadow = true;
    cup.position.y = 0.025; // Move trash can up a little
    cup.position.z = 0.65;
    
    scene.add(cup);
}

// ──────────────────────────────────────────────────────────────────────────────
// RENDER LOOP
// ──────────────────────────────────────────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);
  if(isDrinking){
    moveBird.rotation.x = Math.abs(Math.sin(Date.now()*0.003)*(Math.PI/2));
  }
  controls.update();
  
  renderer.render(scene, camera);
}

// ──────────────────────────────────────────────────────────────────────────────
// WINDOW RESIZE HANDLER
// ──────────────────────────────────────────────────────────────────────────────
function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;

  const height = 4 / 2;
  const width = height * aspect;

  camera.left = -width;
  camera.right = width;
  camera.top = height;
  camera.bottom = -height;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === 'a'){
    if(isDrinking){
      isDrinking = false;
    } else {
      isDrinking = true;
    }
    
  }
});