const { useEffect, useState } = React;
import { React, type AllWidgetProps, IMAppConfig } from 'jimu-core'
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import Editor from "esri/widgets/Editor"
import Sketch from "esri/widgets/Sketch"
import { useRef } from 'react';




const Widget = (props: AllWidgetProps<IMAppConfig>) => {
  // create state
  const [mapView, setMapView] = useState<JimuMapView>(null);
  const onActiveViewChange = (activeView: JimuMapView): void => {
    setMapView(activeView);
  };

  const editRef = useRef(null)

  //use effect looking at mapView.view
  useEffect(() =>{
    if(!mapView?.view) return
    //create edit widget instance
    const editor = new Editor({
      view: mapView?.view,
      container: editRef?.current,
      snappingOptions: {
        enabled: true,
        featureEnabled: true
      }
    })



    return () => editor.destroy()

    

  },[mapView?.view])
  {

  }



  return (
    <div id ="testDiv "style={{height: 'inherit'}} >
      {/* <Button title="Circle Radius Measure Tool" onClick={eW? () => removeEditWidget() : () => {addEditWidget(mapView)}}>Edit Features</Button> */}
      {/* Retrieve map view, if configured */}
      <div ref={editRef} style={{overflow : 'scroll'}}>
      </div>
      {props.useMapWidgetIds?.length === 1 && !mapView && (
        <JimuMapViewComponent
          useMapWidgetId={props.useMapWidgetIds[0]}
          onActiveViewChange={onActiveViewChange}
        />)}
    </div>
  )
}

export default Widget