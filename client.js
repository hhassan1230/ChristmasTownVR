// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface, Module} from 'react-360-web';
import { Math as GLMath } from "webgl-ui";
// import interactions from './data/interactions';
const house = require('./config.json')
// console.log(ROOMS["Entry"])
function init(bundle, parent, options = {}) {
  AudioPanel = new Surface(100, 100, Surface.SurfaceShape.Flat );
  const cameraDirection = [0, 0, -1];
  const { rotateByQuaternion } = GLMath;
  r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    enableHotReload: true,
    // this function will only run when posution of audioBtn is top-right
    frame: (house.settings.audio.audioAnchor === "top-right") && (
      () => { 
        const cameraQuat = r360.getCameraQuaternion();
        cameraDirection[0] = .75;
        cameraDirection[1] = .47;
        cameraDirection[2] = -1;
        // cameraDirection will point out from the view of the camera,
        // we can use it to compute surface angles
        rotateByQuaternion(cameraDirection, cameraQuat);

        const cx = cameraDirection[0];
        const cy = cameraDirection[1];
        const cz = cameraDirection[2];
        
        const horizAngle = Math.atan2(cx, -cz);
        const vertAngle = Math.asin(cy / Math.sqrt(cx * cx + cy * cy + cz * cz));
        // console.log(cx, cy, cz, horizAngle, vertAngle)
        AudioPanel.setAngle(horizAngle, vertAngle, -.2);
      }
    ),
    nativeModules: [
      new CustomLinkingModule()
    ],
    ...options,
  });

  infoPanel = new Surface(
    800, 
    950, 
    Surface.SurfaceShape.Flat
  );

  infoPanel.setAngle(
    0.6,
    0.1
  )
  
  if(house.settings.audio.audioAnchor === "bottom"){
    AudioPanel.setAngle(0, -Math.PI / 2)
    console.log("calling")
  }

  

  r360.renderToSurface(
    r360.createRoot('ConnectedAudioPanel', {  }),
    AudioPanel,
    'AudioPanel'
  );

  r360.renderToSurface(
    r360.createRoot('ConnectedInfoPanel', {  }),
    infoPanel,
    'infoPanel'
  );

  // function recenterInfoPanel() {
  //     const cameraQuat = r360.getCameraQuaternion();
  //     infoPanel.recenter(cameraQuat, 'all');
  // }

  const that = this;

  house.rooms["Entry"].interactions.forEach((buttonInteraction, i) => {
      buttonsPanel = new Surface(
        250, 
        250, 
        Surface.SurfaceShape.Flat
      );
      console.log(buttonInteraction.id);

      if (buttonInteraction.location.z) {
        buttonsPanel.setAngle(
          buttonInteraction.location.x,
          buttonInteraction.location.y,
          buttonInteraction.location.z,
        )
      } else {
        buttonsPanel.setAngle(
          buttonInteraction.location.x,
          buttonInteraction.location.y,
        )
      }
      r360.renderToSurface(
        r360.createRoot('ConnectedButtonPanel', { buttonInteraction }),
        buttonsPanel,
        `${buttonInteraction.roomName}-${buttonInteraction.type}-${buttonInteraction.id}`
      );
  })
  //fetching images from google drive is not working for some reason, alternatively, we could use imgBB
  let url_or_path = house.rooms["Entry"].backgroundUrl.includes('//') ? house.rooms["Entry"].backgroundUrl : r360.getAssetURL(house.rooms["Entry"].backgroundUrl);
  r360.compositor.setBackground(url_or_path,{
    transition: 1000
  });

}

class CustomLinkingModule extends Module {
  constructor() {
    super('CustomLinkingModule');
  }
  recenterModalAndHideBtnSurface(){
    this.closeModalAndShowBtnSurface()
    const cameraQuat = r360.getCameraQuaternion()
    infoPanel.recenter(cameraQuat, 'all')
    this.hideSurfacesInPanelArea()
  }
  hideSurfacesInPanelArea(){
    for(const surfaceName in r360.compositor._surfaceManager._surfaces){
      if(surfaceName !== 'infoPanel' && surfaceName !== 'default'){
        let surface = r360.compositor._surfaceManager.getSurface(surfaceName)
        let pointX = Math.round(Math.pow((infoPanel._yaw - surface._yaw), 2)*100)/100;
        let pointY = Math.round(Math.pow((infoPanel._pitch - surface._pitch), 2)*100)/100;
        let pointZ = Math.round(Math.pow((infoPanel._roll - surface._roll), 2)*100)/100;
        let d = Math.round(Math.sqrt(pointX + pointY + pointZ)*100)/100

        // console.log(d, "infoPanel", infoPanel, surfaceName, surface)
        if(d < 0.65){
          r360.compositor._surfaceManager.hideSurface(surface)
        }
      }
    }
  }
  closeModalAndShowBtnSurface(){
    for(const surfaceName in r360.compositor._surfaceManager._surfaces){
      // console.log('NAME: ',surfaceName)
      let surface = r360.compositor._surfaceManager.getSurface(surfaceName)
      r360.compositor._surfaceManager.showSurface(surface)
    }
  }
  hideFlaggedSurfaces(room){
    if(house.settings.flaggedInteractionsToHide && house.settings.flaggedInteractionsToHide[room]){
      console.log("Hidingg flagged Interactions")
      house.settings.flaggedInteractionsToHide[room].forEach(surfaceName => {
        let surface = r360.compositor._surfaceManager.getSurface(surfaceName)
        r360.compositor._surfaceManager.hideSurface(surface)
      })
    }
  }
  unregisterSurfaces(){
    console.log("waiting")
    for(const surfaceName in r360.compositor._surfaceManager._surfaces){
      // console.log("unregisterSurface", surfaceName !== 'infoPanel', surfaceName)
      if(surfaceName !== 'infoPanel' && surfaceName !== 'default'){
        let surface = r360.compositor._surfaceManager.getSurface(surfaceName)
        r360.compositor._surfaceManager.unregisterSurface(surfaceName)
        r360.detachRoot(surface.rootTag) 
      }
    }
    return;
  }
  updateInteractions(room){
    this.unregisterSurfaces()
    setTimeout(() => {
      house.rooms[room].interactions.forEach((buttonInteraction, i) => {
      
      // console.log("INTERACTION", buttonInteraction)
      buttonsPanel = new Surface(
        250, 
        250, 
        Surface.SurfaceShape.Flat
      );
      console.log(buttonInteraction.id);

      if (buttonInteraction.location.z) {
      buttonsPanel.setAngle(
          buttonInteraction.location.x,
          buttonInteraction.location.y,
          buttonInteraction.location.z,
        )
      } else {
        buttonsPanel.setAngle(
          buttonInteraction.location.x,
          buttonInteraction.location.y,
        )
      }
        r360.renderToSurface(
          r360.createRoot('ConnectedButtonPanel', { buttonInteraction }),
          buttonsPanel,
          `${buttonInteraction.roomName}-${buttonInteraction.type}-${buttonInteraction.id}`
        );
        console.log(`${buttonInteraction.roomName}-${buttonInteraction.type}-${buttonInteraction.id}`)
    })
    }, 1700);
  }
  open(url) {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      window.location = new URL(url, window.location);
    }
    if (
      /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      window.location = new URL(url, window.location);
    }
      window.open(url) 
  }
}


window.React360 = {init};
