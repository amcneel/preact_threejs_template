
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
import GeneralLights from './GeneralLights';

export default canvas => {
    const clock= new THREE.Clock();
    const origin = new THREE.Vector3(0,0,0);

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    };

    const mousePosition = {
        x: 0,
        y: 0
    };

    const scene = buildScene(); 
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions); 
    const sceneSubjects = createSceneSubjects(scene);
    /* initializers */
    function buildScene() {
        const scene = new THREE.Scene();
        return scene;
    }
    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
        const ratio = window.devicePixelRatio ? window.devicePixelRatio : 1;

        renderer.setPixelRatio(ratio);
        renderer.setSize(width, height);

        return renderer;
    }
    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 4;
        const farPlane = 100;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.z = 40;
        return camera;
    }
    function createSceneSubjects(scene) {
        const sceneSubjects = [ 
            new GeneralLights(scene),
        ];
        return sceneSubjects;
    }
    function onWindowResize() {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    /* customs functions */
    function updateCameraPositionRelativeToMouse(){
        camera.position.x += ( (mousePosition.x * .01) - camera.position.x ) * .01;
        camera.position.y += ( -(mousePosition.y * .01) - camera.position.y ) *.01
    }
    function onMouseMove(x,y){
        mousePosition.x = x;
        mousePosition.y = y;
    }
    
    /* Everything else */
    const loader = new THREE.OBJLoader();
    loader.load(
        'localhost:7070/home/felix.obj',
        function(obj){
            scene.add(obj);
        },
        function(xhr){
            console.log((xhr.loaded/(xhr.total*100)) + '% loaded');
        },
        function(error){
            console.log("you fucked up");
        }
    );


    var material = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        roughness: 0.7,
        metalness: 0.4,
        transparent: true,
        opacity: 0.5,
        wireframe: true,
        // map: new THREE.TextureLoader().load('style/images/klemen.png')
    });

    var geometry1 = new THREE.SphereGeometry(10, 10, 10);
    var mesh1 = new THREE.Mesh(geometry1, material);
    mesh1.position.set(0, 0, 20);
    scene.add(mesh1);



    /* Update and return */
    function update() {
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++){
            sceneSubjects[i].update();
        }

        updateCameraPositionRelativeToMouse();

        renderer.render(scene, camera);
    }
    return {
        update,
        onWindowResize,
        onMouseMove,
    }

}