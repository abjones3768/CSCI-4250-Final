/* ---------------- Imports ---------------- */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as DESK from './desk.js';
import * as PC from './pc.js';
import * as ENV from './environment.js';
import * as LIGHT from './light.js';

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
room.scale.set(8, 4, 8);
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
