import Movements from "./movement.js";
//contract address : 0xfbe1af2c0115ec14e1465d3429ccf30609f3a5b4
import polygon from "./Web3.js";
import abi from "./abi/abi.json" assert { type: "json" };
const scene = new THREE.Scene();
const params = {
    color: '#ffffff'
  };
//scene.backgroundColor = new THREE.Color(params.color);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// cube.position.set(5,5,35);
// scene.add( cube );


const geometry_area = new THREE.BoxGeometry( 1000, 0.2, 200 );
const material_area = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const area = new THREE.Mesh( geometry_area, material_area );
area.position.set(10 , 10, 10);
scene.add( area );


camera.position.z = 5;
camera.position.set(100 , 100 ,100);

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
animate();
renderer.render(scene ,camera);


function animate() {
    // cube.rotation.y+=0.05;
    // cube.rotation.x+=0.05;

    if(Movements.isPressed(38)){

camera.position.y -= 0.5;

    }

    if(Movements.isPressed(40)){

        camera.position.y += 0.5;
        
            }
        
    if(Movements.isPressed(39)){

        camera.position.x += 0.5;
                
            }
    if(Movements.isPressed(37)){

        camera.position.x -= 0.5;
                        
            }

    camera.lookAt(area.position);
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}



const button = document.querySelector("#mint");
button.addEventListener("click", mintNFT);


async function mintNFT() {
    let nft_name = document.querySelector("#nft_name").value;
    let nft_width = document.querySelector("#nft_width").value;
    let nft_height = document.querySelector("#nft_height").value;
    let nft_depth = document.querySelector("#nft_depth").value;
    let nft_x = document.querySelector("#nft_x").value;
    let nft_y = document.querySelector("#nft_y").value;
    let nft_z = document.querySelector("#nft_z").value;
  
    if (typeof window.ethereum == "undefined") {
      rej("You should install Metamask");
    }
  
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(
      abi,
      "0xfbe1af2c0115ec14e1465d3429ccf30609f3a5b4"
    );
    
  
    web3.eth.requestAccounts().then((accounts) => {
      contract.methods
        .mint(nft_name, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z)
        .send({
          from: accounts[0],
          value: "10",
        })
        .then((data) => {
          console.log("NFT is minted");
        });
    });
  }
  
  polygon.then((result) => {
    result.nft.forEach((object, index) => {
      if (index <= result.supply) {
        const geometry_cube = new THREE.BoxGeometry(object.w, object.h, object.d);
        const material_cube = new THREE.MeshPhongMaterial({ color: 0x1be3ef });
        const nft = new THREE.Mesh(geometry_cube, material_cube);
  
        nft.position.set(object.x, object.y, object.z);
        scene.add(nft);
      }
    });
  });