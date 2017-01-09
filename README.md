Final-Project
==================
Datavisualisation of the antibiotic consumption in europe and bacteria resistant to these antibiotics.

##Objective
With this data visualisations the user can observe all bacteria species resistant to a certain antibiotic (family) and the consumption of this antibiotic (family) in europe. Simultaneously it can also show for each individual bacterium to which antibiotics it developed resistance. 

##Features

###Visual components
To solve this problem a chord diagram-like visulation will be implemented, which will consist out of two circles: an inner-circle which will contain the different antibiotic families and an outer-circle which will contain different resistant bacterial species. When a certain antibiotic-family is clicked, several chords will connect this family to the bacterial species in the outer-circle which are resistant to this selected family. The thickness of the chords will represent the percentage of antibiotic resistance. Simultaneously a new window opens with a chloropleth heat map which shows the consumption of the selected antibiotic-family for each european country. When an individual country is clicked a new window opens with a bar chart that shows the consumption of all different antibiotic families.

###Interactive components
Two interactive components will be added to the chord diagram. The first component will be a button/dropdown menu to switch the content of the inner-circle to antibiotics rather than antibiotic families. In this way links can be made between specific antibiotics and resistant bacteria. The second component will be another button/dropdown menu which makes it possible to click on the outer-circle which contains the different bacteria. When a certain bacterial species is clicked, several chords will connect this species to the antibiotics (families) to which it is resistant.

##Data
Data for this visualisation is already collected from bit.ly/KIB_Antibiotics, which is a csv file. Data will be converted into json format and stored into an object. For the chloropleth map, country names of the data need to be compared with country names in the chloropleth map and thereafter data needs to be linked to the appropriate country code. 

##Technical problems
There could arise problems in the implementation of the chord diagram, since I've never created a chord diagram before. Therefore I will start with the implementation of this data visualisation. When it appears that the implementation of this diagram is too complex, a new visual component will be considered.

##Similar applications
At http://www.informationisbeautiful.net/visualizations/antibiotic-resistance/ another visualisation is created with the same dataset. In this visualisation antibiotic families and antibiotics are shown at the x-axis, while the bacterial species are shown at the y-axis. When a bacterial species shows resistance to a certain antibiotic a circle can be observed, of which the size represents the percentage of resistance. Resistance to a complete antibiotic family or to a specific antibiotic can be distinguished through use of different colored circles. This visulation contains a high amount of data, which on one hand is good, since all datapoints can be compared with each other and trends can be observed, but on the other hand makes it difficult to read. Therefore other options were chosen for this project to visualise the same data.

