import './style.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

/***************************** ORBIT CONTROLS *****************************/
new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)


/***************************** DAT GUI *****************************/
const gui = new GUI();

const cubeGuiFolder = gui.addFolder('Cube');
cubeGuiFolder.add(cube.rotation, 'x', 0, Math.PI*2);
cubeGuiFolder.add(cube.rotation, 'y', 0, Math.PI*2);
cubeGuiFolder.add(cube.rotation, 'z', 0, Math.PI*2);
cubeGuiFolder.open();

const cameraGuiFolder = gui.addFolder('Camera');
cameraGuiFolder.add(camera.position, 'z', 0, 10);
cameraGuiFolder.open();

/***************************** STATS *****************************/
const stats = new Stats();
document.body.appendChild(stats.dom);

function animate() {
  requestAnimationFrame(animate)
  
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  
  renderer.render(scene, camera)

  stats.update();
}

animate()