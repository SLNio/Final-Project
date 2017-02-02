/**************************************************************************	

	Name: Shan Li Nio
    Studentnumber: 6222420
    Final Project in Datavisualisation
    Filename: d3_datamap.js
    Description: functions to create the datamap of europe for the final project

    References: 
    
    Draw datamap:
    http://datamaps.github.io/

    Draw datamap legend:
    https://github.com/markmarkoh/datamaps/issues/63

    Load list of countries and country codes:
    http://stackoverflow.com/questions/25044145/datamaps-get-list-of-country-codes

***************************************************************************/

function drawMap(family, familyIndex) {

    var domain = [],
        domainPenicillin = [6, 8, 10, 12, 15, Infinity],
        domainOther = [0.5, 1, 2, 3, 4, Infinity];

    if (familyIndex == 2) {
        domain = domainPenicillin
    }
    else {
        domain = domainOther
    }

    // Change title of datamap dynamically
    $('#maptitle').text(family + ' consumption in Europe (2013)');

    // Load dataset with d3
    d3.json("scripts/europe_data.json", function (error, data) {
        if (error) throw error;

        var dataset = {}

        // convert string data into integer data
        data.forEach(function(d){
            macrolides = +d.Macrolides,
            cephalosporins = +d.Cephalosporins,
            penicillins = +d.Penicillins,
            quinolones = +d.Quinolones
            dataset[d.Code] = [macrolides, cephalosporins, penicillins, 
                quinolones]
        })

        // Remove old map
        document.getElementById('datamap').innerHTML = "";

        // Load list of countries and country codes
        var countries = Datamap.prototype.worldTopo.objects.world.geometries;     
        var newData = {}

        countries.forEach(function(d){

            // Create a data object
            var countryCode = d.id;

            var group = getCountryGroup(countryCode, domain, dataset, 
                familyIndex);
            var total = dataset[countryCode];

            if (group == 'group_default') {
                newData[countryCode] = {fillKey: 'group_default', 
                        data: ['No data available']}
            }
            else {
                newData[countryCode] = {fillKey: group, 
                        data: total[familyIndex]}
            }
        });

        var fillColors = {
            group_0: '#fdd49e',
            group_1: '#fc8d59',
            group_2: '#ef6548', 
            group_3: '#d7301f',
            group_4: '#b30000',
            group_5: '#7f0000',
            group_default: 'lightgrey'
        };

        var fillColorsList = [
            {name: 'group_0', color: '#fdd49e'},
            {name: 'group_1', color: '#fc8d59'},
            {name: 'group_2', color: '#ef6548'}, 
            {name: 'group_3', color: '#d7301f'},
            {name: 'group_4', color: '#b30000'},
            {name: 'group_5', color: '#7f0000'},
            {name: 'group_default', color: 'lightgrey'},
        ];

        var borderwidth = 6,
            map = new Datamap({
                element: document.getElementById("datamap"),
                width: 750 - borderwidth,
                height: 400,
                // zoom in at Europe
                setProjection: function(element) {
                    var projection = d3.geo.equirectangular()
                      .center([15, 52])
                      .rotate([4.4, 0])
                      .scale(600)
                      .translate([element.offsetWidth / 2, element.offsetHeight 
                        / 2]);
                    var path = d3.geo.path()
                      .projection(projection);
                    return {path: path, projection: projection};
                },
                fills: fillColors,
                data: newData,
                geographyConfig: {
                    popupTemplate: function(geography, data) {
                        return '<div class="hoverinfo"><strong>' + 
                            geography.properties.name + '</strong><br />' 
                            + 'Consumption: ' + data.data + ' '
                    },
                    highlightOnHover: false
                },

                // Call functions when a country is clicked
                done: function(datamap){
                    var selectedCountry = undefined,
                        prevHoverCountry = undefined,
                        clickColor = {};
                        apology = '<text class="apology" dx="0.8em" dy="8em" style="fill: rgb(150, 150, 150);">Sorry no data available for this country</text>'

                    datamap.svg.selectAll('.datamaps-subunit').on('click', 
                        function(geography) {

                            clickColor[geography.id] = "#02818a";
                            if (selectedCountry && selectedCountry != geography.id) 
                            {   
                                group = getCountryGroup(selectedCountry, domain, 
                                    dataset, familyIndex);
                                    clickColor[selectedCountry] = fillColors[group];
                            }
                            selectedCountry = geography.id;

                            datamap.updateChoropleth(clickColor);

                            if (dataset[geography.id] != undefined) {
                                if (document.getElementById('barchart').innerHTML == apology)
                                {
                                    drawBarchart(geography.properties.name, 
                                        geography.id, family)
                                }
                                else {
                                    updateBarchart(geography.properties.name, 
                                        geography.id, family)
                                }
                            }
                            else {
                                apologize()
                            }
                    })
                    datamap.svg.selectAll('.datamaps-subunit').on('mouseenter', 
                        function(geography) {

                            if (geography.id != selectedCountry) {
                                clickColor[geography.id] = "#65b9bf"
                            }
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

                    var x = 30,
                        yRect = 225,
                        yLabel = 240,
                        nextElement = 25,
                        legendLabels = ["0 - 0.5", "0.51 - 1.0", "1.1 - 2.0", 
                        "2.1 - 3.0", "3.1 - 4.0", "4.1 <", "No data available"],
                        legendLabelsPen = ["0 - 6", "6.1 - 8.0", "8.1 - 10.0", 
                        "10.1 - 12.0", "12.1 - 15.0", "15.1 <", "No data available"]

                    var legend = datamap.svg.append("g")
                      .attr("class", "legend")

                    var legendtitle = legend.append("text")
                        .attr("id", "legendtitle")
                        .attr("dx", "-39em")
                        .attr("dy", "1.9em")
                        .attr("transform", "rotate(-90)")
                        .text("Consumption (Defined Daily Dose)")

                    legend.selectAll(".box")
                        .data(fillColorsList)
                      .enter().append("rect")
                        .attr("class", "box")
                        .attr("x", x)
                        .attr("y", function(d, i) { return yRect + nextElement * i})
                        .attr("width", 20)
                        .attr("height", 20)
                        .style("fill", function(d) { return d.color });

                    // Add legend labels                    
                    legend.selectAll(".label")
                        .data(function(d,i) { return (familyIndex == 2 ? 
                            legendLabelsPen : legendLabels); })
                      .enter().append("text")
                        .attr("class", "label")
                        .attr("x", 2 * x)
                        .attr("y", function(d, i) { return yLabel + nextElement * i})
                        .text(function(d, i) { return d });
                }
            });
    })
}