require('dotenv').config();
import "bootstrap";
import { init } from '../plugins/initThree';

if (window.holoQRPatt){
  console.log("ThreeJS initialization...");
  init(window.holoQRPatt);
}
