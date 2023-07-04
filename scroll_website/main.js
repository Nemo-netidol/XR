import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Class

// We need 3 objects. Scene, Camera and Renderer.
// Scene acts as container which holds objects, camera and light.

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Mimic what human eye ball can see

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), // DOM element
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30); // move camera to z-axis for better perspective
camera.position.setX(-3);
renderer.render( scene, camera );

// Add objects

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} ) //assign material to our object
const torus = new THREE.Mesh( geometry, material );
// Mesh =  material made of a network of wire or thread.

scene.add(torus);

// Add light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight); // shows us where the light source is 
const gridHelper = new THREE.GridHelper(200, 50);

// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement); // Listen to DOM event and update camera position respectively

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) ); // random star position

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar); // Number of star


const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


const imgtexture = new THREE.TextureLoader().load('img.png');

const img = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3), 
  new THREE.MeshBasicMaterial( {map: imgtexture} )
);

scene.add(img)

// MOON

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32), 
  new THREE.MeshStandardMaterial( {
    map: moonTexture, 
    normalMap: normalTexture
  } )
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

img.position.z = -5;	
img.position.x = 2;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top; // dimension of the viewport
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  img.rotation.y += 0.01;
  img.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera
moveCamera()



function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // controls.update();
  moon.rotation.x += 0.005;

  renderer.render( scene, camera );
}

animate();

