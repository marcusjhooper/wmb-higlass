import cldf from './data.json';
import _ from 'lodash'; 

const getConfig = (clickedCellValue) => {
    const Init_config = require("./WMB_subclasses.json");

    // Deep copy to avoid mutating the original configuration
    let ConfigClone = _.cloneDeep(Init_config);

    console.log("Init_config:", Init_config); // Log the initial config for debugging
    console.log("ConfigClone:", ConfigClone); // Log the cloned config for debugging

    const views = ConfigClone['views'];

    // Check if the views array exists and has at least one item
    if (!views || views.length === 0 || !views[0]['tracks'] || !views[0]['tracks']['top']) {
        console.error("The configuration structure is not as expected");
        return ConfigClone; // Return the default config to avoid breaking the app
    }

    let clicked = clickedCellValue;
    function findLabel(label) {
    // determine resolution of the clicked cell by iterating through each item in the cldf
    for (const item of cldf) {
    if (item.class_label === label) {
        return 'class_label';
    } else if (item.subclass_label === label) {
    	return 'subclass_label';
    } else if (item.supertype_label === label) {
      	return 'supertype_label';
    }
    }
  return null;
}
    const resolution = findLabel(clicked);
    
    // Subset tracks
    const top = views[0]['tracks']['top'];
    let subgroups = ["Gene Annotations (mm10)"];

    // Get tracks to display for the clicked class
    if(resolution === 'class_label'){
    	console.log('resolution: class')
   	for (let i in cldf) {
            if (cldf[i]['class_label'] === clicked) {
                subgroups.push(cldf[i]['subclass_label'].replace(/ /g, "_").replace(/-/g, "_") + '.bw');
            }
        }
    
    }else if(resolution ==='subclass_label'){
    	console.log('resolution: subclass')
   	for (let i in cldf) {
            if (cldf[i]['subclass_label'] === clicked) {
                subgroups.push(cldf[i]['supertype_label'].replace(/ /g, "_").replace(/-/g, "_") + '.bw');
            }
        }

    }

    
    // Create a new output object with sequential numeric indices
    let output = {};
    let index = 0;

    for (let key in top) {
        if (subgroups.includes(top[key]['options']['name'])) {
            output[index] = top[key]; // Ensure this is a valid track object
            index++;
        }
    }

    // Convert output object to an array for compatibility with array operations
    let outputArray = Object.values(output);

    // Check the structure of the subsetted output array
    console.log("Subsetted output array:", outputArray);

    // Ensure `outputArray` adheres to HiGlass expectations
    ConfigClone['views'][0]['tracks']['top'] = outputArray;

    return ConfigClone;
};

export default getConfig;
