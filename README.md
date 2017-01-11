Final-Project: Antibiotics and their resistant bacteria
==================

##Shan Li Nio

##Objective
With this data visualisations the user can observe all bacteria species resistant to certain antibiotics or antibiotic families and the consumption of these antibiotic families in europe. Simultaneously it can also show for each individual bacterium to which antibiotics it developed resistance. 


##Features

###Visual components
First of all a circular chord diagram-like visulation will be implemented, which will consist out of two circles: an inner-circle which will contain the different antibiotic families and an outer-circle which will contain different resistant bacterial species. When a certain antibiotic-family is clicked, several chords will connect this family to the bacterial species in the outer-circle which are resistant to this selected family. The thickness of the chords will represent the percentage of antibiotic resistance. Simultaneously a new window opens with a chloropleth datamap which shows the consumption of the selected antibiotic-family for each european country. When an individual country is clicked a new window opens with a bar chart that shows the consumption of all different antibiotic families for that particular country.

![Visual components](https://github.com/SLNio/Final-Project/blob/master/doc/Overview.jpg)

###Interactive components
Two interactive components will be added to the chord diagram. The first component will be a radio button/dropdown menu to switch the content of the inner-circle to antibiotics rather than antibiotic families. In this way links can be made between specific antibiotics and resistant bacteria. The second component will be another radio button/dropdown menu which makes it possible to click on the outer-circle which contains the different bacteria. When a certain bacterial species is clicked, several chords will connect this species to the antibiotics (families) to which it is resistant.

###Optional interactive components
As an alternative to the second radio button/dropdown menu, a search bar can be implemented which makes it possible to search for a certain bacterial species or antibiotic. When the search is an existing option, the searched element will be highlighted, when the search does not exist, there will be an apology. 

![Search Bar](https://github.com/SLNio/Final-Project/blob/master/doc/Searchbar.jpg)

##Dataset
Data for this visualisation is collected from the Centre for Disease Dynamics, World Health Organisation in csv format. This dataset contains information about: antibiotics and their resistant bacteria, antibiotic families and their resistant bacteria, antibiotics assigned to antibiotic family, consumption of antibiotic families per european country, symptoms caused by bacteria.

##Data
Below is a list of the data-formats that are required for each visualisation:

Chord diagram inner-circle: list of antibiotic families, list of antibiotics
Chord-diagram outer-circle: list of resistant bacteria
Chords: links between bacteria and antibiotics, links between bacteria and antibiotic families

Datamap: groups based on antibiotic consumption value, countries linked to data

Barchart: antibiotic families and their consumption values 

Data will be converted into json format and stored into an object. For the datamap, country names of the data need to be compared with country names in the datamap and thereafter data needs to be linked to the appropriate country code. 


##Technical problems
There could arise problems in the implementation of the chord diagram, since I've never created a chord diagram before. Therefore I will start with the implementation of this data visualisation. When it appears that the implementation of this diagram is too complex, a new visual component will be considered, such as a vertical chord diagram, rather than a circular diagram or a heatmap.

![Vertical Chord Diagram](https://github.com/SLNio/Final-Project/blob/master/doc/Vertical_chord.jpg)


##Similar applications
At http://www.informationisbeautiful.net/visualizations/antibiotic-resistance/ another visualisation is created with the same dataset. In this visualisation antibiotic families and antibiotics are shown at the x-axis, while the bacterial species are shown at the y-axis. When a bacterial species shows resistance to a certain antibiotic a circle can be observed, of which the size represents the percentage of resistance. Resistance to a complete antibiotic family or to a specific antibiotic can be distinguished through use of different colored circles. This visulation contains a high amount of data, which on one hand is good, since all datapoints can be compared with each other and trends can be observed, but on the other hand makes it difficult to read. Therefore other options were chosen for this project to visualise the same data.

