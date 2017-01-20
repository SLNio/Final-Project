Final-Project: Antibiotics and their resistant bacteria
==================

###Shan Li Nio, 6222420

Datavisualisation of the antibiotic consumption in europe and bacteria resistant to these antibiotics.


#day 1 

![Example Resistance](https://github.com/SLNio/Final-Project/blob/master/doc/Resistance_visualisation.PNG)

Think of three linked visualisations which can be made with the obtained dataset. The most important result that I would like to show, comprises the pattern in antibiotic resistance (so the links between antibiotics and resistant bacteria). The first thing that came to mind were multiple barcharts per antibioticum with the different bacteria on the x-axis and the percentage of resistance on the y-axis. However inspired by the visualisation at http://www.informationisbeautiful.net/visualizations/antibiotic-resistance/ (image above), I would like to show all connections between bacteria and antibiotics in the same visualisation. Therefore I thought of a first visualisation with two circular elements and connecting chords between these two elements. Since I expect the implementation of this visualisation to be complex, I thought of two other visualisation that are easy to implement, yet informative. I have decided to add a chloropleth map of Europe that shows the consumption of an antibiotic family. This map is connected to the previous visualisation in the way that it only shows the consumption of the antibiotic family that is selected in the first visualisation. Furthermore a barchart will be added which shows the consumption of multiple antibiotic families per country that is selected in the map.

![Visual components](https://github.com/SLNio/Final-Project/blob/master/doc/Overview.jpg)

#day 2
Work on a more detailed idea for every visualisation for the DESIGN document. I have created detailed sketches about the interactivity within the first visualisation. Initially, only the innercircle with antibiotics can be clicked, whereafter connecting chords are drawn between a particular antibiotic and its resistant bacteria. By using a switch (dropdown menu or radio button) there can be switched between the innercircle with antibiotics and the outercircle with
bacteria, regarding the clicking. Another switch makes it possible to show connections between antibiotic families and bacteria or between individual antibiotics
and bacteria. The visualisation will also include tooltips for the chords with the exact percentage of antibiotic resistance.

![Chord-diagram](https://github.com/SLNio/Final-Project/blob/master/doc/Chord_diagram.jpg)

Countries of the datamap will be filled with a sequential range of colors, based on the level of antibiotic consumption. when hovered over a country, this country will be highlighted and a tooltip the countryname and exact consumption value will appear. When a country is clicked it remains highlighted and a bar chart will be drawn. The antibiotic family that was selected in the first visualisation will be highlighted in the barchart, while the antibiotic families will be shown in the same color. In this way it will be clear which antibiotic data is shown.

![Datamap and Barchart](https://github.com/SLNio/Final-Project/blob/master/doc/map_barchart.jpg)

#day 3 
Implement feedback of the group in design ideas. The suggestion to replace one of the radio buttons/dropdown menus with a search bar is a nice idea. When a specific bacteria or antibiotic is entered as search query, all connections (chords) connected to the search will be highlighted. This also means that there cannot be switched between activation of the innercircle with antibiotics and the outercircle with bacteria. However, allowing the possibility to select both bacteria and antibiotics might be more users-friendly.

![Searchbar](https://github.com/SLNio/Final-Project/blob/master/doc/Searchbar.jpg)

#day 4
Examine if there are examples of the first visualisation idea. I have not found any examples of my exact idea, the implementation of connections between an inner- and outercircle does not seem to be an existing visualisation. However at the D3 examples page I did find an example of a stretched chord diagram (http://www.visualcinnamon.com/2015/08/stretched-chord.html). In this example the circular chord diagram is splitted into two halves, to make it clear that there are two separate groups, with connections only between these groups and no connections wihtin both groups. Since my dataset is suited for this visualisation I will try to implement this next week. With the bacteria positioned at the left half and the antibiotics positioned at the right half. Furthermore I have reconsidered the idea of showing only the connections for a selected option. At the moment I would like to show all connections simultaneously. By hovering over the different options, the connections for that particular option will be highlighted. I still like the idea to implement tooltips with the resistance percentage, these could appear, when hovered over the chords.

![Stretched Chord-diagram](https://github.com/SLNio/Final-Project/blob/master/doc/Stretched_chorddiagram.png)

An alternative option is to view the two groups in a vertical way, instead of a circular way. An example of this visualisation is available at http://bl.ocks.org/jesseh/4168921. This visualisation requires an easier data-format compared to the stretched chord-diagram. When the stretched chord-diagram appears to complex to implement next week tuesday, I will switch to the implementation of this visualisation. 

![Vertical Connectivity](https://github.com/SLNio/Final-Project/blob/master/doc/Vertical_connections.png)

Furthermore I started to create a prototype of the website. The datamap of europe was loaded and made interactive but it still needs to be coupled to the dataset. The barchart is coupled to the correct data, but still needs to be linked to the datamap.

![Prototype](https://github.com/SLNio/Final-Project/blob/master/doc/Prototype.PNG)

#day 5
Update documents with latest ideas, change idea of search bar into selection box. Inspired by examples of select2 (https://select2.github.io/examples.html#placeholders).

![Selectionbox](https://github.com/SLNio/Final-Project/blob/master/doc/Navigationbar.jpg)

#day 6
Finish two visualisations, so the rest of the week can be spend on the stretched chord diagram. The datamap is coupled to the correct data, both the datamap and the barchart are linked, interactivity of both visualisations is complete. Datamap and barchart still contain minor bugs. 

![Progress](https://github.com/SLNio/Final-Project/blob/master/doc/Progress_map.jpg)

Implementation of the selection box was also started with example options. This box will later be coupled to the dataset which contains the list of bacteria and antibiotics. It is planned to write a function in javascript which can add these values to the selection box

![Selectionbox](https://github.com/SLNio/Final-Project/blob/master/doc/Progress_navbar.jpg)

#day 7 
Start implementation of the stretched chord diagram. First of all a normal interactive chord diagram was implemented to understand how the different chord diagram elements work. By understanding the basics, it will also be easier to understand the code of the stretched chord diagram. To simplify the implementation for now, only six datapoints were used. The remaining datapoints will be added later in the process. 

![Chord_diagram](https://github.com/SLNio/Final-Project/blob/master/doc/chorddiagram_bacteria.jpg)

![Chord_diagram](https://github.com/SLNio/Final-Project/blob/master/doc/interactive_chorddiagram_bacteria.jpg)

#day 8
Continue implementation of the stretched chord diagram. The code for the normal chord diagram was adjusted so it would look like the stretched chord diagram. The implementation was again performed with only six datapoints.

![Stretched Chord_diagram](https://github.com/SLNio/Final-Project/blob/master/doc/stretched_chord_bacteria.jpg)

![Stretched Chord diagram](https://github.com/SLNio/Final-Project/blob/master/doc/stretched_chord_interactive_bacteria.jpg)

#day 9
Couple the stretched chord diagram to the correct data. The antibiotic resistance dataset was changed to the proper matrix format, so it could be used for the stretched chord diagram. Thereafter small changes were made to the code that was written at day 8 to make it suitable for the antibiotic resistance data. 

![Stretched Chord diagram](https://github.com/SLNio/Final-Project/blob/master/doc/chord_antibiotic.jpg)

![Stretched Chord diagram](https://github.com/SLNio/Final-Project/blob/master/doc/chord_antibiotic_interactive.jpg)

Additionally the chord diagram was linked to the datamap, by making the antibiotic families for which there was consumption data selectable. When clicked the consumption data of this antibiotic family will be shown in the datamap. The titel will also change dynamically. 

![Stretched Chord diagram](https://github.com/SLNio/Final-Project/blob/master/doc/chord_map.jpg)

Antibiotic families for which no data was availabe or bacteria were made non selectable for now. I am planning to make them selectable and to show additional windows with information about the clicked item. Furthermore it is not very clear at the moment that you can click several antibiotic families. Therefore I am considering to create an introduction animation which explains all the options of the stretched chord diagram, so it will be clear to the user what interactive options are there or to change the appearance of the selectable options to make it more clear that they can be clicked.




