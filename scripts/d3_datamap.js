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

function draw_map(country, code) {


    $('#maptitle').text('Antibiotic consumption in Europe (2013)');

    // d3.json("europe_data.json", function (error, data) {
    //     if (error) throw error;

    //     var dataset = {}

    //     // convert string data into integer data
    //     data.forEach(function(d){

    //         country_code = d.Code,
    //         macrolides = +d.Macrolides,
    //         tetracyclines = +d.Tetracyclines,
    //         cephalosporins = +d.Cephalosporins,
    //         penicillins = +d.Penicillins,
    //         quinolones = +d.Quinolones

    //         // store values per country
    //         dataset[country_code] = [
    //             {'family': 'Macrolides', 'value': macrolides},
    //             {'family': 'Tetracyclines', 'value': tetracyclines},
    //             {'family': 'Cephalosporins', 'value': cephalosporins},
    //             {'family': 'Penicillins', 'value': penicillins},
    //             {'family': 'Quinolones', 'value': quinolones}
    //         ]
    //     })


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
                  .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
                var path = d3.geo.path()
                  .projection(projection);

                return {path: path, projection: projection};
            },
            geographyConfig: {
                highlightBorderColor: "#02818a",
                popupTemplate: function(geography) {
                    return '<div class="hoverinfo"><strong>' + 
                        geography.properties.name + '</strong><br />'
                        + 'consumption value</div>' 
                        // +  consumptiondata.data[family] + ' '
                },
                highlightFillColor: "#02818a",
                highlightBorderWidth: 2
            }
        });

}