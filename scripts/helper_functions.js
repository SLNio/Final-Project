/**************************************************************************	

	Name: Shan Li Nio
    Studentnumber: 6222420
    Final Project in Datavisualisation
    Filename: helper_functions.js
    Description: functions that perform part of the computation of the d3 
    functions

***************************************************************************/

// Update options of the selection bar
function changeSelectionbar(bacteria, antibiotics) {

    var selections = [];
    var childrenBac = [];
    var childrenAnt = [];

    // Remove old selection bar options
    document.getElementById('select').innerHTML = "";

    // Create objects for all options
    for (var i = 0; i < bacteria.length ; i++) {
            
        var options = {};
        options['id'] = bacteria[i]
        options['text'] = bacteria[i]
        childrenBac.push(options)
    }

    for (var i = 0; i < antibiotics.length ; i++) {
            
        var options = {};
        options['id'] = antibiotics[i]
        options['text'] = antibiotics[i]
        childrenAnt.push(options)
    }

    // Create objects for outgroups
    selections.push({
        text : "Bacteria",
        children: childrenBac
    });

    selections.push({
        text: "Antibiotics",
        children: childrenAnt
    });

    // Add selection bar with search field
    $(document).ready(function() {
        $(".js-example-basic-single").select2({
        placeholder: 'Select an option',
        data: selections
        });
    });
}

// Assign countries to fillkey groups
function get_group_for_cc(country_code, domain, dataset, family_index) {
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

// Manage visibility of chords
function fade(opacity, svg) {
    return function(d, i) {
        svg.selectAll("path.chord")
            // check if this is not the one that is hovered over: apply opacity
            .filter(function(d) { return d.source.index != i && d.target.index != i; })
            .transition()
            .style("opacity", opacity);
    }
} 

// Apologize when no data is available 
function apologize() {

    // Remove old barchart and barchart title
    document.getElementById('barchart').innerHTML = "";
    document.getElementById('bartitle').innerHTML = "";

    // Show apology text
    var svg = d3.select('#barchart')
    svg.append("text")  
        .attr("class", "apology")
        .attr("dx", "0.8em")
        .attr("dy", "8em")
        .style("fill", '#969696')
        .text("Sorry no data available for this country")
}  

