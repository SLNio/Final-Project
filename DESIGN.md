Final-Project: Antibiotics and their resistant bacteria
==================

###Shan Li Nio, 6222420

Datavisualisation of the antibiotic consumption in europe and bacteria resistant to these antibiotics.


##Project layout

*Introduction to subject (antibiotic resistance)

*Button to start visualisation

*Page with room for 3 visualisations: stretched chord-diagram, chloropleth map and bar chart


##Interaction within visualisations
The user determines for each visualisation which data will be shown.  For the chord diagram the users can determine which connections (chords) they want to show between resistant bacteria and either antibiotics or antibiotic families. Additionally they can determine if they want to show results from a bacterial perspective or from an antibiotic perspective. Both the input of inner-circle as the chords are dependent on the users choice. The previous input of the innercircle will be removed and updated to the new input. The update of the chords will work in a similar way. Implementation of tooltips when hovered over the drawn chords will be considered, even as the implementation of tooltips with information about a selected bacterium or selected antibiotic. Interactive elements within the datamap are tooltips that show the exact antibiotic consumption in defined daily dose (DDD) when hovered over countries and the option to click on countries. The only interactive element within the barcharts are the tooltips with the exact antibiotic consumption when hovered over antibiotic families.

![Circular Chord Diagrams](https://github.com/SLNio/Final-Project/blob/master/doc/Stretched_chorddiagram.png)

![Datamap and barchart](https://github.com/SLNio/Final-Project/blob/master/doc/map_barchart.jpg)


##Interaction between visualisations
By selecting an antibiotic family the user determines which data is shown in the datamap of europe (consumption of selected antibiotic family). By selecting a certain country the user determines which data is shown in the bar chart (consumption of several antibiotic families per country). Both the input of the datamap and the bar chart are dependent on the users choices. To accomplish this interaction previous input needs to be removed before the new input can be visualised. Furthermore it needs to be considered that several options in the chord diagram don't have data for the datamap and barchart. When these options are clicked an apology needs to appear.


##Implementation of the stretched chord-diagram visualisation
The implementation of the stretched chord-diagram will be based on an example (http://www.visualcinnamon.com/2015/08/stretched-chord.html). In order to implement this visualisation it is necessary to format the data into a specific matrix, in which the number of connections between each datapoint is stored. In case of my dataset this number of connections is equal to the percentage of resistance. No connections or connections within the bacteria or antibiotics group are stored as a value of 0. The implementation of the visualisation will first be tested with 3 bacteria and 3 antibiotics to keep things simple. The antibiotic that will be selected by the user needs to be stored, this could be done by using an on.click event of d3. The select box and the radio button will be implemented according to bootstrap examples.


##Implementation of the datamap
The implementation of the europe datamap will be based on the Africa example at http://datamaps.github.io/. Countries of the map will be filled with a sequential range of colors which is based on the level of antibiotic consumption. To accomplish this several groups need to be made that are linked to a particular color. For every visible country in the map it needs to be checked if there is antibiotic consumption data available and if so to which group this country can be assigned. Countries without data need to be assigned to the 'No data available' group. Furthermore only data for the antibiotic family that was selected in the stretched chord-diagram needs to be shown. Therefore several different dataset objects need to be created which can be called with an antibiotic-family key. The value that is coupled to this key will exist out of a list of objects, in which the country can be called with the key 'code' and the consumption value can be called with the key 'value'. The country that will be selected by the user needs to be stored, this can be done by using an on.click event of datamaps. 

##Implementation of the barchart
The implementation of the barchart is based on an example of a single barchart (http://bl.ocks.org/Caged/6476579). To create multiple bars for the different antibiotic families for each country, data needs to be formatted to an object in which the country functions as a key. To create a single bar for each family, consumption values need to be stored per family. Therefore an object was created for each family, in which the antibiotic family can be called with key 'family' and the consumption value can be called with key 'value'. All these objects are stored in a list, which can be accessed with the country. This country argument will be stored when a particular country is selected in the datamap and passed to the draw_barchart function. Also the barchart title will be adjusted to the country that is selected, therefore also the countryname is passed to the barchart function. Another argument that needs to be passed is the antibiotic family that was selected in the stretched chord-diagram, since this family needs to be highlighted in the barchart.


##Technical problems
There could arise problems in the implementation of the stretched chord-diagram, since I've never created a chord-diagram before. Therefore I will make a planning in which I will spent two days at the basic implementation of this visualisation. If no progress is made, due to the complexity, a new visual component will be considered, such as a visualisation with two rectangular groups and interconnectivity between these two groups.

![Vertical Chord Diagram](https://github.com/SLNio/Final-Project/blob/master/doc/Vertical_chord.jpg)

Since all visualisations are connected, this will also mean that there are many combinations of data that can be shown. This requires preparation and loading of multiple datasets that are selected by the user. Besides the time that it will cost to prepare all these datasets and switches between datasets, there is also a high chance of bugs. Therefore time needs to be reserved in the planning to test every possible combination in order to discover these bugs.


##Data sources
http://www.informationisbeautiful.net/visualizations/antibiotic-resistance/

Centre for Disease Dynamics, World Health Organisation: bit.ly/KIB_Antibiotics
