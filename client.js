// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface} from 'react-360-web';
import interactions from './data/interactions';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    enableHotReload: true,
    ...options,
  });


  interactions.forEach((buttonInteraction, i) => {
      const buttonsPanel = new Surface(
        220, 
        220, 
        Surface.SurfaceShape.Flat
      );

      buttonsPanel.setAngle(
        buttonInteraction.location.x,
        buttonInteraction.location.y,
      )

      r360.renderToSurface(
        r360.createRoot('ConnectedButtonInfoPanel', { buttonInteraction }),
        buttonsPanel
      );
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

  // const infoPanel = new Surface(
  //   400, 
  //   550, 
  //   Surface.SurfaceShape.Flat
  // );

  // infoPanel.setAngle(
  //   0.6,
  //   0.1
  // )

  // r360.renderToSurface(
  //   r360.createRoot('ConnectedHouseInfoPanel', { /* initial props */ }),
  //   infoPanel
  // );

  // r360.renderToSurface(
  //   r360.createRoot('ConnectedButtonInfoPanel', { /* initial props */ }),
  //   buttonsPanel
  // );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('/PANO_ART/ovenland1.JPG'));
}

window.React360 = {init};
