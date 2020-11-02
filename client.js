// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface, Module} from 'react-360-web';
import interactions from './data/interactions';
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
    infoPanel
  );

  function recenterInfoPanel() {
      const cameraQuat = r360.getCameraQuaternion();
      infoPanel.recenter(cameraQuat, 'all');
  }

  const that = this;

  interactions.forEach((buttonInteraction, i) => {
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
      r360.renderToSurface(
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
    r360.compositor.setBackground(r360.getAssetURL('/PANO_ART/ovenland1.JPG'));

}

class CustomLinkingModule extends Module {
  constructor() {
    super('CustomLinkingModule');
  }
  recenterModal(){
    // r360.start();
    const cameraQuat = r360.getCameraQuaternion()
    // const panelSurface = r360.compositor._surfaceManager._surfaces.surface_0;
    infoPanel.recenter(cameraQuat, 'all')
    // console.log("Getting surface",r360.compositor._surfaceManager._surfaces.surface_0);
  }
}


window.React360 = {init};
