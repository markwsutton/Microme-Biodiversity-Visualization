// init: append the option to drop down menu 
function init(){
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;

        sampleNames.forEach((sample)=> {
            selector
                .append("option")
                .text(sample)
                .property('value',sample);
        });
        var firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

//function when a new option is changed to run the other functions
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}



// write a function to build the two charts -- one bar, one bubble

function buildCharts(sample){

    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        //Build the bubble chart
        var bubbleLayout = {
            title: "Count of Bacteria Cultures Per Sample",
            margin: {t:0},
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            margin: {t:30},
        };
        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
        ];
        //Plotly.newPlot -- plot the bubble chart with the above data and layout
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        // Build the Bar Chart
        // set the y tickers in order from highest to lowest, map the names with otuID, top down, only the top 10
        var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
        // set barData -- horizontal bar graph, descending; use slice to take top 10, .reverse to descend
        var barData = [
            {
                y: yticks,
                x: sample_values.slice(0,10).reverse(),
                text: otu_labels.slice(0,10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];
        //specify bubble chart layout info
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found in Each Sample",
            margin: { t:30, 1:150}
        };
        //Plotly.newPlot -- plotting the bar graph with the above data and layout
        Plotly.newPlot("bar", barData, barLayout)
    });
}

// write a function to build the metadata panel
//metadata(sampleNames[0]); id="sample-metadata"
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // create a metaArray  from metadata then take the first item and call it metaResult
      var metaArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var metaResult = metaArray[0];
      // d3.select id #sample-metadata
      var PANEL = d3.select("#sample-metadata");
  
      // refresh the panel using html.("");
      PANEL.html("");
  
      // Use Object.entries to append each key and value pair
      // use .forEach(([key, value])) loop
      // .append h6 and make the key upper case using .toUpperCase
      Object.entries(metaResult).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
  }







// On load -- run init()
init();















// 2. bar, bubbule (one function)
// 3. metadata    object: id: 940
// 4. optionchange function(id){


//     bar,bubbule
//     metadata
// }