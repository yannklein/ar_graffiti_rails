import * as THREE from '../vendor/three.min.js';

import { initARJS, isMarkerVisible } from './initAR';
// import { uploadFile } from './initCloudinary';

const chatroomId = window.chatroomId;
const sizeOfQrInCanvas = 200;
const mouse = new THREE.Vector2();
const userLineColor = `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`;

let mousePos = null;
let textureCanvas, textureContext, texture;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  autoResize: true,
  alpha: true
});

const connectToCableDrawings  = () => {
  App[`chat_room_${chatroomId}`] = App.cable.subscriptions.create(
    { channel: 'ChatRoomsChannel', chat_room_id: chatroomId },
    {
      received: (data) => {
        // console.log(data);
        if(data) {
          drawLine(data.message_json);
        }
      }
    }
  );
}

const sendDrawingToCable = (line) => {
  fetch(
    `./chat_rooms/${chatroomId}/messages`, 
    {
      method: "POST",
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(line)
    }
  );
};

const graffitiUpdate = (scene, camera, raycaster) => {
  // Graffiti update
  raycaster.setFromCamera(mouse, camera);
  const meshIntersects = raycaster.intersectObject(scene.getObjectByName("graffiti"));
  if (meshIntersects.length > 0) {
    const x = (meshIntersects[0].uv.x * textureCanvas.width);
    const y = (1 - meshIntersects[0].uv.y) * textureCanvas.height;

    if (mousePos === null) {
      mousePos = { x, y };
    } else {
      let line = {
        startX: mousePos.x, 
        startY: mousePos.y, 
        endX: x,
        endY: y,
        color: userLineColor
      };

      drawLine(line);
      sendDrawingToCable(line);

      mousePos = { x, y };
    }
    texture.needsUpdate = true;
  }
};

const drawLine = (line) => {
  textureContext.strokeStyle = line.color;
  textureContext.lineWidth = 1;

  textureContext.beginPath();
  textureContext.moveTo(line.startX, line.startY);
  textureContext.lineTo(line.endX, line.endY);
  textureContext.stroke();

  texture.needsUpdate = true;
}

const graffitiCreate = (scene, camera, grafImage) => {
  // Customizable texture
  const canvasSize = 1024;
  textureCanvas = document.createElement('canvas');
  textureCanvas.width = canvasSize;
  textureCanvas.height = canvasSize;
  textureContext = textureCanvas.getContext('2d');
  textureContext.rect(0, 0, textureCanvas.width, textureCanvas.height);
  textureContext.fillStyle = 'rgba(255, 255, 255, 0)';
  textureContext.fill ();
  // const img = new Image();
  // img.onload = () => {
  //   textureContext.drawImage(img, 0, 0);
  // };
  // img.crossOrigin = "anonymous";
  // img.src = grafImage;

  // Create the QR cover
  createQrCover();

  // Draw the lines coming from the DB
  fetchCoord();

  // Initiate connection to the cable to get drwaings from other participants
  connectToCableDrawings();

  texture = new THREE.Texture(textureCanvas);
  texture.needsUpdate = true;

    // Create the graffiti area
  const graffitiArea = new THREE.Mesh(
    new THREE.PlaneGeometry(canvasSize, canvasSize),
    new THREE.MeshBasicMaterial({ map: texture })
  );
  graffitiArea.rotation.x = -Math.PI / 2;
  graffitiArea.name = "graffiti";
  graffitiArea.scale.multiplyScalar(1/sizeOfQrInCanvas);
  scene.add(graffitiArea);

};

const fetchCoord = () => {
  fetch('./live.json')
  .then(response => response.json())
  .then((data) => {
    data.forEach((line) => {
      drawLine(line);
    });
  });
};

