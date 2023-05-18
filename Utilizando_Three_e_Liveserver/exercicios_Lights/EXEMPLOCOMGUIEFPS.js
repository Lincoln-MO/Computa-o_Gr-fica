import * as THREE from 'three';

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

import dat from 'dat.gui';


// Scene, camera and renderer setup

const scene = new THREE.Scene();

const perspectiveCamera = new THREE.PerspectiveCamera(75,

  window.innerWidth / window.innerHeight,

  0.1, 1000);

const orthographicCamera = new THREE.OrthographicCamera(

  window.innerWidth / -2, window.innerWidth / 2,

  window.innerHeight / 2, window.innerHeight / -2,

  0.1, 1000);

let currentCamera = perspectiveCamera;

function updateProjection(type) {

  if (type === 'perspective') {

    currentCamera = perspectiveCamera;

    cube.scale.set(1, 1, 1);

    currentCamera.position.z = 5;

  } else if (type === 'orthographic') {

    currentCamera = orthographicCamera;

    cube.scale.set(50, 50, 50); // Increase the scale of the cube

    currentCamera.position.z = 5; // Adjust the camera's position

  }

  controls.object = currentCamera; // Update the camera used by FlyControls

}

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//Adicionar luz a cena
const luz = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( luz );
//adiciona luz direcional de cor amarela
const luzdirecional = new THREE.DirectionalLight( 0xFFFF00, 0.5 );

scene.add( luzdirecional );

// Add cube to scene

const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshLambertMaterial({

  color: 0x9932CC,

  side: THREE.DoubleSide

});
//adisciona uma esfera a cena
const geometry2 = new THREE.SphereGeometry( 1, 32,12 );
const material2 = new THREE.MeshPhongMaterial( { color: 0xFFD700, side: THREE.DoubleSide} );

const sphere = new THREE.Mesh( geometry2, material2 );
const cube = new THREE.Mesh(geometry, material);

//seta posiçao do cubo
cube.position.x = 3;
cube.position.y = 3;
//seta posiçao da esfera
sphere.position.x = -3;
sphere.position.y = -3;

scene.add(cube);
scene.add( sphere );

//Adiciona o primeiro SpotLight 01 vermelho
const spotlightvermelho = new THREE.SpotLight(0xff0000); // Cor da luz (vermelho)
spotlightvermelho.position.set(5, 5, 5); // Posição da luz
scene.add(spotlightvermelho);

spotlightvermelho.target.position.set(3, 3, 3); // Posição do alvo do holofote
scene.add(spotlightvermelho.target);
spotlightvermelho.target.updateMatrixWorld(); // Atualiza a matriz do mundo do alvo
spotlightvermelho.target.updateWorldMatrix(true, false); // Atualiza a matriz mundial do alvo
spotlightvermelho.target.updateMatrix(); // Atualiza a matriz do alvo
spotlightvermelho.target.matrixWorldNeedsUpdate = true; // Marca a matriz mundial do alvo para atualização
spotlightvermelho.target.updateMatrixWorld(true); // Atualiza a matriz mundial do alvo
spotlightvermelho.angle = Math.PI / 4; // Ângulo do holofote (em radianos)
spotlightvermelho.penumbra = 0.05; // Suavidade das bordas do holofote (0 - 1)
spotlightvermelho.distance = 20; // Distância máxima da luz
spotlightvermelho.intensity = 1; // Intensidade da luz (0 - 1)
spotlightvermelho.castShadow = true; // Habilita o sombreamento produzido pelo holofote

//Adiciona o segundo SpotLight 02 azul
const spotlightazul = new THREE.SpotLight(0x0000ff); // Cor da luz (azul)
spotlightazul.position.set(-5, -5, 5); // Posição da luz
scene.add(spotlightazul);

spotlightazul.target.position.set(-3, -3, 3); // Posição do alvo do holofote
scene.add(spotlightazul.target);
spotlightazul.target.updateMatrixWorld(); // Atualiza a matriz do mundo do alvo
spotlightazul.target.updateWorldMatrix(true, false); // Atualiza a matriz mundial do alvo
spotlightazul.target.updateMatrix(); // Atualiza a matriz do alvo
spotlightazul.target.matrixWorldNeedsUpdate = true; // Marca a matriz mundial do alvo para atualização
spotlightazul.target.updateMatrixWorld(true); // Atualiza a matriz mundial do alvo
spotlightazul.angle = Math.PI / 4; // Ângulo do holofote (em radianos)
spotlightazul.penumbra = 0.05; // Suavidade das bordas do holofote (0 - 1)
spotlightazul.distance = 20; // Distância máxima da luz
spotlightazul.intensity = 1; // Intensidade da luz (0 - 1)
spotlightazul.castShadow = true; // Habilita o sombreamento produzido pelo holofote

