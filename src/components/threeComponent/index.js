import React, { Component } from 'preact';
import * as THREE from 'three';
const WindowResize = require('three-window-resize');

/**
 * Camera stuff
 */
const CAMERA_FOV = 75
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 1000;
const CAMERA_Z = 10;
let iniQ         // initial quaternion
let endQ         // target quaternion
let curQ         // temp quaternion during slerp
let vec3         // generic vector object
let tweenValue   // tweenable value 

/**
 * colors
 */
const startingMeshColor = '#433F81';
const hoverMeshColor = '#30e1f4';
const randomMeshColor = 'red';


class ThreeScene extends Component{
  constructor(props) {
    super(props); 
  }
  componentDidMount(){

    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      width / height,
      CAMERA_NEAR,
      CAMERA_FAR
    )

    this.camera.position.z = CAMERA_Z;

    
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    let material = new THREE.MeshBasicMaterial({ color: startingMeshColor })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
    
    WindowResize(this.renderer, this.camera)

    this.start()
  }
  componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
  
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
    this.cube.rotation.z += 0.01
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }
  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  toggleColor = (hover) => {
    let random = Math.random();
    if (random < 0.02) {
      this.cube.material = new THREE.MeshBasicMaterial({ color: randomMeshColor, wireframe: true })
    }
    else if (hover) {
      this.cube.material = new THREE.MeshBasicMaterial({ color: hoverMeshColor, wireframe: true });
    } else {
      this.cube.material = new THREE.MeshBasicMaterial({ color: startingMeshColor })
    }
  }

  // set a new target for the camera
moveCameraALittle = (euler, zoom) => {
    // reset everything
    endQ = new THREE.Quaternion()
    iniQ = new THREE.Quaternion().copy(camera.quaternion)
    curQ = new THREE.Quaternion()
    vec3 = new THREE.Vector3()
    tweenValue = 0

    endQ.setFromEuler(euler)
    TweenLite.to(this, 5, { tweenValue:1, cameraZoom:zoom, onUpdate:onSlerpUpdate })
}

  render() {
      return(
        <div
          style={{ width: this.props.width, height: this.props.height }}
          ref={(mount) => { this.mount = mount }}
        />
      )
    }
  }
export default ThreeScene