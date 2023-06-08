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
    
    camera.position.set(-50,0,-300)

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
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
                //material.map=baseMTL
              }
            console.log(mtl)
            objLoaderBase.setMaterials(mtl)
            objLoaderBase.load('assets/models/nether/Nether.obj',////////////////////////////////////obj
                (base) => {
                    base.traverse((child) => {
                        child.scale.multiplyScalar(10)
                    });
                    base.position.set(100, -380, 0)
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


    /////////////////////////MOBS
    //wither
    const mtlLoaderBoss = new MTLLoader()
    const objLoaderBoss = new OBJLoader()
    mtlLoaderBoss.load('assets/models/wither/wither.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
              }
            console.log(mtl)
            objLoaderBoss.setMaterials(mtl)
            objLoaderBoss.load('assets/models/wither/wither.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(4)
                    });
                    obj.position.set(-50, -100, 700)
                    obj.rotation.y=Math.PI/1
                    scene.add(obj)
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

    //wither skeleton
    const mtlLoaderWitherSkeleton = new MTLLoader()
    const objLoaderWitherSkeleton = new OBJLoader()
    mtlLoaderWitherSkeleton.load('assets/models/wither skeleton/wither+skeleton.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
              }
            console.log(mtl)
            objLoaderWitherSkeleton.setMaterials(mtl)
            objLoaderWitherSkeleton.load('assets/models/wither skeleton/wither+skeleton.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(3)
                    });
                    obj.position.set(0, 0, 0)
                    scene.add(obj)
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

    //steve
    const mtlLoaderSteve = new MTLLoader()
    const objLoaderSteve = new OBJLoader()
    mtlLoaderSteve.load('assets/models/minecraft simple rig/Minecraft_Simple_Rig.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
              }
            console.log(mtl)
            objLoaderSteve.setMaterials(mtl)
            objLoaderSteve.load('assets/models/minecraft simple rig/Minecraft_Simple_Rig.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(4)
                    });
                    obj.position.set(-50, -15, -10)
                    scene.add(obj)
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

    //steve pro max
    const mtlLoaderSteveBlank = new MTLLoader()
    const objLoaderSteveBlank = new OBJLoader()
    mtlLoaderSteveBlank.load('assets/models/3d model blank/3d-model.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
              }
            console.log(mtl)
            objLoaderSteveBlank.setMaterials(mtl)
            objLoaderSteveBlank.load('assets/models/3d model blank/3d-model.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(0.13)
                    });
                    obj.position.set(-90, -10, 50)
                    scene.add(obj)
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



