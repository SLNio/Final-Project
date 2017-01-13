Final-Project: Antibiotics and their resistant bacteria
==================

###Shan Li Nio, 6222420

Datavisualisation of the antibiotic consumption in europe and bacteria resistant to these antibiotics.

##Objective
With this data visualisations the user can observe all bacteria species resistant to certain antibiotics or antibiotic families and the consumption of these antibiotic families in europe. Simultaneously it can also show for each individual bacterium to which antibiotics it developed resistance. 


##Features

###Visual components
First of all a stretched chord diagram will be implemented, which will consist out of two arcs: a left arc which will contain the different antibiotic families and a right arc which will contain different resistant bacterial species. All connections between the antibiotics and their resistant bacteria will be visualised as chords in one color. When hovered over the antibiotics or the bacteria connections which involve the object of interest will be highlighted in a different color. When hovered over the chords rather than the arcs tooltips appear with the exact percentage of antibiotic resistance. Also the thickness of the chords is a visual indication of the antibiotic resistance percentage. When a particular antibiotic-family is clicked, the datamap visualisation will be updated and the consumption of this antibiotic family is shown for each european country. When hovered over the countries tooltips appear with the country name and the exact antibiotic consumption. When a particular country is clicked the barchart visualisation will be updated and the consumption of multiple antibiotic families will be shown for the selected country. When hovered over the bars tooltips appear with the exact antibiotic consumption values.

![Visual components](https://github.com/SLNio/Final-Project/blob/master/doc/Prototype.PNG)

###Interactive components
Two interactive components will be added to the stretched chord diagram. The first component will be a radio button menu to change the content of the right-arc either to antibiotic families or to individual antibiotics. In this way, connections between specific antibiotics and resistant bacteria can also be observed . The second component will be a select bar to allow users to highlight only the chords that involve a bacterial species or antibiotic of particular interest, without the need to hover over the arcs.

##Optional components
When clicked on a bacterial species a new window opens with info about the species and the symptoms that it can cause. It would also be nice to show pictures of icons of each bacterial species. When clicked on an individual antibiotic a new window opens with info about its family and when to use.


##Dataset
Data for this visualisation is collected from the Centre for Disease Dynamics, World Health Organisation in csv format. This dataset contains information about: antibiotics and their resistant bacteria, antibiotic families and their resistant bacteria, antibiotics assigned to antibiotic family, consumption of antibiotic families per european country, symptoms caused by bacteria.

##Data
Below is a list of the data-formats that are required for each visualisation:

Chord diagram right-arc: list of antibiotic families, list of antibiotics
Chord-diagram left-arc: list of resistant bacteria
Chords: links between bacteria and antibiotics, links between bacteria and antibiotic families

Datamap: groups based on antibiotic consumption value, countries linked to data

Barchart: antibiotic families and their consumption values 

Data will be converted into json format and stored into an object. For the datamap, country names of the data need to be compared with country names in the datamap and thereafter data needs to be linked to the appropriate country code. 


##Technical problems
There could arise problems in the implementation of the stretched chord-diagram, since I've never created a chord-diagram before. Therefore I will make a planning in which I will spent two days at the basic implementation of this visualisation. If no progress is made, due to the complexity, a new visual component will be considered, such as a visualisation with two rectangular groups and interconnectivity between these two groups.

![Vertical Chord Diagram](https://github.com/SLNio/Final-Project/blob/master/doc/Vertical_chord.jpg)

Since all visualisations are connected, this will also mean that there are many combinations of data that can be shown. This requires preparation and loading of multiple datasets which can be selected by the users input. Besides the time that it will cost to prepare all these datasets and switches, there is also a high chance of bugs. Therefore time needs to be reserved in the planning to test every possible combination in order to discover these bugs.


##Similar applications
At http://www.informationisbeautiful.net/visualizations/antibiotic-resistance/ another visualisation is created with the same dataset. In this visualisation antibiotic families and antibiotics are shown at the x-axis, while the bacterial species are shown at the y-axis. When a bacterial species shows resistance to a certain antibiotic a circle can be observed, of which the size represents the percentage of resistance. Resistance to a complete antibiotic family or to a specific antibiotic can be distinguished through use of different colored circles. This visulation contains a high amount of data, which on one hand is good, since all datapoints can be compared with each other and trends can be observed, but on the other hand makes it difficult to read. Therefore other options were chosen for this project to visualise the same data. Furthermore this example lacks interactivity. Implementation of interactive elements limits the amount of data that needs to be shown at the same time, since a simple switch or hover/click effect can be added to change the data that will be shown. This will make the visualisation more clear and easier to interpret.

![Example Resistance](https://github.com/SLNio/Final-Project/blob/master/doc/Resistance_visualisation.PNG)
