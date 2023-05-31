// Importando os módulos necessários
import * as THREE from 'three';

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

import dat from 'dat.gui';


// Configurando a cena, câmera e renderizador
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,

  window.innerWidth / window.innerHeight,

  0.1, 1000);



const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


// Adicionando um cubo à cena

const geometry = new THREE.SphereGeometry();


const materialStandart = new THREE.MeshStandardMaterial({

  color: 'blue',

  side: THREE.DoubleSide

});

let map = new THREE.TextureLoader().load("Hades_hades.jpg");

let normal = new THREE.TextureLoader().load("NormalMapHades.jpg");
let bump = new THREE.TextureLoader().load("BumpMap.jpg");
let displacement = new THREE.TextureLoader().load("DisplacementMapHades.jpg");

let materialNormal = new THREE.MeshPhongMaterial(
  {
    normalMap: normal,
    map: map
  }
);

let materialBump = new THREE.MeshPhongMaterial(
  {
    bumpMap: bump,
    bumpScale: 0.08,
    map: map
  }
);

let materialDisplacement = new THREE.MeshPhongMaterial(
  {
    displacementMap: displacement,
    displacementScale: 0.5,
    map: map
  }
);

let materialAll = new THREE.MeshPhongMaterial(
  {
    normalMap:normal,
    bumpMap: bump,
    bumpScale: 0.02,
    displacementMap: displacement,
    displacementScale: 0.3,
    map: map
  }
);

let cube = new THREE.Mesh(geometry);
scene.add(cube);

function updateMaterial(type) {

  if (type === 'materialStandart') {
    cube.material = materialStandart;
  }
  else if (type === 'materialNormal') {
    cube.material = materialNormal; 
  }
  else if (type === 'materialBump') {
    cube.material = materialBump;
  }
  else if (type === 'materialDisplacement'){
    cube.material = materialDisplacement;
  }
  else if (type === 'materialAll'){
    cube.material = materialAll;
  }
}
//Cria a gui
const gui = new dat.GUI();

const selectedMaterial = { type: 'materialNormal' };

gui.add(selectedMaterial, 'type', ['materialStandart', 'materialNormal', 'materialBump', 'materialDisplacement','materialAll']).onChange(updateMaterial);

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
//Cria a gui
const gui = new dat.GUI();

const materialOptions = {
  'Standard Material': 'materialStandart',
  'Normal Material': 'materialNormal',
  'Bump Material': 'materialBump',
  'Displacement Material': 'materialDisplacement',
  'All Material': 'materialAll',
};

let selectedMaterial = materialNormal;

function updateMaterial() {
  cube.material = selectedMaterial;
}

gui.add(materialOptions, 'Standard Material').onChange(function() {
  selectedMaterial = materialStandart;
  updateMaterial();
});

gui.add(materialOptions, 'Normal Material').onChange(function() {
  selectedMaterial = materialNormal;
  updateMaterial();
});

gui.add(materialOptions, 'Bump Material').onChange(function() {
  selectedMaterial = materialBump;
  updateMaterial();
});

gui.add(materialOptions, 'Displacement Material').onChange(function() {
  selectedMaterial = materialDisplacement;
  updateMaterial();
});

gui.add(materialOptions, 'All Material').onChange(function() {
  selectedMaterial = materialAll;
  updateMaterial();
});*/
/*
//----------------------------------------------------------------------------------------------------------------------------------------------------------
// Criando a GUI
const gui = new dat.GUI();

const materialOptions = {
  'Standard Material': 'Standard',
  'Normal Material': 'Normal',
  'Bump Material': 'Bump',
  'Displacement Material': 'Displacement',
  'All Material': 'All',
};

let selectedMaterial = 'Normal';

function updateMaterial() {
  let material;

  switch (selectedMaterial) {
    case 'Standard':
      material = materialStandart;
      break;
    case 'Normal':
      material = materialNormal;
      break;
    case 'Bump':
      material = materialBump;
      break;
    case 'Displacement':
      material = materialDisplacement;
      break;
    case 'All':
      material = materialAll;
      break;
    default:
      material = materialNormal;
      break;
  }

  cube.material = material;
}

const materialController = gui.add(
  { selectedMaterial: selectedMaterial },
  'selectedMaterial',
  Object.keys(materialOptions)
);

materialController.onChange(function (value) {
  selectedMaterial = value;
  updateMaterial();
});
updateMaterial();
*/
//-----------------------------------------------------------------------------------------------------------------------------------------

// Adicionando uma luz pontual (point light) e uma luz ambiente (ambient light)
const pointL = new THREE.PointLight('white', 0.5)
const pointLightHelper = new THREE.PointLightHelper(pointL, 1)
pointL.position.set(0, 0, 10)
scene.add(pointL, pointLightHelper)

gui.add(pointL, 'intensity', 0, 50, 0.1 ); // Intensidade da luz


const ambL = new THREE.AmbientLight('white', 0.02) // luz ambiente
scene.add(ambL)


// Adicionando um auxiliar de eixos para visualização
const axesHelper = new THREE.AxesHelper(3); // Parameter determines the size of the helper

cube.add(axesHelper);

camera.position.z = 3;

// Adicionando TrackballControls para permitir interação com a cena usando o mouse
const controls = new TrackballControls(camera, renderer.domElement);

// Criando um contador de FPS
let t = 0;
// Raio da circunferencia que a luz gira
let raio = 20;

const SelecionaRaio = {
  raio: raio
};

function updateRaio() {
  raio = SelecionaRaio.raio;
}

gui.add(SelecionaRaio, 'raio', 1, 20, 0.1).onChange(updateRaio);


// Função de animação

function animate() {

  requestAnimationFrame(animate);

  //cube.material = selectedMaterial;
  // Atualização do contador de FPS
  t += 0.02

 // Atualização dos controles
  controls.update(0.01);

// Atualização da posição da luz pontual
  pointL.position.x = raio*Math.sin(t);
  pointL.position.z = raio*Math.cos(t);

// Renderização da cena com a câmera e o renderizador
  renderer.render(scene, camera);
  

  // End FPS counter update

}

animate();
