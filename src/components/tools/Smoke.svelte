<script>
    import * as THREE from 'three';
    import { onMount } from 'svelte'
    
    let clock;
    let smokeParticles;
    let delta;
    let mesh;
    let cubeSineDriver;
    let renderer;
    let camera;
    let scene;
    let geometry;
    let material;
    let light;
    let smokeTexture;
    let smokeMaterial;
    let smokeGeo;
    let sp;
   
    init();
    animate();


    function init() {
        clock = new THREE.Clock();

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        camera.position.z = 1000;
        scene.add(camera);

        geometry = new THREE.BoxGeometry(200, 200, 200);
        material = new THREE.MeshLambertMaterial({
            color: 0xaa6666,
            wireframe: false
        });
        mesh = new THREE.Mesh(geometry, material);
        cubeSineDriver = 0;

        light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.set(-1, 0, 1);
        scene.add(light);

        smokeTexture = new THREE.TextureLoader().load(
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png"
        );
        smokeMaterial = new THREE.MeshLambertMaterial({
            color: 0x00dddd,
            map: smokeTexture,
            transparent: true
        });
        smokeGeo = new THREE.PlaneGeometry(300, 300);
        smokeParticles = [];

        for (let p = 0; p < 150; p++) {
            var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
            particle.position.set(
            Math.random() * 500 - 250,
            Math.random() * 500 - 250,
            Math.random() * 1000 - 100
            );
            particle.rotation.z = Math.random() * 360;
            scene.add(particle);
            smokeParticles.push(particle);
        }

        onMount(() => {
            document.getElementById('canvas-container').appendChild(renderer.domElement)
        })
    }

    function animate() {
        delta = clock.getDelta();
        requestAnimationFrame(animate);
        evolveSmoke();
        render();
    }

    function evolveSmoke() {
        sp = smokeParticles.length;
        while (sp--) {
            smokeParticles[sp].rotation.z += delta * 0.2;
        }
    }

    function render() {
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        cubeSineDriver += 0.01;
        mesh.position.z = 100 + Math.sin(cubeSineDriver) * 500;
        renderer.render(scene, camera);
    }

</script>


<style>
    #canvas-container {
        position: absolute;
        width: 100vw;
        height: 100vh;
    }
</style>

<div id="canvas-container"></div>