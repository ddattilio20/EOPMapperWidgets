This is the Map Switching Widget, which is the core of the development work spent on EOP Mapper. All the code is here, with somewhat adequate comments. 

The only part that is not in the actual files is the data format for the list of content IDs, and their labels for populating the dropdown. You specify the content IDs and corresponding labels in a field in the Experience Builder Dev Edition configuration screen (normal Experience Builder app UI) when you add the Map Switcher widget to the experience. You will need a data structure formatted like the example below:

Group = Group Title to group maps
ContentID = ArcGIS Online Content ID
Map Label = Label for each map (so you don't just see content IDs)



{   "Group1"   : {"contentID" : "Map Label 1"},
    "Group2": {"contentID" : "Map Label",
              "contentID" : "Map Label",
              "contentID" : "Map Label",
              "contentID" : "Map Label"},
    "Group3": {"contentID" : "Map Label"},
    "Group4": {"contentID" : "Map Label",
              "contentID" : "Map Label",
              "contentID" : "Map Label",
              "contentID" : "Map Label"}
                                    
}





Also note, due to an issue with Experience Builder Developer Edition and some ESRI JavaScript SDK Packages, you need to make sure to add the following to the manifest.json file for your widget:
"dependency":["jimu-arcgis"]
