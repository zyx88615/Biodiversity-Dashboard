  function buildMetadata(sample) {
  var data1 = d3.select("#sample-metadata").html("") 

  d3.json(`/metadata/${sample}`).then(function(d){
    var c = d

    Object.entries(c).forEach(([key, value]) => {
    var cell = data1.append("h6").append("b")

    cell.text(`${key}: ${value}`);
  });
   var WF=d.WFREQ
   console.log(WF)


// Trig to calc meter point
var degrees = 180 - WF*20,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 30, color:'85000'},
    showlegend: false,
    name: 'Frequency',
    text: WF,
    hoverinfo: 'text+name'},
  { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
  rotation: 90,
  text: ['8-9', '7-8', '6-7', '5-6',
            '4-5', '3-4', '2-3','1-2','0-1',''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(27, 189, 0, .5)','rgba(14, 127, 0, .5)','rgba(14,145, 0, .5)', 'rgba(110, 154, 22, .5)',
                         'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                         'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                         'rgba(245, 235, 202, 0.5)','rgba(255, 255, 255, 0)']},
  labels: ['8-9', '7-8', '6-7', '5-6',
            '4-5', '3-4', '2-3','1-2','0-1', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: '<b>Belly Button Washing Frequency</b> <br> Scrub per Week',
  height: 500,
  width: 600,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1,1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout);


  })




}

function buildCharts(sample) {
   d3.json(`/samples/${sample}`).then(function(d, i){
    Plotly.purge('pie')
    Plotly.purge('bubble')
      console.log(i)
      console.log(d)
      tempV=d.sample_values.slice(0,10)
      tempN=d.otu_labels.slice(0,10)
    var data=[{
      values:tempV,
      labels:d.otu_ids.slice(0,10),
      name:tempN,
      type:"pie",
      hovertext: tempN,
      
    }]
    var layout = {
      title:"<b>Bacteria Pie Chart</b>",
    }

     var bubblelayout = {
      margin: {t : 0}
      };

    Plotly.plot("pie", data,layout);
    var data2=[{
      x: d.otu_ids,
      y: d.sample_values,
      text:d.otu_labels,
      mode: 'markers',
      hoverinfo:'x+y+text',
      marker: {
      color: d.otu_ids,
      size: d.sample_values,
      
    }}]
    Plotly.plot("bubble", data2, bubblelayout)
  }
    )

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();



var level =9;

// Trig to calc meter point
var degrees = 180 - level*20,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 34, color:'85000'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
  rotation: 90,
  text: ['8-9', '7-8', '6-7', '5-6',
            '4-5', '3-4', '2-3','1-2','0-1',''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(27, 189, 0, .5)','rgba(14, 127, 0, .5)','rgba(14,145, 0, .5)', 'rgba(110, 154, 22, .5)',
                         'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                         'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                         'rgba(245, 235, 202, 0.5)','rgba(255, 255, 255, 0)']},
  labels: ['8-9', '7-8', '6-7', '5-6',
            '4-5', '3-4', '2-3','1-2','0-1', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: '<b>Belly Button Washing Frequency</b> <br> Scrub per Week',
  height: 500,
  width: 600,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1,1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout);
