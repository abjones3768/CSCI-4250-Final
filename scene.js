/* ---------------- Imports ---------------- */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as DESK from './desk.js';
import * as PC from './pc.js';
import * as ENV from './environment.js';
import * as LIGHT from './light.js';
import * as MACHINE from './machineBase.js';
import * as BELTS from './belts.js';

/* ---------------- Scene, Renderer, Camera Init ---------------- */
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(16, 32, 16);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.55, 0);
controls.enableDamping = true;

/* ---------------- Lights & Ground ---------------- */
scene.add(new THREE.HemisphereLight(0xffffff, 0x334455, 0.2));
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({ color: 0xd9dde2 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

/* ---------------- Scene Building ---------------- */
const desk = DESK.buildDesk();
desk.position.set(10, 0, -10)
scene.add(desk)

const pc = PC.buildPC();
pc.position.set(9, 2.05, -10); // Position on table mat
pc.scale.set(0.5, 0.5, 0.5);
scene.add(pc)

const room = ENV.buildRoom();
room.position.set(0, 8, 0);
room.scale.set(8.75, 4, 8.75);
scene.add(room)

const light1 = LIGHT.buildLight();
light1.position.set(-8, 12, 8);
const light2 = LIGHT.buildLight();
light2.position.set(-8, 12, -8);
const light3 = LIGHT.buildLight();
light3.position.set(8, 12, 8);
const light4 = LIGHT.buildLight();
light4.position.set(8, 12, -8);
scene.add(light1, light2, light3, light4)

var beltArr = [];
var beltCornerArr = [];
const numBelts = 16;
for (var i = 0; i < numBelts; i++)
{
  beltArr[i] = BELTS.buildBelt();
}
for (var i = 0; i < numBelts; i++)
{
  beltCornerArr[i] = BELTS.buildCornerBelt();
}

beltArr[0].position.set(16, 2, 8);
beltArr[1].position.set(14, 2, 8);
beltArr[2].position.set(12, 2, 8);
beltArr[3].position.set(4, 2, 8);
beltArr[4].position.set(2, 2, 8);
beltArr[5].position.set(0, 2, 8);
beltArr[6].position.set(-8, 2, 8);
beltArr[7].position.set(-10, 2, 8);
beltArr[8].position.set(-12, 2, 6);
beltArr[8].rotation.set(0, Math.PI / 2, 0);
beltArr[9].position.set(-12, 2, 4);
beltArr[9].rotation.set(0, Math.PI / 2, 0);
beltArr[10].position.set(-12, 2, 2);
beltArr[10].rotation.set(0, Math.PI / 2, 0);
scene.add(beltArr[0], beltArr[1], beltArr[2], 
          beltArr[3], beltArr[4], beltArr[5], 
          beltArr[6], beltArr[7], beltArr[8], 
          beltArr[9], beltArr[10]);

beltCornerArr[0].position.set(-12, 2, 8);
beltCornerArr[1].position.set(-12, 2, 0);
beltCornerArr[1].rotation.set(0, -Math.PI / 2, 0);
scene.add(beltCornerArr[0], beltCornerArr[1]);

const machine = MACHINE.buildMachine();
machine.position.set(6, 1.25, 6.25);
const machine2 = MACHINE.buildMachine();
machine2.position.set(-6, 1.25, 6.25);
scene.add(machine, machine2)

/* ---------------- Resize & Render ---------------- */
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);

/* ---------------- Render Loop ---------------- */
renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
