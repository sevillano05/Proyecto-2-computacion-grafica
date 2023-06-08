import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import { MTLLoader } from './jsm/loaders/MTLLoader.js';

let camera, scene, renderer,controls;


init();
animate();



function init(){
    renderer=new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled=true
    renderer.capabilities.logarithmicDepthBuffer=true
    renderer.shadowMap.type=THREE.PCFSoftShadowMap
    renderer.outputEncoding= THREE.sRGBEncoding
    renderer.physicallyCorrectLghts=true
    renderer.toneMappingExposure=Math.pow(0.9,4.0)
    renderer.toneMapping= THREE.ReinhardToneMapping
    document.body.appendChild(renderer.domElement)

    scene=new THREE.Scene();

    camera=new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,0.05,10000)
    camera.position.set(0,400,700)

    controls=new OrbitControls(camera,renderer.domElement)


    ////////////////////////////////////////////HELPER//////////////////////////////////////
    //X red. 
    //Z green.  
    //Y blue.
    const axesHelper = new THREE.AxesHelper( 5 );
    axesHelper.position.set(0,5,0)
    scene.add( axesHelper );
    /////////////////////////////////////////////////////////////////////////////////////////////

    //light
    const sunlight = new THREE.AmbientLight(0xFFffff,4)
    scene.add(sunlight)



    // Add Sky
    const skyBox = new THREE.SphereGeometry(1500,25,25)
    const skyTex = new THREE.TextureLoader().load('assets/slava.jpg')
    const skyMat = new THREE.MeshBasicMaterial({
        map: skyTex, side:THREE.BackSide, color:0xff5555
    })
    const sky = new THREE.Mesh(skyBox,skyMat)
    scene.add(sky)


    //piso
    /*const floorGeo = new THREE.BoxGeometry(1000, 1000, 10); 
    const floorTex = new THREE.TextureLoader().load('assets/lava.png')
    floorTex.wrapS=floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(15, 15);
    const floorMat = new THREE.MeshStandardMaterial( {color: 0xFFFFFF,map:floorTex,} );
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotateX (THREE.MathUtils.degToRad(90))
    floor.position.set(0,-4,0)
    floor.receiveShadow=true
    scene.add(floor)*/


    // base
    const mtlLoaderBase = new MTLLoader()
    const objLoaderBase = new OBJLoader()

    mtlLoaderBase.load('assets/models/nether/Nether.mtl',//////////////////////////////////mtl
        (baseMTL) => {
            baseMTL.preload()
            for (const material of Object.values(baseMTL.materials)) {
                material.side = THREE.DoubleSide
                //material.map=baseMTL
              }
            console.log(baseMTL)
            objLoaderBase.setMaterials(baseMTL)
            objLoaderBase.load('assets/models/nether/Nether.obj',////////////////////////////////////obj
                (base) => {
                    base.traverse((child) => {
                        child.scale.multiplyScalar(10)
                    });
                    base.position.set(0, -380, 0)
                    scene.add(base)
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log('An error happened')
                }
            )
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log('An error happened')
        }
    )


    //mobs
    const mtlLoaderBoss = new MTLLoader()
    const objLoaderBoss = new OBJLoader()
    mtlLoaderBoss.load('assets/models/wither skeleton/wither+skeleton.mtl',//////////////////////////////////mtl
        (bossMTL) => {
            bossMTL.preload()
            for (const material of Object.values(bossMTL.materials)) {
                material.side = THREE.DoubleSide
                //material.map=bossMTL
              }
            console.log(bossMTL)
            objLoaderBoss.setMaterials(bossMTL)
            objLoaderBoss.load('assets/models/wither skeleton/wither+skeleton.obj',////////////////////////////////////obj
                (boss) => {
                    boss.traverse((child) => {
                        child.scale.multiplyScalar(3)
                    });
                    boss.position.set(0, 0, 0)
                    scene.add(boss)
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log('An error happened')
                }
            )
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log('An error happened')
        }
    )


    /*const baseTex = new THREE.TextureLoader().load('assets/stone.jpg');
    baseTex.wrapS = baseTex.wrapT = THREE.RepeatWrapping;
    baseTex.repeat.set(2, 2);
    const baseMat = new THREE.MeshPhongMaterial({map: baseTex});

    const objLoaderWicked = new OBJLoader()
    objLoaderWicked.load( 'assets/models/minecraft.obj', ( Wicked ) => {
        Wicked.traverse(( child ) => {
            //child.material = baseMat // Asignar el material al mesh del objeto
            child.scale.multiplyScalar(1)
            child.position.set(10, 0, 0) 
        } );
    scene.add( Wicked );
    } );*/
    

    
    

///////////////////////////////////////////////////////////////////////////
    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );


}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
    controls.update()
}



