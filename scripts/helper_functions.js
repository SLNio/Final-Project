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

    // Remove old antibiotics selection from bar
    document.getElementById('select').innerHTML = "";

    make_children(selections, "Bacteria", bacteria)
    make_children(selections, "Antibiotics", antibiotics)

    // Add selection bar with search field
    $(document).ready(function() {
        $(".js-example-basic-single").select2({
        placeholder: 'Select an option',
        allowClear: true,
        data: selections
        });
    });
}

function make_children(selections, name, data) {
    var children = [];

    // Create objects for all options
    for (var i = 0; i < data.length ; i++) {
            
        var options = {};
        options['id'] = data[i]
        options['text'] = data[i]
        children.push(options)
    }

    // Create objects for outgroups
    selections.push({
        text : name,
        children: children
    });
}

function getIndex(element, option) {
    for (var i = 0; i < element.length; i++) {
        if (element[i] == option){
            return i;
        }
    }
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

// Manage visibility of chords
function fade(svg, reset, opacityDefault, selected, opacityLow) {
    
    // Reset all selections
    svg.selectAll("path.chord")
        // check if this is not the one that is hovered over: apply opacity
        .filter(function(d) { return d.source.index !== reset && d.target.index !== reset; })
        .transition()
        .style("opacity", opacityDefault);    

    // Fade all chords that are not selected
    svg.selectAll("path.chord")
        // check if this is not the one that is hovered over: apply opacity
        .filter(function(d) { return d.source.index !== selected && d.target.index !== selected; })
        .transition()
        .style("opacity", opacityLow);   
} 
