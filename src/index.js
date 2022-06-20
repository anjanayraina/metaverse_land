import Movements from "./movement.js";

const scene = new THREE.Scene();
const params = {
    color: '#ffffff'
  };
//scene.backgroundColor = new THREE.Color(params.color);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(5,5,35);
scene.add( cube );


const geometry_area = new THREE.BoxGeometry( 100, 0.2, 50 );
const material_area = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const area = new THREE.Mesh( geometry_area, material_area );
scene.add( area );


camera.position.z = 5;
camera.position.set(5 , 5 ,40);

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
animate();
renderer.render(scene ,camera);


function animate() {
    // cube.rotation.y+=0.05;
    // cube.rotation.x+=0.05;

    if(Movements.isPressed(38)){

camera.position.y += 0.05;

    }

    if(Movements.isPressed(40)){

        camera.position.y -= 0.05;
        
            }
        
    if(Movements.isPressed(39)){

        camera.position.x += 0.05;
                
            }
    if(Movements.isPressed(37)){

        camera.position.x -= 0.05;
                        
            }

    camera.lookAt(area.position);
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

