Final-Project: Antibiotics and their resistant bacteria
==================
Datavisualisation of the antibiotic consumption in europe and bacteria resistant to these antibiotics.


##Project layout

####Introduction to subject (antibiotic resistance)

####Button to start visualisation

####Page with room for 3 visualisations: chord diagram, chloropleth map and bar chart


##Interaction within visualisations
The user determines for each visualisation which data will be shown.  For the chord diagram the users can determine which connections (chords) they want to show between resistant bacteria and either antibiotics or antibiotic families. Additionally they can determine if they want to show results from a bacterial perspective or from an antibiotic perspective. Both the input of inner-circle as the chords are dependent on the users choice. The previous input of the innercircle will be removed and updated to the new input. The update of the chords will work in a similar way. Implementation of tooltips when hovered over the drawn chords will be considered, even as the implementation of tooltips with information about a selected bacterium or selected antibiotic. Interactive elements within the datamap are tooltips that show the exact antibiotic consumption in defined daily dose (DDD) when hovered over countries and the option to click on countries. The only interactive element within the barcharts are the tooltips with the exact antibiotic consumption when hovered over antibiotic families.

![Circular Chord Diagrams](https://github.com/SLNio/Final-Project/blob/master/doc/Chord_diagram.jpg)

![Datamap and barchart](https://github.com/SLNio/Final-Project/blob/master/doc/map_barchart.jpg)


##Interaction between visualisations
By selecting an antibiotic family the user determines which data is shown in the datamap of europe (consumption of selected antibiotic family). By selecting a certain country the user determines which data is shown in the bar chart (consumption of several antibiotic families per country). Both the input of the datamap and the bar chart are dependent on the users choices. To accomplish this interaction previous input needs to be removed before the new input can be visualised. Furthermore it needs to be considered that several options in the chord diagram don't have data for the datamap and barchart. When these options are clicked an apology needs to appear.


##Data sources
http://www.informationisbeautiful.net/visualizations/antibiotic-resistance/

Centre for Disease Dynamics, World Health Organisation: bit.ly/KIB_Antibiotics
