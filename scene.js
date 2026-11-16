/* ---------------- Imports ---------------- */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as DESK from './desk.js'
import * as PC from './pc.js'

/* ---------------- Scene, Renderer, Camera Init ---------------- */
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

/* ---------------- Scene Building ---------------- */
const desk = DESK.buildDesk();
const pc = PC.buildPC();
pc.position.set(-1, 2.05, 0); // Position on table mat
pc.scale.set(0.5, 0.5, 0.5);
scene.add(desk, pc);

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
