import * as THREE from 'three';

export const lightWood = new THREE.MeshStandardMaterial({ color: 0xad7c50, roughness: 0.75, metalness: 0.05 });
export const wood = new THREE.MeshStandardMaterial({ color: 0x9c6b3f, roughness: 0.75, metalness: 0.05 });
export const foot = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 1, metalness: 0.0 });
export const matErial = new THREE.MeshStandardMaterial({ color: 0x008800, roughness: 0.2, metalness: 0.0 });
export const black = new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide });
export const darkWood = new THREE.MeshStandardMaterial({ color: 0x8b5a2e, roughness: 0.75, metalness: 0.05 });
export const beige = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, metalness: 0.1, roughness: 0.7, side: THREE.DoubleSide, flatShading: true });
export const wall = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.75, metalness: 0.5 });
export const metal = new THREE.MeshStandardMaterial({ color: 0x808080, metalness: 1, side: THREE.DoubleSide });
export const metalLight = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, metalness: 1, side: THREE.DoubleSide });
export const bulb = new THREE.MeshBasicMaterial({ color: 0xFFFF80});
export const glass = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.4});