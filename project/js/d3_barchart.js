/**************************************************************************	

	Name: Shan Li Nio
    Studentnumber: 6222420
    Final Project in Datavisualisation
    Filename: d3_barchart.js
    Description: functions to create the bar chart for the final project

    References: 

    Barchart:
    https://bost.ocks.org/mike/bar/3/
   	
	Tooltip:
	http://bl.ocks.org/Caged/6476579

***************************************************************************/

// Make the updateBarchart function accesible for other files
var updateBarchart;

// Draw barchart 
function drawBarchart(country, code, family) {

	// Remove apology text
    document.getElementById('barchart').innerHTML = '';

	// Change title of bargraph dynamically
	$('#bartitle').text('Antibiotic consumption in ' + country + '');

	// Define dimensions
	var width = 360,
	    height = 300,
		margin = {top: 10, left: 50},
		x = d3.scale.ordinal().rangeRoundBands([0, width -40], .1),
		y = d3.scale.linear().range([height, 0]);

	// Define axes
    var xAxis = d3.svg.axis()
    	.scale(x)
    	.orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	// Define svg element
	var svg = d3.select('#barchart')
	    .attr('width', width)
	    .attr('height', height)
	  .append('g')
    	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Define tooltip
	var tip = d3.tip()
  		.attr('class', 'd3-tip')
  		.attr('transform', 'rotate(-45)')
  		.offset([-10, 0])
  		.html(function(d) {
    		return "<strong>Consumption</strong><span>: </span><span \
    			style='color:red'>" + d.value + "</span>"
  		})
  	svg.call(tip);

    // Load dataset with d3
	d3.json('scripts/europe_data.json', function (error, data) {
		if (error) throw error;

		// Prepare dataset for selected country
		var dataset = generateBarchartData(data),
			countrydata = dataset[code];

		// scale the range of the data
		x.domain(countrydata.map(function(d) { return d.family; }));
  		y.domain([0, d3.max(countrydata, function(d) { return d.value; })]);

  		// Draw X-axis
		svg.append('g')
		    .attr('class', 'x axis')
		    .attr('transform', 'translate(0,' + height + ')')
		    .call(xAxis)
		  .selectAll('text')
	        .style('text-anchor', 'end')
	        .attr('dx', '-0.2em')
	        .attr('dy', '0.65em')
	        .attr('transform', 'rotate(-45)');

	    // Draw Y-axis
		svg.append('g')
		    .attr('class', 'y axis')
		    .attr('id', 'y')
		    .call(yAxis)
		  .append('text')
		    .attr('transform', 'rotate(-90)')
	        .attr('y', 5)
	        .attr('dx', '-2.6em')
	        .attr('dy', '-3.5em')
	        .style('text-anchor', 'end')
	        .text('Consumption (Defined Daily Dose)');

	    // Draw bars
		svg.selectAll('.bar')
		    .data(countrydata)
		  .enter().append('rect')
		    .attr('class', 'bar')
		    .attr('x', function(d) { return x(d.family); })
		    .attr('y', function(d) { return y(d.value); })
		    .attr('height', function(d) { return height - y(d.value); })
		    .attr('width', 55)
		    .style('fill', function(d, i) { return d.family == family ? 
		    	'#02818a' : '#7ED0C4'; })
		    .on('mouseover', tip.show)
      		.on('mouseout', tip.hide);
    })

	// Update barchart for selected country
    updateBarchart = function(country, code, family) {

	    var updatebar = svg.selectAll('.bar');
	 
	    // Change title of bargraph dynamically
		$('#bartitle').text('Antibiotic consumption in ' + country + '');

	    // Load dataset with d3
	    d3.json('scripts/europe_data.json', function (error, data) {
	        if (error) throw error;

	        // Prepare new dataset for selected country
	        var dataset = generateBarchartData(data),
	        	newdata = dataset[code];

	        y.domain([0, d3.max(newdata, function(d) { return d.value; })]);
	 
	 		// Update bars with smooth transition
	        updatebar.data(newdata)
	            .transition().delay(function (d,i){ return i * 300;})
	            .duration(1000)
	            .attr('y', function(d) {return y(d.value); })	            
	            .attr('height', function(d) { return height - y(d.value); })
	            .style('fill', function(d, i) { return d.family == family ? 
	            	'#02818a' : '#7ED0C4'; });

	        // Update Y-axis with smooth transition
	        svg.select('#y')
	            .transition().duration(1000)
	            .call(yAxis);
	    })
	}
}
