/**************************************************************************	

	Name: Shan Li Nio
    Studentnumber: 6222420
    Final Project in Datavisualisation
    Filename: datamao_functions.js
    Description: functions that perform mouse effects of the datamap

***************************************************************************/

// Define variables
var selectedCountry = undefined,
    prevHoverCountry = undefined,
    clickColor = {};

// Change color of country when clicked
function mouseClick(datamap, domain, dataset, familyIndex, family, fillColors) {
   datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {

        // Color countries with hovercolor
        clickColor[geography.id] = '#02818a';

        // Recolor countries with fillcolor
        if (selectedCountry && selectedCountry != 
            geography.id) 
        {   
            group = getCountryGroup(selectedCountry, domain, 
                dataset, familyIndex);
                clickColor[selectedCountry] = 
                fillColors[group];
        }

        // Update datamap with new colors
        selectedCountry = geography.id;
        datamap.updateChoropleth(clickColor);

        if (dataset[geography.id] != undefined) {
            if (checkText())
            {
            	// Draw barchart
                drawBarchart(geography.properties.name, 
                    geography.id, family)
            }
            else {
            	// Update barchart
                updateBarchart(geography.properties.name, 
                    geography.id, family)
            }
        }
        else {
        	// Show apology text
            apologize()
        }
	})
}

// Change color of country when hovered over
function mouseHover(datamap, domain, dataset, familyIndex, fillColors) {
    
    datamap.svg.selectAll('.datamaps-subunit').on('mouseenter', 
    function(geography) {

        // Color countries with hovercolor
        if (geography.id != selectedCountry) {
            clickColor[geography.id] = '#65b9bf'
        }

        // Recolor countries with fillcolor
        if (prevHoverCountry != geography.id && 
                selectedCountry != prevHoverCountry) 
        {
            group = getCountryGroup(prevHoverCountry, 
                domain, dataset, familyIndex);
            clickColor[prevHoverCountry] = fillColors[group];
        }
        prevHoverCountry = geography.id;
        datamap.updateChoropleth(clickColor);
	})
}

// Change color back when datamap is left
function mouseOut(datamap, domain, dataset, familyIndex, fillColors) {

    // Recolor countries when datamap is left
    datamap.svg.selectAll('.datamaps-subunit').on('mouseleave', 
        function(geography) {

            if (geography.id != selectedCountry) {
                group = getCountryGroup(prevHoverCountry, 
                    domain, dataset, familyIndex);
                clickColor[prevHoverCountry] = fillColors[group];
            }
            prevHoverCountry = geography.id;
            datamap.updateChoropleth(clickColor);
    })
}
