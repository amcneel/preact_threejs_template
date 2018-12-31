import React, { Component } from 'preact'
import * as THREE from 'three'
import * as OBJLoader from 'three-obj-loader'
OBJLoader(THREE)
const WindowResize = require('three-window-resize')

// import { TimelineMax } from "gsap/TweenMax";
// import { createTextAnimation, createTweenScrubber } from '../mainAnimatedText';
// import { init } from '../animatedImages';

const TWEEN = require('@tweenjs/tween.js')

/**
 * Camera stuff
 */
const CAMERA_FOV = 75
const CAMERA_NEAR = 0.1
const CAMERA_FAR = 7000
let camera_x = 0
let camera_y = 0
let camera_z = 10

/**
 * colors
 */
const startingMeshColor = '#433F81'
const PLANE_MATERIAL = new THREE.MeshStandardMaterial({
  color: 0xB4B8C5,
  metalness: 0.4,
  transparent: true,
  opacity: 0.5,
  wireframe: true
})



class ThreeScene extends Component{
  state = {}

  componentDidMount(){
    this.THREE = THREE

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
    this.camera.position.z = camera_z
    //ADD LIGHTS
    this.light = new THREE.AmbientLight(0xffffff, 1)
    
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    /**
     * Add Initial Elements
     */
    //Materials
    let material = new THREE.MeshBasicMaterial({ color: startingMeshColor, wireframe: true })
      
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    this.cube = new THREE.Mesh(geometry, material)
    //ADD SPHERE
    const sphereGeometry = new THREE.SphereGeometry(2, 20, 20)
    this.sphere = new THREE.Mesh(sphereGeometry, material)
    this.sphere.position.set(50, 50, 40)
    // ADD LOGO OBJ
    const loader = new this.THREE.OBJLoader()
    loader.load(
      '../../assets/logo.obj',
      (obj) => {
        obj.scale.set(50, 50, 50)
        obj.rotation.set(90, 0, 0)
        this.scene.add(obj)
        this.logoObj = obj
      },
      (xhr) => {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
      },
      (err) => {
        console.log("error: ", err)
      }
    )

    //ADD GRID
    const planeGeo = new THREE.PlaneBufferGeometry(10000, 10000, 30, 30)
    this.plane = new THREE.Mesh(planeGeo, PLANE_MATERIAL)
    this.plane.rotation.x = -105*Math.PI/180
    this.plane.rotation.z = -90*Math.PI/180
    this.plane.rotation.y = 0*Math.PI/180
    this.plane.position.y = -100
    
    //ADD OBJECTS TO SCENE
    this.scene.add(this.cube)
    this.scene.add(this.sphere)
    this.scene.add(this.light)
    this.scene.add(this.plane)
    
    // this.renderHomeText()
    // this.renderAnimatedImages();

    //RESIZE AND START
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

  rotateCube = () => {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
    this.cube.rotation.z += 0.01
  }
  rotateSphere = () => {
    this.sphere.rotation.x += 0.01
    this.sphere.rotation.y += 0.01
    this.sphere.rotation.z += 0.01
  }

  rotateLogo = () => {
    // this.logoObj.rotation.x += 0.01
    // this.logoObj.rotation.y += 0.01
    this.logoObj.rotation.z += 0.02
  }

  animate = () => {
    this.rotateCube()
    this.rotateSphere()
    if (this.logoObj != null) {
      this.rotateLogo()
    }
    TWEEN.update()
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }
  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  /**
   * Helpersss
   */
  // FRONT PAGE TEXT SECTION
  renderHomeText = () => {
    
  }
  
  // experiment
  renderAnimatedImages = () => {
    init(this.mount)
  }

  // working
  toggleColor = (hover, color1, color2) => {
    if (hover) {
      this.plane.material = new THREE.MeshBasicMaterial({ color: color1, wireframe: true })
      this.cube.material = new THREE.MeshBasicMaterial({ color: color2, wireframe: true })
    } else {
      this.cube.material = new THREE.MeshBasicMaterial({ color: startingMeshColor })
      this.plane.material = PLANE_MATERIAL
    }
  }

  // set a new target for the camera
  moveCamera = (targetPos, easing) => {
    let from = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z
    }
    // save double clicks and such
    if (targetPos.x === from.x && targetPos.y === from.y && targetPos.z === from.z) {
      return
    }
    let t = new TWEEN.Tween(from)
    .to(targetPos, 3000)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate((res) => {
      this.camera.position.set(res.x, res.y, res.z)
    })
    .onComplete(() => {
      // this.camera.lookAt(new THREE.Vector3(0, 0, 0))
      console.log("complete ", this.camera.position)
    })
    .start()
  }

  render(props, {}) {
    return(
      <div
        style={{ width: props.width, height: props.height }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default ThreeScene