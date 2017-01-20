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

function draw_map(family, family_index) {

    var domain = [],
        domain_penicillin = [6, 8, 10, 12, 15, Infinity],
        domain_other = [0.5, 1, 2, 3, 4, Infinity];

    if (family_index == 2) {
        domain = domain_penicillin
    }
    else {
        domain = domain_other
    }

    // Change title of datamap dynamically
    $('#maptitle').text(family + ' consumption in Europe (2013)');

    // Load dataset with d3
    d3.json("data/europe_data.json", function (error, data) {
        if (error) throw error;

        var dataset = {}

        // convert string data into integer data
        data.forEach(function(d){

            country_code = d.Code,
            macrolides = +d.Macrolides,
            cephalosporins = +d.Cephalosporins,
            penicillins = +d.Penicillins,
            quinolones = +d.Quinolones

            dataset[d.Code] = [macrolides, cephalosporins, penicillins, quinolones]
        })

        // Remove old map
        document.getElementById('datamap').innerHTML = "";

        // Load list of countries and country codes
        var countries = Datamap.prototype.worldTopo.objects.world.geometries;     
        var new_data = {}

        countries.forEach(function(d){

            // Create a data object
            var country_code = d.id;
            var group = get_group_for_cc(country_code, domain);
            var total = dataset[country_code];

            if (group == 'group_default') {
                new_data[country_code] = {fillKey: 'group_default', 
                        data: ['No data available']}
            }
            else {
                new_data[country_code] = {fillKey: group, 
                        data: total[family_index]}
            }

        });

        function get_group_for_cc(country_code, domain) {
            var total = dataset[country_code];
            for (var i = 0; i < domain.length; i++){
                if (total != undefined){
                    if (total[family_index] < domain[i]) {
                        return 'group_' + i;
                    }
                }
            }
            return 'group_default';

        }

        var fill_colors = {
            group_0: '#fdd49e',
            group_1: '#fc8d59',
            group_2: '#ef6548', 
            group_3: '#d7301f',
            group_4: '#b30000',
            group_5: '#7f0000',
            group_default: 'lightgrey'
        };

        var fill_colors_list = [
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
                      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
                    var path = d3.geo.path()
                      .projection(projection);
                    return {path: path, projection: projection};
                },
                fills: fill_colors,
                data: new_data,
                geographyConfig: {
                    highlightBorderColor: "#02818a",
                    popupTemplate: function(geography, data) {
                        return '<div class="hoverinfo"><strong>' + 
                            geography.properties.name + '</strong><br />' 
                            + 'Consumption: ' + data.data + ' '
                    },
                    highlightFillColor: false,
                    highlightOnHover: false,
                    highlightBorderWidth: 2
                },

                // Call functions when a country is clicked
                done: function(datamap){
                    var selected_cc = undefined;
                    var previous_hover_cc = undefined;

                    datamap.svg.selectAll('.datamaps-subunit').on('click', 
                        function(geography) {
                            var click_color = {};
                            click_color[geography.id] = "#02818a";
                            if (selected_cc && selected_cc != geography.id) {
                                group = get_group_for_cc(selected_cc, domain);
                                click_color[selected_cc] = fill_colors[group];
                            }
                            selected_cc = geography.id;

                            datamap.updateChoropleth(click_color);

                            if (dataset[geography.id] != undefined) {
                                draw_barchart(geography.properties.name, geography.id)
                            }
                            else {
                                apologize()
                            }
                    })
                    datamap.svg.selectAll('.datamaps-subunit').on('mouseenter', 
                        function(geography) {

                            var click_color = {};
                            if (geography.id != selected_cc) {
                                click_color[geography.id] = "green";
                            }
                            if (previous_hover_cc && previous_hover_cc != 
                                geography.id  && selected_cc != previous_hover_cc) {
                                group = get_group_for_cc(previous_hover_cc, domain);
                                click_color[previous_hover_cc] = fill_colors[group];
                            }
                            previous_hover_cc = geography.id;
                            datamap.updateChoropleth(click_color);
                    })

                    var legend = datamap.svg.append("g")
                      .attr("class", "legend")

                    var legend_labels = ["0 - 0.5", "0.5 <", "1.0 <", "2.0 <", "3.0 <", "4.0 <"]

                    legend.selectAll(".box")
                        .data(fill_colors_list)
                      .enter().append("rect")
                        .attr("class", "box")
                        .attr("x", 10)
                      .attr("y", function(d, i) { return 200 + 25 * i})
                      .attr("width", 20)
                      .attr("height", 20)
                      .style("fill", function(d) { return d.color });

                    legend.append("text")
                      .attr("x", 40)
                      .attr("y", function(d, i) { return 215 + 25 * i})
                      .text(function(d, i) { return legend_labels[i] });

                }
            });
    })
}