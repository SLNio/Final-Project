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

    makeChildren(selections, "Bacteria", bacteria)
    makeChildren(selections, "Antibiotics", antibiotics)

    // Add selection bar with search field
    $(document).ready(function() {
        $(".js-example-basic-single").select2({
        placeholder: 'Select an option',
        allowClear: true,
        data: selections
        });
    });
}

// Create data-objects for selection bar
function makeChildren(selections, name, data) {
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

// Index of the selected option
function getIndex(element, option) {
    for (var i = 0; i < element.length; i++) {
        if (element[i] == option){
            return i;
        }
    }
}

// Smooth automatic scroll function
function automaticScroll(element){
    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, 1000);
}

function showInfo(){

}

// Assign countries to fillkey groups
function getCountryGroup(country_code, domain, dataset, familyIndex) {
    var total = dataset[country_code];
    for (var i = 0; i < domain.length; i++){
        if (total != undefined){
            if (total[familyIndex] < domain[i]) {
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

// Manage visibility of chords when hovered over arcs or selected from bar
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
        .filter(function(d) { return d.source.index !== selected && d.target.index !== selected })
        .transition()
        .style("opacity", opacityLow);   
} 

// Manage visibility of chords when hovered over chords
function select(svg, reset, opacityDefault, source, target, opacityLow) {
    
    // Reset all selections
    svg.selectAll("path.chord")
        // check if this is not the one that is hovered over: apply opacity
        .filter(function(d) { return d.source.index !== reset || d.target.index !== reset;})
        .transition()
        .style("opacity", opacityDefault);    

    // Fade all chords that are not selected
    svg.selectAll("path.chord")
        // check if this is not the one that is hovered over: apply opacity
        .filter(function(d) { return d.source.index !== source || d.target.index !== target;})
        .transition()
        .style("opacity", opacityLow);   
} 

function chordTooltip(svg, element) {
    var chords = svg.selectAll("path.chord")
    
    chords.append("title")
    .html(function(d) {
        return Math.round(d.source.value) + "% resistance to " + 
            element[d.target.index]; 
    }); 
}

function generateBarchartData(data) {

    var dataset = {}

    data.forEach(function(d){

        // convert string data into integer data
        Macrolides = +d.Macrolides,
        Tetracyclines = +d.Tetracyclines,
        Cephalosporins = +d.Cephalosporins,
        Penicillins = +d.Penicillins,
        Quinolones = +d.Quinolones

        // store values per country
        dataset[d.Code] = [
            {'family': 'Macrolides', 'value': Macrolides},
            {'family': 'Tetracyclines', 'value': Tetracyclines},
            {'family': 'Cephalosporins', 'value': Cephalosporins},
            {'family': 'Penicillins', 'value': Penicillins},
            {'family': 'Quinolones', 'value': Quinolones}
        ]
    })

    return dataset;
}


