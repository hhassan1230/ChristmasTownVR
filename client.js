// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface, Module} from 'react-360-web';
// import interactions from './data/interactions';
const ROOMS = require('./config.json')
// console.log(ROOMS["Entry"])
// let r360;
function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    enableHotReload: true,
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

  ROOMS["Entry"].interactions.forEach((buttonInteraction, i) => {
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

    r360.compositor.setBackground(r360.getAssetURL(ROOMS["Entry"].backgroundUrl),{
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
  unregisterSurfaces(){
    // r360.detachRoot(1)
    console.log("waiting")
    for(const surfaceName in r360.compositor._surfaceManager._surfaces){
      // console.log("unregisterSurface", surfaceName !== 'infoPanel', surfaceName)
      if(surfaceName !== 'infoPanel' && surfaceName !== 'default'){
        let surface = r360.compositor._surfaceManager.getSurface(surfaceName)
        r360.compositor._surfaceManager.unregisterSurface(surfaceName)
        r360.detachRoot(surface.rootTag) 

        // r360.compositor._surfaceManager.unregisterSurface(surfaceName)
        // r360.compositor._surfaceManager.showSurface(surface)
      }
    }
    return;
  }
  updateInteractions(room){
    this.unregisterSurfaces()
    setTimeout(() => {
      ROOMS[room].interactions.forEach((buttonInteraction, i) => {
      
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
    })
    }, 1700);

    console.log("SURFACESSS 2:", r360.compositor._surfaceManager._surfaces)

    // r360.compositor.setBackground(r360.getAssetURL(ROOMS[room].backgroundUrl));
  }
}


window.React360 = {init};
