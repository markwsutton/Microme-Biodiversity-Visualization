# Microbe Biodiversity Visualization
An interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels utilizing plotly.

Link to live visualization: https://markwsutton.github.io/Microme-Biodiversity-Visualization/

The data is from Hulcr, J. et al.(2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/.

The data is stored locally in json format, in samples.json. The user is able to select a Test Subject ID from a dropdown menu, which then updates the rest of the page. For each User ID, the following will be displayed:
1. A Plotly Bar Chart of the Top 10 Bacteria Cultures Found in Each Sample
2. A Plotly Bubble Chart showing the Count of Bacteria Cultures Per Sample
3. A panel that indicates detailed information about each Test Subject ID.

Image of the visualization:

![Image](https://github.com/markwsutton/Microme-Biodiversity-Visualization/blob/master/vizimage/1-Viz.png)