//Adiciona o segundo SpotLight 03 verde
const spotlightverde = new THREE.SpotLight(0x00ff00); // Cor da luz (verde)
spotlightverde.position.set(3,3, 10); // Posição da luz
scene.add(spotlightverde);

spotlightverde.target.position.set(-1, -1, 1); // Posição do alvo do holofote
scene.add(spotlightverde.target);
spotlightverde.target.updateMatrixWorld(); // Atualiza a matriz do mundo do alvo
spotlightverde.target.updateWorldMatrix(true, false); // Atualiza a matriz mundial do alvo
spotlightverde.target.updateMatrix(); // Atualiza a matriz do alvo
spotlightverde.target.matrixWorldNeedsUpdate = true; // Marca a matriz mundial do alvo para atualização
spotlightverde.target.updateMatrixWorld(true); // Atualiza a matriz mundial do alvo
spotlightverde.angle = Math.PI / 4; // Ângulo do holofote (em radianos)
spotlightverde.penumbra = 0.05; // Suavidade das bordas do holofote (0 - 1)
spotlightverde.distance = 20; // Distância máxima da luz
spotlightverde.intensity = 1; // Intensidade da luz (0 - 1)
spotlightverde.castShadow = true; // Habilita o sombreamento produzido pelo holofote

//pra ajudar a ver o spotlight
let showSpotlights = true;
const spotlightHelpervermelho = new THREE.SpotLightHelper(spotlightvermelho);
const spotlightHelperazul = new THREE.SpotLightHelper(spotlightazul);
const spotlightHelperverde = new THREE.SpotLightHelper(spotlightverde);
scene.add(spotlightHelpervermelho);
scene.add(spotlightHelperazul);
scene.add(spotlightHelperverde);

// Add axis helper

const axesHelper = new THREE.AxesHelper(100); // Parameter determines the size of the helper

scene.add(axesHelper);

currentCamera.position.z = 5;

// Add TrackballControls

const controls = new TrackballControls(currentCamera, renderer.domElement);

// Add dat.GUI controls

const gui = new dat.GUI();

const projectionType = { type: 'perspective' };

gui.add(projectionType, 'type', ['perspective', 'orthographic']).onChange(updateProjection);

// Add event listener for 'keydown' event

window.addEventListener('keydown', (event) => {

  if (event.key === 'c' || event.key === 'C') {

    material.wireframe = !material.wireframe;

  }

});

// Create FPS counter

const stats = new Stats();

stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

document.body.appendChild(stats.dom);

//mover as luzes
var radius = 1;
var angle = 0;

// Animate function

function animate() {

  requestAnimationFrame(animate);

  // Begin FPS counter update

  stats.begin();

  // Update FlyControls

  controls.update(0.01);

  // Rotate cube

  cube.rotation.x += 0.01;

  cube.rotation.y += 0.01;

  // Rotate cube

  sphere.rotation.x += 0.01;

  sphere.rotation.y += 0.01;

  //para ver o spotlight
  spotlightHelpervermelho.visible = showSpotlights;
  spotlightHelperazul.visible = showSpotlights;
  spotlightHelperverde.visible = showSpotlights;

  //adiciona movimento aos spotlight
  angle += 1/20;
  spotlightvermelho.position.x += radius * Math.cos(angle);
  spotlightvermelho.position.y += radius * Math.sin(angle);
  spotlightazul.position.x += radius * Math.cos(angle);
  spotlightazul.position.y += radius * Math.sin(angle);
  spotlightverde.position.x += radius * Math.cos(angle);
  spotlightverde.position.y += radius * Math.sin(angle);

  //spotlightvermelho.rotation.x += radius * Math.cos(angle);
  //spotlightvermelho.rotation.y += radius * Math.cos(angle);
  renderer.render(scene, currentCamera);


  // End FPS counter update

  stats.end();

}


animate();