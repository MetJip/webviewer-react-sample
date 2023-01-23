import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import './App.css';

const App = () => {
  const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: 'https://metjip-dev.s3.eu-central-1.amazonaws.com/organization/634642f3b43047b47d90faca/documents/634642f4b43047b47d90fad9?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYWVMBN7NGLYV7DEA%2F20230123%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230123T060850Z&X-Amz-Expires=2700&X-Amz-Signature=e080b7eeccd6605f08f97b9d63c66fbf36763e1c9a966a2b9e0dbc65034b780d&X-Amz-SignedHeaders=host',
      },
      viewer.current,
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;
      const UIEvents = instance.UI.Events;
      instance.UI.addEventListener(UIEvents.LOAD_ERROR, (error) => {
        console.log("error: ", error);
        
      });
      documentViewer.addEventListener('documentLoaded', () => {
        const rectangleAnnot = new Annotations.RectangleAnnotation({
          PageNumber: 1,
          // values are in page coordinates with (0, 0) in the top left
          X: 100,
          Y: 150,
          Width: 200,
          Height: 50,
          Author: annotationManager.getCurrentUser()
        });

        annotationManager.addAnnotation(rectangleAnnot);
        // need to draw the annotation otherwise it won't show up until the page is refreshed
        annotationManager.redrawAnnotation(rectangleAnnot);
      });
    });
  }, []);

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;
