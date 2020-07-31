/* 

Compiling the modules into bundle handled by rollup
to compile:
  rollup main.js --file bundle.js --format umd --name "myBundle"
  
*/

// First, importing the required packages from d3.js and arrays from data.js
import { challengerData, regression, chronRegress } from './data.js';
import {select, 
        scaleLinear,
        scaleTime,
        axisBottom,
        axisLeft,
        extent,
        timeYear,
        now
        } from 'd3';

// The colors array will help me color datapoints based on if the sitting president's party won the next election
const clrs = ['red', 'green', 'grey'];

// svgs 1 2 and 3 represent the three svg elements I'll be working with
const svg = select('svg');
const svg2 = select('.box');
const svg3 = select('.chronology');

// This is the function that will actually draw the graphs
function render(challenger) {
  // The xVal, approval, serves as the x value in Fig 1 but the y value in Fig 2 (svg3)
  // All the other constants are also set here
  // The capitol C in a lot of the constants stands for 'chronology', the class of the third svg element
  const xVal = c => c.approval;
  const xValC = c => parseInt(c.year);
  const xLabel = 'average approval rating in the term(%)';
  const xLabelC = 'year';
  const cyear = challenger.year;
  const yVal = c => c.numChallengers;
  const yLabel = '# of opposing party primary challengers'
  const radius = 10;
  const clr = c => clrs[`${c.partyWin}`]
  const xtp = 8;
  const ytp = 7;
  const margin = { top: 50, right: 50, bottom: 60, left: 100 };
  // By subtracting margins in the width and height elements I can insert labels to my axes
  const innerWidth = +svg.attr('width') - margin.left - margin.right;
  const innerHeight = +svg.attr('height') - margin.top - margin.bottom;
  const names = c => c.names;
  const slope = parseFloat(regression.slope);
  const intercept = parseFloat(regression.intercept);
  const cSlope = parseFloat(chronRegress.slope);
  const cIntercept = parseFloat(chronRegress.intercept);
  const div = select("body").append("div").attr("class", "tooltip").style("opacity", 0);

  // These regression functions give the values for the regression lines
  function regLine(x) {
    return (parseFloat(x) * slope) + intercept;
  }

  function chronRegLine(x) {
    return (parseFloat(x) * cSlope) + cIntercept;
  }
  
  // The xScale is set to linear and ranges the width of the svg element's width
  const xScale = scaleLinear()
    .domain(extent(challenger, xVal))
    .range([0, innerWidth])
    .nice();

  // The yScale is also linear and ranges the height of the svg element's height
  const yScale = scaleLinear()
    .domain(extent(challenger, yVal))
    .range([innerHeight, 0])
    .nice();

  // By setting a 'g' element, I can automatically translate the margin left and top padding...
  // ...to all subsequent elements
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  // Here is where the actual axes are set and stylized with ticks
  const xAxis = axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(xtp);

  const yAxis = axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(ytp);

  // This call here applies the translation from the g element to the axes
  const yAxisG = g.append('g')
    .call(yAxis);

  yAxisG.selectAll('domain').remove();
  
  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);

  xAxisG.select('.domain').remove();

  // Applying the axes labels
  xAxisG.append('text').text(xLabel)
    .attr('class', 'axis-label')
    .attr('fill', 'black')
    .attr('x', innerWidth / 2)
    .attr('y', 45);

  yAxisG.append('text').text(yLabel)
    .attr('class', 'axis-label')
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    .attr('x', -innerHeight / 2)
    .attr('y', -50)
    .attr('text-anchor', 'middle');
  
  // Implementing the 'box' variable which is where the text will appear upon datapoint selection
  var box = svg2.append("g").attr("transform", 'translate(0,50)').attr('overflow', 'scroll');
  box.append('text');

  // This is where the actual data is entered; circles are placed in a relative fashion...
  // ...along the x and y axes, followed by the regression line
  g.selectAll('circle').data(challenger)
    .enter().append('circle')
    .attr('cy', c => yScale(yVal(c)))
    .attr('cx', c => xScale(xVal(c)))
    .attr('r', radius)
    .attr('fill', clr);

  g.append('line')
    .attr('x1', xScale(35))
    .attr('x2', xScale(75))
    .attr('y1', yScale(regLine(35)))
    .attr('y2', yScale(regLine(75)))
    .attr('stroke', 'black')
    .attr('stroke-width', '1px');

  // Figure title and regression stats
  g.append('text').attr('class', 'title').attr('x', innerWidth/2).attr('y', -10).attr('text-anchor', 'middle')
    .text('Approval vs # of Primary Challengers');
  
  g.append('text').attr('class', 'stats').attr('x', 10).attr('y', 110)
    .text(`r = ${regression.r}`);

  // This function makes the President's name and the year appear for a particular datapoint...
  // ...upon hovering over said datapoint
  function handleMouseOver(c) {
    svg.append("text").attr('id', "tmouseover").attr('x', c => xScale(xVal(c))).attr('y', c => yScale(yVal(c)))
    .text(`President: ${c.president}, Year: ${c.year}`);
  }
  // And then it disappears when hovering stops -> these functions are applied below
  function handleMouseOut(d, i) {
    select("#tmouseover").remove();
  }

  // This is where the interactivity comes in; when a datapoint is clicked, the box will flash with text...
  // ...that gives the President, their approval rating, the number of opposing party primary candidates...
  // ...and a list of all those that ran in the primary
  g.selectAll('circle')
    .on('click', function(challenger) {
      box.selectAll("*").remove();
      box.append('text').text(`In ${challenger.year}, President ${challenger.president} had a ${challenger.approval}% approval rating`).attr('x', +svg2.attr('width') / 2).attr('text-anchor', 'middle');
      box.append('text').text(`and the opposition party put up ${challenger.numChallengers} nominees in their primary`).attr('y', 20).attr('x', +svg2.attr('width') / 2).attr('text-anchor', 'middle');
      box.append('text').text(`Those running for the nomination were:`).attr('y', 50).attr('x', +svg2.attr('width') / 2).attr('text-anchor', 'middle');
      box.append('text').text(challenger.names.join(" | ")).attr('y', 75).attr('x', +svg2.attr('width') / 2).attr('text-anchor', 'middle').attr("class", "names")
    });

  g.selectAll('circle')
    .on('mouseover', function(challenger) {
      svg.append("text").attr('id', "tmouseover").attr('x', c => xScale(xVal(challenger))-30).attr('y', c => yScale(yVal(challenger))+80)
        .text(`${challenger.president}, ${challenger.year}`);
    })
    .on('mouseout', function() {
      select("#tmouseover").remove()
    });

  // Now, I apply the same logic as above to the second graph
  // Please refer to previous comments for an explanation
  const cxScale = scaleLinear()
    .domain(extent(challenger, xValC))
    .range([0, innerWidth])
    .nice();

  const cyScale = scaleLinear()
    .domain(extent(challenger, xVal))
    .range([innerHeight, 0])
    .nice();

  const chron = svg3.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const cxAxis = axisBottom(cxScale)
    .tickSize(-innerHeight)
    .tickPadding(xtp)
    .tickFormat(d => parseInt(d));

  const cyAxis = axisLeft(cyScale)
    .tickSize(-innerWidth)
    .tickPadding(ytp);

  const yAxisC = chron.append('g')
    .call(cyAxis);

  yAxisC.selectAll('domain').remove();
  
  const xAxisC = chron.append('g').call(cxAxis)
    .attr('transform', `translate(0,${innerHeight})`);

  xAxisC.select('.domain').remove().tickFormat;
  xAxisC.append('text').text(xLabelC)
    .attr('class', 'axis-label')
    .attr('fill', 'black')
    .attr('x', innerWidth / 2)
    .attr('y', 45);

  yAxisC.append('text').text(xLabel)
    .attr('class', 'axis-label')
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    .attr('x', -innerHeight / 2)
    .attr('y', -50)
    .attr('text-anchor', 'middle');

  chron.selectAll('circle').data(challenger)
    .enter().append('circle')
    .attr('cy', c => cyScale(xVal(c)))
    .attr('cx', c => cxScale(xValC(c)))
    .attr('r', radius)
    .attr('fill', clr);
  
  chron.append('text').attr('class', 'title').attr('x', innerWidth/2).attr('y', -10).attr('text-anchor', 'middle')
    .text('Year vs Approval');

  chron.selectAll('circle')
    .on('click', function(challenger) {
      box.selectAll("*").remove();
      box.append('text').text(`In ${challenger.year}, President ${challenger.president} had a ${challenger.approval}% approval rating`).attr('x', +svg2.attr('width') / 2).attr('text-anchor', 'middle');
      box.append('text').text(`and the opposition party put up ${challenger.numChallengers} nominees in their primary`).attr('y', 20).attr('x', +svg2.attr('width') / 2).attr('text-anchor', 'middle');
      box.append('text').text(`Those running for the nomination were:`).attr('y', 50).attr('x', +svg2.attr('width') / 2).attr('text-anchor', 'middle');
      box.append('text').text(challenger.names.join(" | ")).attr('y', 75).attr('x', +svg2.attr('width') / 2).attr('text-anchor', 'middle').attr("class", "names")
    });

  chron.append('line')
    .attr('x1', cxScale(1940))
    .attr('x2', cxScale(2020))
    .attr('y1', cyScale(chronRegLine(1940)))
    .attr('y2', cyScale(chronRegLine(2020)))
    .attr('stroke', 'black')
    .attr('stroke-width', '1px');

  chron.append('text').attr('class', 'stats').attr('x', 10).attr('y', 90)
    .text(`r = ${chronRegress.r}`);

  chron.selectAll('circle')
    .on('mouseover', function(challenger) {
      chron.append("text").attr('id', "tmouseover").attr('x', c => cxScale(xValC(challenger))-107).attr('y', c => cyScale(xVal(challenger))+30)
        .text(`${challenger.president}, ${challenger.year}`)
        .attr('background-color', 'white');
    })
    .on('mouseout', function() {
      select("#tmouseover").remove()
    });

};
// The function is rendered on the challenger data and the graphs are shown
render(challengerData);