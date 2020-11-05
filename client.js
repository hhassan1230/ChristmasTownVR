// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface, Module} from 'react-360-web';
import interactions from './data/interactions';
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

      // console.log("========================= THat ", recenterInfoPanel);
      // buttonInteraction.recenter = recenterInfoPanel;
      // if(buttonInteraction.type !== 'Nav'){
      //   console.log("ID: ", `${buttonInteraction.type}-${buttonInteraction.id}`)
      //   r360.renderToSurface(
      //     r360.createRoot('ConnectedButtonPanel', { buttonInteraction }),
      //     buttonsPanel,
      //     `${buttonInteraction.type}-${buttonInteraction.id}`
      //   );
      // } else{
      //   r360.renderToSurface(
      //     r360.createRoot('ConnectedButtonPanel', { buttonInteraction }),
      //     buttonsPanel
      //   );
      // }

        rootTag = r360.renderToSurface(
          r360.createRoot('ConnectedButtonPanel', { buttonInteraction }),
          buttonsPanel
        );

      // const s = r360.getDefaultSurface();
      // s.resize(10, 10);
  })

  // const buttonsPanel = new Surface(
  //   400, 
  //   550, 
  //   Surface.SurfaceShape.Flat
  // );

  // buttonsPanel.setAngle(
  //   -0.6,
  //   0.1
  // )

  // r360.renderToSurface(
  //   r360.createRoot('ConnectedButtonInfoPanel', { /* initial props */ }),
  //   buttonsPanel
  // );

  // Load the initial environment
  // r360.compositor.setBackground(r360.getAssetURL('/PANO_ART/ovenland1.JPG'));
    r360.compositor.setBackground(r360.getAssetURL(ROOMS["Entry"].backgroundUrl));

}

class CustomLinkingModule extends Module {
  constructor() {
    super('CustomLinkingModule');
  }
  recenterModalAndHideBtnSurface(name){
    const cameraQuat = r360.getCameraQuaternion()
    for(const surfaceName in r360.compositor._surfaceManager._surfaces){
      let surface = r360.compositor._surfaceManager.getSurface(surfaceName)
      r360.compositor._surfaceManager.showSurface(surface)
    }

    let surface = r360.compositor._surfaceManager.getSurface(name)
    r360.compositor._surfaceManager.hideSurface(surface)
    console.log("CAMERAAA", cameraQuat)
    // const panelSurface = r360.compositor._surfaceManager._surfaces.surface_0;
    infoPanel.recenter(cameraQuat, 'all')
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
    // console.log("detaching room")
    for(const surfaceName in r360.compositor._surfaceManager._surfaces){
      // console.log("unregisterSurface", surfaceName !== 'infoPanel', surfaceName)
      if(surfaceName !== 'infoPanel' && surfaceName !== 'default'){
        let surface = r360.compositor._surfaceManager.getSurface(surfaceName)
        r360.compositor._surfaceManager.unregisterSurface(surfaceName)
        r360.detachRoot(surface.rootTag) 

        console.log("unregisterSurface", surfaceName, surface.rootTag)
        // r360.compositor._surfaceManager.unregisterSurface(surfaceName)
        // r360.compositor._surfaceManager.showSurface(surface)
      }
    }
  }
  changeRoom(room){
    this.unregisterSurfaces()
    ROOMS[room].interactions.forEach((buttonInteraction, i) => {
      
      // console.log("INTERACTION", buttonInteraction)
      buttonsPanel = new Surface(
        250, 
        250, 
        Surface.SurfaceShape.Flat
      );
      console.log(buttonInteraction.id);

      // if (buttonInteraction.location.z) {
      buttonsPanel.setAngle(
          buttonInteraction.location.x,
          buttonInteraction.location.y,
          buttonInteraction.location.z,
        )
      // } else {
      //   buttonsPanel.setAngle(
      //     buttonInteraction.location.x,
      //     buttonInteraction.location.y,
      //   )
      // }

      // console.log("========================= THat ", recenterInfoPanel);
      // buttonInteraction.recenter = recenterInfoPanel;
      // if(buttonInteraction.type !== 'Nav'){
      //   console.log("ID: ", `${buttonInteraction.type}-${buttonInteraction.id}`)
      //   r360.renderToSurface(
      //     r360.createRoot('ConnectedButtonPanel', { buttonInteraction }),
      //     buttonsPanel,
      //     // `${buttonInteraction.type}-${buttonInteraction.id}`
      //   );
      // } else{
        r360.renderToSurface(
          r360.createRoot('ConnectedButtonPanel', { buttonInteraction }),
          buttonsPanel
        );
      // }
    })
    r360.compositor.setBackground(r360.getAssetURL(ROOMS[room].backgroundUrl));
  }
}


window.React360 = {init};