const init = (holoQRPatt, grafImage) => {
  // init renderer
  const onRenderFcts = [];

  const container = document.getElementById( 'canvas' );
	document.body.appendChild( container );

  renderer.setClearColor(new THREE.Color('lightgrey'), 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0px';
  renderer.domElement.style.left = '0px';
  container.appendChild(renderer.domElement);

  // Scene settings
  const scene = new THREE.Scene();

  // Create a camera
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1500);
  scene.add(camera);

  // Creaete the light
  const light = new THREE.AmbientLight(0xffffff);
  light.intensity = 0.7;
  scene.add(light);

  // Create the AR JS scene
  const sceneAR = initARJS(scene, camera, onRenderFcts, renderer, holoQRPatt);

  // Create the graffiti base
  graffitiCreate(sceneAR, camera, grafImage);

  // Define the raycaster
  const raycaster = new THREE.Raycaster();

  // Push the scene rendering/updating in the rendering loop
  onRenderFcts.push(() => {
    if (mouse.down && isMarkerVisible()) {
      graffitiUpdate(scene, camera, raycaster);
    }
    renderer.render(scene, camera);
  });

  // Run the rendering loop
  renderingLoop(onRenderFcts);

  // Event listeners
  document.addEventListener('mousedown', onDocumentMouseDown);
  document.addEventListener('mouseup', onDocumentStrokeDone);
  document.addEventListener('mousemove', onDocumentMouseMove);

  document.addEventListener('touchstart', onDocumentTouchStart);
  document.addEventListener('touchend', onDocumentStrokeDone);
  document.addEventListener('touchmove', onDocumentTouchStart);

  document.addEventListener('keyup', adminCommand);
};

const renderingLoop = (onRenderFcts) => {
  let lastTimeMsec = null;
requestAnimationFrame(function animate(nowMsec){
  // keep looping
  requestAnimationFrame(animate);
  // measure time
  lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
  let deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
  lastTimeMsec = nowMsec;
  // call each update function
  onRenderFcts.forEach((onRenderFct) => {
    onRenderFct(deltaMsec / 1000, nowMsec / 1000);
  });
});
}

const onDocumentTouchStart = ( event ) => {
  mouse.x = ((event.touches[0].clientX - renderer.domElement.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -((event.touches[0].clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;
  mouse.down = true;

  if(event.touches.length === 3) {
    // TBD remove strokes
  }
}

const onDocumentStrokeDone = (event) => {
  mouse.down = false;
  mousePos = null;
};

const onDocumentMouseDown = (event) => {
  mouse.down = true;
  mouse.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.clientWidth ) * 2 - 1;
  mouse.y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;   
};

const onDocumentMouseMove = (event) => {
  if(mouse.down) {
    mouse.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;
  }
};

const adminCommand = (event) => {
  if(event.key === "d") {
    // TBD remove strokes
  }
}

const createQrCover = () => {
  textureContext.clearRect(0, 0, textureCanvas.width, textureCanvas.height);
  textureContext.fillStyle = 'rgba(255, 255, 255, 1)';
  const qrCover = sizeOfQrInCanvas * 1.2;
  textureContext.fillRect((textureCanvas.width - qrCover)/2, (textureCanvas.height - qrCover)/2, qrCover, qrCover);

  textureContext.textAlign = "center";
  textureContext.shadowColor="black";
  textureContext.shadowBlur=15;
  textureContext.font = '40px "Rock Salt"';

  textureContext.fillStyle = "rgb(220,220,220)";
  textureContext.fillText("THAT SPOT", textureCanvas.width/2 - 2, (textureCanvas.height/2 - 10)- 2);
  textureContext.fillStyle = "black";
  textureContext.fillText("THAT SPOT", textureCanvas.width/2, (textureCanvas.height/2 - 10));

  textureContext.fillStyle = "rgb(220,220,220)";
  textureContext.fillText("IS YOURS", textureCanvas.width/2 - 2 , (textureCanvas.height/2 + 40) - 2);
  textureContext.fillStyle = "black";
  textureContext.fillText("IS YOURS", textureCanvas.width/2, (textureCanvas.height/2 + 40));

  textureContext.font = '10px "Rock Salt"';
  textureContext.fillText("(use your fingers)", textureCanvas.width/2, (textureCanvas.height/2 + 65));
}

export { init };
