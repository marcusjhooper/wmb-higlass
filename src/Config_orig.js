//import React, { useState, useEffect } from "react";
import cldf from './data.json';
import reactStringReplace from 'react-string-replace';
import Config from './WMB_classes.json' // default config

const getConfig = (clickedCellValue) => {
    // Original subclass config
    const Init_config = require("./WMB_subclasses.json");
    let clicked = clickedCellValue;

    // Subset tracks
    const top = Init_config['views'][1]['tracks']['top']; // tracks to subset
    var Config = Init_config; // clone the config to avoid mutating the original

    // Get tracks to display for clicked class
    let subclasses = ["Gene Annotations (mm10)"];
    for (var i in cldf) {
        if (cldf[i]['class_label'] === clicked) {
            subclasses.push(cldf[i]['subclass_label']);
        }
    }

    // Replace spaces and hyphens with underscores
    subclasses = subclasses.map(subclass => subclass.replace(/ /g, "_").replace(/-/g, "_") + '.bw');
    clicked = clicked.replace(/ /g, "_").replace(/-/g, "_");

    // Subset config
    var output = {};
    for (var i in top) {
        if (subclasses.includes(top[i]['options']['name'])) {
            output[i] = top[i];
        }
    }

    // Update config with subset tracks
    Config['views'][1]['tracks']['top'] = output;

    // Return the modified config
    return Config;
};

export default Config

//var clickedCellValue = 'IT-ET Glut'
//var Config = getConfig(clickedCellValue = 'IT-ET Glut')

// import { useTable, useFilters, usePagination } from 'react-table';
// import cldf from'./data.json';
// import reactStringReplace from 'react-string-replace'

// //original subclass config
// const Init_config = require("./WMB_subclasses.json");
// var top = Init_config['views'][1]['tracks']['top'] //tracks to subset
// var Config = Init_config


// var clicked = "IT-ET Glut"
// //get tracks to display for clicked class
// var subclasses = ["Gene Annotations (mm10)"]
// for(var i in cldf)
// 	if(cldf[i]['class_label'] == clicked )
// 		subclasses.push(cldf[i]['subclass_label'])

// for(i in subclasses)
// 	subclasses[i] = subclasses[i].replace(/ /g,"_").replace(/-/g,"_")+'.bw'

// //clicked class
// var clicked = clicked.replace(/ /g,"_").replace(/-/g,"_")

// //subset config
// var output = {};
// for(var i in top)
//   if(subclasses.includes(top[i]['options']['name']))
//     output[i] = top[i];

// //var Config = subclasses
// Config['views'][1]['tracks']['top'] = output


//export
//export default Config;


//old

//determine resolution clicked
//for (var res in ['class_label','subclass_label','supertype_label'])
//	for(var i in cldf)
//		if(cldf[i][res].includes(clicked))
//			var resolution = res




//var clicked = reactStringReplace(clicked, /(-)/g, () => "_");
//var clicked = reactStringReplace(clicked, /( )/g, () => "_");
//var clicked = clicked+".bw"