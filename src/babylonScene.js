import {
    Engine
} from "@babylonjs/core/Engines/engine";
import {
    Scene
} from "@babylonjs/core/scene";
import {
    Vector3
} from "@babylonjs/core/Maths/math";
import {
    FreeCamera
} from "@babylonjs/core/Cameras/freeCamera";
import {
    HemisphericLight
} from "@babylonjs/core/Lights/hemisphericLight";
import {
    Mesh
} from "@babylonjs/core/Meshes/mesh";

import {
    GridMaterial
} from "@babylonjs/materials/grid";

import {
    StandardMaterial
} from "@babylonjs/core/Materials";

import * as BABYLON from '@babylonjs/core/Legacy/legacy';

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";

import {
    MeshBuilder
} from "@babylonjs/core/Meshes/meshBuilder"

// Get the canvas element from the DOM.
const canvas = document.getElementById("renderCanvas");

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Create our first scene.
var scene = new Scene(engine);

// This creates and positions a free camera (non-mesh)
var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

// This targets the camera to scene origin
camera.setTarget(Vector3.Zero());

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;

var spriteManagerCamel = new BABYLON.SpriteManager("camelManager", "Assets/camel.png", 88, {width: 71, height: 47}, scene);

var player = new BABYLON.Sprite("player", spriteManagerCamel);
player.playAnimation(23, 34, true, 100);
//player.cellIndex = 23
//player.position.y = -0.3;
player.size = 5;
player.isPickable = true;

// Render every frame
engine.runRenderLoop(() => {
    scene.render();
    spriteManagerCamel._spriteTexture.updateSamplingMode(BABYLON.Texture.NEAREST_NEAREST_MIPLINEAR);
});
