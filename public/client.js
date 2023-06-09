import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import { MTLLoader } from './jsm/loaders/MTLLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';


let camera, scene, renderer,controls, effectComposer,glitchPass;


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

    controls.target.set(-50,0,0)

    


    ////////////////////////////////////////////HELPER//////////////////////////////////////
    //X red. 
    //Z green.  
    //Y blue.
    const axesHelper = new THREE.AxesHelper( 5 );
    axesHelper.position.set(0,5,0)
    scene.add( axesHelper );
    /////////////////////////////////////////////////////////////////////////////////////////////

    //light
    const light = new THREE.AmbientLight(0xFFffff,3)
    scene.add(light)

    //contrapicado
    const lavaLight1 = new THREE.PointLight(0xff9999,50,2000)
    lavaLight1.position.set(-50,-150,300)
    lavaLight1.castShadow=true
    scene.add(lavaLight1)

    const lavaLight2 = new THREE.PointLight(0xff9999,50,2000)
    lavaLight2.position.set(350,-150,-200)
    lavaLight2.castShadow=true
    scene.add(lavaLight2)

    
    ///////////////// Add Sky
    const skyBox = new THREE.SphereGeometry(1500,25,25)
    const skyTex = new THREE.TextureLoader().load('assets/slava.jpg')
    const skyMat = new THREE.MeshBasicMaterial({
        map: skyTex, side:THREE.BackSide, color:0xff5555
    })
    const sky = new THREE.Mesh(skyBox,skyMat)
    scene.add(sky)


    
    ///////////////////// base
    const mtlLoaderBase = new MTLLoader()
    const objLoaderBase = new OBJLoader()
    mtlLoaderBase.load('assets/models/nether/Nether.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
              }
            console.log(mtl)
            objLoaderBase.setMaterials(mtl)
            objLoaderBase.load('assets/models/nether/Nether.obj',////////////////////////////////////obj
                (base) => {
                    base.traverse((child) => {
                        child.scale.multiplyScalar(10)
                        child.castShadow = child.receiveShadow = true;
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
    const mtlLoaderWither = new MTLLoader()
    const objLoaderWither = new OBJLoader()
    mtlLoaderWither.load('assets/models/wither/wither.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
              }
            console.log(mtl)
            objLoaderWither.setMaterials(mtl)
            objLoaderWither.load('assets/models/wither/wither.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(4)
                        child.castShadow = child.receiveShadow = true
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
                    obj.position.set(885, 140, -200)
                    obj.rotation.y=Math.PI/6
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

    const mtlLoaderWitherSkeleton1 = new MTLLoader()
    const objLoaderWitherSkeleton1 = new OBJLoader()
    mtlLoaderWitherSkeleton1.load('assets/models/wither skeleton/wither+skeleton.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
              }
            console.log(mtl)
            objLoaderWitherSkeleton1.setMaterials(mtl)
            objLoaderWitherSkeleton1.load('assets/models/wither skeleton/wither+skeleton.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(3)
                    });
                    obj.position.set(250, 65, -15)
                    obj.rotation.y=Math.PI/4
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

    const mtlLoaderWitherSkeleton2 = new MTLLoader()
    const objLoaderWitherSkeleton2 = new OBJLoader()
    mtlLoaderWitherSkeleton2.load('assets/models/wither skeleton/wither+skeleton.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
              }
            console.log(mtl)
            objLoaderWitherSkeleton2.setMaterials(mtl)
            objLoaderWitherSkeleton2.load('assets/models/wither skeleton/wither+skeleton.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(3)
                    });
                    obj.position.set(750, -165, 150)
                    obj.rotation.y=Math.PI/2
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

    const mtlLoaderWitherSkeleton3 = new MTLLoader()
    const objLoaderWitherSkeleton3 = new OBJLoader()
    mtlLoaderWitherSkeleton3.load('assets/models/wither skeleton/wither+skeleton.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
              }
            console.log(mtl)
            objLoaderWitherSkeleton3.setMaterials(mtl)
            objLoaderWitherSkeleton3.load('assets/models/wither skeleton/wither+skeleton.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(3)
                    });
                    obj.position.set(-450, 385, -300)
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
                        child.castShadow = child.receiveShadow = true;
                    });
                    obj.position.set(-80, -5, 0)
                    obj.rotation.x=THREE.MathUtils.degToRad(90);
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
                        child.castShadow = child.receiveShadow = true;
                    });
                    obj.position.set(-100, -10, 80)
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

    //espada
    const mtlLoaderEspada = new MTLLoader()
    const objLoaderEspada = new OBJLoader()
    mtlLoaderEspada.load('assets/models/diamond sword/sword.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
              }
            console.log(mtl)
            objLoaderEspada.setMaterials(mtl)
            objLoaderEspada.load('assets/models/diamond sword/sword.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(0.4)
                        child.castShadow = child.receiveShadow = true;
                    });
                    obj.position.set(-100, 0, 20)
                    obj.rotation.x=THREE.MathUtils.degToRad(125);
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

    //angel(?)
    const mtlLoaderAngel = new MTLLoader()
    const objLoaderAngel = new OBJLoader()
    mtlLoaderAngel.load('assets/models/angel/untitled.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
              }
            console.log(mtl)
            objLoaderAngel.setMaterials(mtl)
            objLoaderAngel.load('assets/models/angel/untitled.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(3)
                    });
                    obj.position.set(-80, 10, 20)
                    obj.rotation.y=THREE.MathUtils.degToRad(180);
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
    
    //Ghast
    const mtlLoaderGhast = new MTLLoader()
    const objLoaderGhast = new OBJLoader()
    mtlLoaderGhast.load('assets/models/Ghast/Ghast.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
              }
            console.log(mtl)
            objLoaderGhast.setMaterials(mtl)
            objLoaderGhast.load('assets/models/Ghast/Ghast.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(5)
                    });
                    obj.position.set(600, 650, -300)
                    obj.rotation.y=THREE.MathUtils.degToRad(45);
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


    //pigman
    const mtlLoaderPigman = new MTLLoader()
    const objLoaderPigman = new OBJLoader()
    mtlLoaderPigman.load('assets/models/Pigman/zombie_pigman.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
              }
            console.log(mtl)
            objLoaderPigman.setMaterials(mtl)
            objLoaderPigman.load('assets/models/Pigman/zombie_pigman.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(6)
                        child.castShadow = child.receiveShadow = true;
                    });
                    obj.position.set(-100, -82, -75)
                    obj.rotation.y=THREE.MathUtils.degToRad(118)
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

    //magmacube
    const mtlLoaderMagmacube = new MTLLoader()
    const objLoaderMagmacube = new OBJLoader()
    mtlLoaderMagmacube.load('assets/models/Magmacube/magmacube.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
                material.transparent=false
              }
            console.log(mtl)
            objLoaderMagmacube.setMaterials(mtl)
            objLoaderMagmacube.load('assets/models/Magmacube/magmacube.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(7)
                        child.castShadow = child.receiveShadow = true;
                    });
                    obj.position.set(650, -150, 350)
                    obj.rotation.y=THREE.MathUtils.radToDeg(200)
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

    //blaze
    const mtlLoaderBlaze = new MTLLoader()
    const objLoaderBlaze = new OBJLoader()
    mtlLoaderBlaze.load('assets/models/blaze/blaze.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
                material.transparent=false
              }
            console.log(mtl)
            objLoaderBlaze.setMaterials(mtl)
            objLoaderBlaze.load('assets/models/blaze/blaze.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(4)
                        child.castShadow = child.receiveShadow = true;
                    });
                    obj.position.set(-500, 300, 50)
                    obj.rotation.y=THREE.MathUtils.degToRad(200)
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

    const mtlLoaderBlaze1 = new MTLLoader()
    const objLoaderBlaze1 = new OBJLoader()
    mtlLoaderBlaze1.load('assets/models/blaze/blaze.mtl',//////////////////////////////////mtl
        (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide
                material.transparent=false
              }
            console.log(mtl)
            objLoaderBlaze1.setMaterials(mtl)
            objLoaderBlaze1.load('assets/models/blaze/blaze.obj',////////////////////////////////////obj
                (obj) => {
                    obj.traverse((child) => {
                        child.scale.multiplyScalar(4)
                        child.castShadow = child.receiveShadow = true;
                    });
                    obj.position.set(-450, 300, 100)
                    obj.rotation.y=THREE.MathUtils.degToRad(200)
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

///////////////////////////////////////////////////////////////////////////
    effectComposer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    effectComposer.addPass(renderPass);

    const glitchPass = new GlitchPass();
    effectComposer.addPass(glitchPass);

    window.addEventListener( 'resize', onWindowResize );
    
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );


}

function animate() {
    controls.update()
    requestAnimationFrame(animate);
    effectComposer.render()
    
}



