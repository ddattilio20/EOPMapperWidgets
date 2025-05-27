const { useEffect, useState } = React;
import { React, type AllWidgetProps, IMAppConfig } from 'jimu-core'
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
//import { Select, Option } from 'jimu-ui'
import { CalciteSelect, CalciteOption, CalciteOptionGroup } from 'calcite-components'
import Query from "esri/rest/support/Query"
import FeatureLayer from 'esri/layers/FeatureLayer';


const Widget = (props: AllWidgetProps<IMAppConfig>) => {
  // create state
  const [mapView, setMapView] = useState<JimuMapView>(null);
  const onActiveViewChange = (activeView: JimuMapView): void => {
    setMapView(activeView);
  };


  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  //function to update url params
  //make sure to change the url and window.location.href depending on where deployed (Web Server or Development Server)
  const urlChange = (event) => {

    //URL for production deployement
    //const url = 'https://exampleURL.com'

    //URL For Testing (ExB developer url)
    const url = 'https://localhost:3001/experience/0/?draft=true'

    let mapVal = event.target.value
    setSelectedOption(event.target.value)


    //Code to update the URL paramaters with the content ID of the web map you are trying to switch to (Production)
    //window.location.href = url + '?webmap=' + mapVal;


    //Code to update the URL paramaters with the content ID of the web map you are trying to switch to (Development)
    window.location.href = url + '&webmap=' + mapVal;

  }



  //zooms in to county based on logged in user
  const countyZoom = (mapView) => {

    //Array of counties and corresponding Account
    const counties = {
      Sunflower: ['SF.Account1', 'SF.Account2','SF.Account3']
    };
    
    //gets current logged in user
    //if (props.user.username == null) return
    let countyUser = props?.user?.username 
    let countyFeature

    //get layer with features you want to zoom to by service url
    let layer = new FeatureLayer({
      url: "services.arcgis.com/layer to zoom to"
    })
   

    //checks counties dictionary to see if logged in user is in dictionary
      for( let [key,value] of Object.entries(counties))
      {
          if(value.includes(countyUser))
          {
            //generate the query with the correct county name and zoom to county
              countyFeature = key
              let query = layer.createQuery()
              query.where = `FEAT_COUNTY = '${countyFeature}'`
              layer.queryFeatures(query).then((result) => {
                  let feature = result.features[0]
                  mapView?.view.goTo({
                  target: feature.geometry.extent,
                  zoom: 10
                })
            })
        }
   }
  }


  //code that populates the drop down with currently selected map based on URL params
  const getParam = () => {
    const params = new URLSearchParams(window.location.search)

    if (!params.has('webmap')) {
      return 'Select an ESF Map'
    }

    else {
      let val = params.get('webmap')
      return val
      
    }

  }

  


//RUNS AFTER RELOAD
//put code you need to run after page reload in here
  useEffect(() => {
    const param = getParam()
    //function calls to update dropdown and do zoom to county
    setSelectedOption(param)
    countyZoom(mapView)
   

  }, [mapView, mapView?.view])


  //generation of data structure to populate the dropdown box with correct values based on props.config
  const lookupTable = JSON.parse(props.config.url)
  const keys = Object.keys(lookupTable)

//JSX code that populates and generates the drop down based on config
  return (
    <div>
      {<CalciteSelect id="mapSelector" onCalciteSelectChange={(e) => urlChange(e)} label={selectedOption} value={selectedOption}>
        {
          keys.map((key) => {
            const object = lookupTable[key]
            return (
              <CalciteOptionGroup label={key}>
                {Object.keys(object).map((subkey) => {
                  return (
                    <CalciteOption selected={selectedOption == subkey ? true : undefined} value={subkey}>{object[subkey]}</CalciteOption>
                  )
                })}
              </CalciteOptionGroup>
            )
          })
        }

      </CalciteSelect>}
      {props.useMapWidgetIds?.length === 1 && !mapView && (
      <JimuMapViewComponent
        useMapWidgetId={props.useMapWidgetIds[0]}
       onActiveViewChange={onActiveViewChange}
     />)}
    </div>
  )

}

export default Widget






