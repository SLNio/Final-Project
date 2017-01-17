/**************************************************************************	

	Name: Shan Li Nio
    Studentnumber: 6222420
    Final Project in Datavisualisation
    Filename: d3_stretched_chord.js
    Description: functions to create the stretched chord diagram to show the trends
    in antibiotic resistance

    References: 

	Stretched chord diagram:
	http://www.visualcinnamon.com/2015/08/stretched-chord.html

***************************************************************************/
function draw_chord() {

	// Add chart title
	$('#chordtitle').text('Antibiotics and resistant bacteria');

	// var NameProvider = ["Apple","HTC","Huawei","LG","Nokia","Samsung","Sony","Other"];	
	// var matrix = [
	// [9.6899,0.8859,0.0554,0.443,2.5471,2.4363,0.5537,2.5471], /*Apple 19.1584*/
	// [0.1107,1.8272,0,0.4983,1.1074,1.052,0.2215,0.4983], /*HTC 5.3154*/
	// [0.0554,0.2769,0.2215,0.2215,0.3876,0.8306,0.0554,0.3322], /*Huawei 2.3811*/
	// [0.0554,0.1107,0.0554,1.2182,1.1628,0.6645,0.4983,1.052], /*LG 4.8173*/
	// [0.2215,0.443,0,0.2769,10.4097,1.2182,0.4983,2.8239], /*Nokia 15.8915*/
	// [1.1628,2.6024,0,1.3843,8.7486,16.8328,1.7165,5.5925], /*Samsung 38.0399*/
	// [0.0554,0.4983,0,0.3322,0.443,0.8859,1.7719,0.443], /*Sony 4.4297*/
	// [0.2215,0.7198,0,0.3322,1.6611,1.495,0.1107,5.4264] /*Other 9.9667*/
	// ];
	// /*Sums up to exactly 100*/

	// var colors = ["#C4C4C4","#69B40F","#EC1D25","#C8125C","#008FC8","#10218B","#134B24","#737373"],
	// 	opacityValueBase = 0.8;

	var element = ["P. aeruginosa", "S. pneumoniae", "E. coli", "Penicillins", "Fluorquinolones", "Macrolides"];
	
	var matrix = [
	[0, 0, 0, 0, 27, 0], /*P. aeruginosa*/
    [0, 0, 0, 0, 0, 41], /*S. pneumoniae */
	[0, 0, 0, 45, 33, 0], /*E. coli*/
	[0, 0, 45, 0, 0, 0], /*Penicillins*/
	[27, 0, 33, 0, 0, 0], /*Fluorquinolones*/
	[0, 41, 0, 0, 0, 0], /*Macrolides*/
	];

	var colors = ["#C4C4C4","#69B40F","#EC1D25","#C8125C","#008FC8","#10218B"],
		opacityValueBase = 0.8;

	/*Initiate the color scale*/
	var fill = d3.scale.ordinal()
	    .domain(d3.range(element.length))
	    .range(colors);

	var margin = {top: 20, right: 25, bottom: 20, left: 25},
		width = 480 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom,
	    innerRadius = Math.min(width, height) * .39,
	    outerRadius = innerRadius * 1.04;

	/*Initiate the SVG*/
	var svg = d3.select("#chord_diagram").append("svg:svg")
		.attr("class", "diagram")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
		.append("svg:g")
	    .attr("transform", "translate(" + (margin.left + width / 2) + "," + (margin.top + height / 2) + ")");
	
	var chord = d3.layout.chord()
	    .padding(.04)
	    .sortSubgroups(d3.descending) /*sort the chords inside an arc from high to low*/
	    .sortChords(d3.descending) /*which chord should be shown on top when chords cross. Now the biggest chord is at the bottom*/
		.matrix(matrix);

	var arc = d3.svg.arc()
	    .innerRadius(innerRadius)
	    .outerRadius(outerRadius);
	
	var g = svg.selectAll("g.group")
		.data(chord.groups)
		.enter().append("svg:g")
		.attr("class", function(d) {return "group " + element[d.index];});
		
	g.append("svg:path")
		  .attr("class", "arc")
		  .style("stroke", function(d) { return fill(d.index); })
		  .style("fill", function(d) { return fill(d.index); })
		  .attr("d", arc)
		  .style("opacity", 0)
		  .transition().duration(1000)
		  .style("opacity", 0.4);

	var ticks = svg.selectAll("g.group").append("svg:g")
		.attr("class", function(d) {return "ticks " + element[d.index];})
		.selectAll("g.ticks")
		.attr("class", "ticks")
	    .data(	function groupTicks(d) {
			var k = (d.endAngle - d.startAngle) / d.value;
			return d3.range(0, d.value, 1).map(function(v, i) {
		    	return {
		      		angle: v * k + d.startAngle,
		      		label: i % 5 ? null : v + "%"
		    	};
		  	});
		})
		.enter().append("svg:g")
	    .attr("transform", function(d) {
	      return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
	          + "translate(" + outerRadius+40 + ",0)";
	    });

	/*Append the tick around the arcs*/
	ticks.append("svg:line")
		.attr("x1", 1)
		.attr("y1", 0)
		.attr("x2", 5)
		.attr("y2", 0)
		.attr("class", "ticks")
		.style("stroke", "#FFF");
		
	/*Add the labels for the %'s*/
	ticks.append("svg:text")
		.attr("x", 8)
		.attr("dy", ".35em")
		.attr("class", "tickLabels")
		.attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
		.style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
		.text(function(d) { return d.label; })
		.attr('opacity', 0);

	g.append("svg:text")
	    .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
	    .attr("dy", ".35em")
	    .attr("class", "titles")
	    .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
	    .attr("transform", function(d) {
			return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
			+ "translate(" + (innerRadius + 55) + ")"
			+ (d.angle > Math.PI ? "rotate(180)" : "");
	    })
	    .attr('opacity', 0)
	    .text(function(d,i) { return element[i]; }); 

	// Initiate inner chords
	var chords = svg.selectAll("path.chord")
		.data(chord.chords)
		.enter().append("svg:path")
		.attr("class", "chord")
		.style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(); })
		.style("fill", function(d) { return fill(d.source.index); })
		.attr("d", d3.svg.chord().radius(innerRadius))
		.attr('opacity', 0); 

	svg.selectAll("g.group").select("path")
			.transition().duration(1000)
			.style("opacity", 1);
	
	/*Make mouse over and out possible*/
	d3.selectAll(".group")
		.on("mouseover", fade(.02))
		.on("mouseout", fade(.80));
		
	/*Show all chords*/
	chords.transition().duration(1000)
		.style("opacity", opacityValueBase);

	/*Show all the text*/
	d3.selectAll("g.group").selectAll("line")
		.transition().duration(100)
		.style("stroke","#000");
	/*Same for the %'s*/
	svg.selectAll("g.group")
		.transition().duration(100)
		.selectAll(".tickLabels").style("opacity",1);
	/*And the Names of each Arc*/	
	svg.selectAll("g.group")
		.transition().duration(100)
		.selectAll(".titles").style("opacity",1);	

	function fade(opacity) {
		return function(d, i) {
	    	svg.selectAll("path.chord")
		        .filter(function(d) { return d.source.index != i && d.target.index != i; })
				.transition()
		        .style("stroke-opacity", opacity)
		        .style("fill-opacity", opacity);
	  	};
	};		

}