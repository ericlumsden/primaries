(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('d3')) :
    typeof define === 'function' && define.amd ? define(['d3'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3));
}(this, (function (d3) { 'use strict';

    // First, the array with all of the challenger information
    const challengerData = [
        { year: 1944, president: 'Franklin D Roosevelt', term: 3, approval: 63, numChallengers: 4, challengerID: 0, partyWin: 1, names: ['Thomas Dewey', 'Douglas MacArthur', 'Harold Stassen', 'Wendell Willkie']},
        { year: 1948, president: 'Harry S Truman', term: 1, approval: 55.6, numChallengers: 7, challengerID: 1, partyWin: 0, names: ['Earl Warren', 'Thomas Dewey', 'Douglas MacArthur', 'Leverett Saltonstall', 'Harold Stassen', 'Robert Taft', 'Arthur Vandenberg']},
        { year: 1952, president: 'Harry S Truman', term: 2, approval: 36.5, numChallengers: 4, challengerID: 2, partyWin: 0, names: ['Dwight Eisenhower', 'Robert Taft', 'Earl Warren', 'Harold Stassen']},
        { year: 1956, president: 'Dwight D Eisenhower', term: 1, approval: 69.6, numChallengers: 5, challengerID: 3, partyWin: 1, names: ['Adlai Stevenson', 'Estes Kefauver', 'W Averell Harriman', 'Frank Lausche', 'John McCormack']},
        { year: 1960, president: 'Dwight D Eisenhower', term: 2, approval: 60.5, numChallengers: 3, challengerID: 4, partyWin: 0, names: ['John Kennedy', 'Hubert Humphrey', 'Wayne Morse']},
        { year: 1964, president: 'Lyndon B Johnson', term: 1, approval: 74.2, numChallengers: 6, challengerID: 5, partyWin: 1, names: ['Barry Goldwater', 'William Scranton', 'Margaret Chase Smith', 'Nelson Rockefeller', 'Henry Cabot Lodge Jr', 'Harold Stassen']},
        { year: 1968, president: 'Lyndon B Johnson', term: 2, approval: 50.3, numChallengers: 4, challengerID: 6, partyWin: 0, names: ['Richard Nixon', 'Ronald Reagan', 'George Romney', 'Nelson Rockefeller']},
        { year: 1972, president: 'Richard M Nixon', term: 1, approval: 55.8, numChallengers: 13, challengerID: 7, partyWin: 1, names: ['George McGovern', 'George Wallace', 'Hubert Humphrey', 'Shirley Chisholm', 'Terry Sanford', 'Sam Yorty', 'Wilbur Mills', 'Edmund Muskie', 'Eugene McCarthy', 'Scoop Jackson', 'John Lindsay', 'Vance Hartke', 'Patsy Mink']},
        { year: 1976, president: 'Gerald R Ford', term: 1, approval: 47.2, numChallengers: 13, challengerID: 8, partyWin: 0, names: ['Jimmy Carter', 'Jerry Brown', 'George Wallace', 'Mo Udall', 'Ellen McCormack', 'Frank Church', 'Henry Jackson', 'Sargent Shriver', 'Fred Harris', 'Milton Shapp', 'Birch Bayh', 'Lloyd Bentsen', 'Terry Sanford']},
        { year: 1980, president: 'James E Carter', term: 1, approval: 45.5, numChallengers: 11, challengerID: 9, partyWin: 0, names: ['Ronald Reagan', 'George Bush', 'John Anderson', 'Howard Baker', 'Phil Crane', 'John Connally', 'Harold Stassen', 'Bob Dole', 'Benjamin Fernandez']},
        { year: 1984, president: 'Ronald W Reagan', term: 1, approval: 50.3, numChallengers: 8, challengerID: 10, partyWin: 1, names: ['Walter Mondale', 'Gary Hart', 'Jesse Jackson', 'John Glenn', 'George McGovern', 'Reubin Askew', 'Alan Cranston', 'Ernest Hollings']},
        { year: 1988, president: 'Ronald W Reagan', term: 2, approval: 55.3, numChallengers: 11, challengerID: 11, partyWin: 1, names: ['Michael Dukakis', 'Jesse Jackson', 'Al Gore', 'Dick Gephardt', 'Paul Simon', 'Gary Hart', 'Bruce Babbitt', 'Lyndon LaRouche', 'David Duke', 'James Traficant', 'Douglas Applegate']},
        { year: 1992, president: 'George HW Bush', term: 1, approval: 60.9, numChallengers: 8, challengerID: 12, partyWin: 0, names: ['Bill Clinton', 'Paul Tsongas', 'Tom Harkin', 'Jerry Brown', 'Bob Kerrey', 'Lyndon LaRouche', 'Eugene McCarthy', 'Larry Agran']},
        { year: 1996, president: 'William J Clinton', term: 1, approval: 49.6, numChallengers: 9, challengerID: 13, partyWin: 1, names: ['Bob Dole', 'Pat Buchanan', 'Lamar Alexander', 'Bob Dornan', 'Steve Forbes', 'Phil Gramm', 'Alan Keyes', 'Richard Lugar', 'Morry Taylor']},
        { year: 2000, president: 'William J Clinton', term: 2, approval: 60.6, numChallengers: 6, challengerID: 14, partyWin: 0, names: ['George Bush', 'Alan Keyes', 'John McCain', 'Steve Forbes', 'Gary Bauer', 'Orrin Hatch']},
        { year: 2004, president: 'George W Bush', term: 1, approval: 62.2, numChallengers: 9, challengerID: 15, partyWin: 1, names: ['John Kerry', 'John Edwards', 'Howard Dean', 'Wesley Clark', 'Dennis Kucinich', 'Al Sharpton', 'Joe Lieberman', 'Dick Gephardt', 'Carol Moseley Braun']},
        { year: 2008, president: 'George W Bush', term: 2, approval: 36.5, numChallengers: 9, challengerID: 16, partyWin: 0, names: ['Barack Obama', 'Hillary Clinton', 'John Edwards', 'Bill Richardson', 'Joe Biden', 'Chris Dodd', 'Mike Gravel', 'Dennis Kucinich', 'Tom Vilsack']},
        { year: 2012, president: 'Barack H Obama', term: 1, approval: 49.1, numChallengers: 9, challengerID: 17, partyWin: 1, names: ['Mitt Romney', 'Ron Paul', 'Fred Karger', 'Newt Gingrich', 'Rick Santorum', 'Buddy Roember', 'Ric Perry', 'Jon Huntsman Jr.', 'Michele Bachmann']},
        { year: 2016, president: 'Barack H Obama', term: 2, approval: 46.7, numChallengers: 12, challengerID: 18, partyWin: 0, names: ['Donald Trump', 'Ted Cruz', 'Marco Rubio', 'John Kasich', 'Ben Carson', 'Jeb Bush', 'Rand Paul', 'Mike Huckabee', 'Carly Fiorina', 'Chris Christie', 'Jim Gilmore', 'Rick Santorum']},
        { year: 2020, president: 'Donald J Trump', term: 1, approval: 40, numChallengers: 11, challengerID: 19, partyWin: 2, names: ['Joe Biden', 'Bernie Sanders', 'Elizabeth Warren', 'Michael Bloomberg', 'Pete Buttigieg', 'Amy Klobuchar', 'Tulsi Gabbard', 'Tom Steyer', 'Deval Patrick', 'Michael Bennet', 'Andrew Yang']}
    ];

    // Then, arrays with just the data needed for linear regression calculations
    const approval = [63,
        55.6,
        36.5,
        69.6,
        60.5,
        74.2,
        50.3,
        55.8,
        47.2,
        45.5,
        50.3,
        55.3,
        60.9,
        49.6,
        60.6,
        62.2,
        36.5,
        49.1,
        46.7,
        40];

    const challengers = [4, 
        7, 
        4, 
        5, 
        3, 
        6, 
        4, 
        13,
        13,
        11,
        8, 
        11,
        8, 
        9, 
        6, 
        9, 
        9, 
        9, 
        12,
        11];

    const year = [1944,
        1948,
        1952,
        1956,
        1960,
        1964,
        1968,
        1972,
        1976,
        1980,
        1984,
        1988,
        1992,
        1996,
        2000,
        2004,
        2008,
        2012,
        2016,
        2020];

    // This is a simple least-squares fit algorithm
    function linearRegression(y, x) {
        const n = y.length;
        let sx = 0;
        let sy = 0;
        let sxy = 0;
        let sxx = 0;
        let syy = 0;
        for (let i = 0; i < n; i++) {
            sx += x[i];
            sy += y[i];
            sxy += x[i] * y[i];
            sxx += x[i] * x[i];
            syy += y[i] * y[i];
        }
        const mx = sx / n;
        const my = sy / n;
        const yy = n * syy - sy * sy;
        const xx = n * sxx - sx * sx;
        const xy = n * sxy - sx * sy;
        const slope = xy / xx;
        const intercept = my - slope * mx;
        const r = xy / Math.sqrt(xx * yy);
        const r2 = Math.pow(r,2);
        let sst = 0;
        for (let i = 0; i < n; i++) {
           sst += Math.pow((y[i] - my), 2);
        }
        const sse = sst - r2 * sst;
        const see = Math.sqrt(sse / (n - 2));
        const ssr = sst - sse;
        return {slope, intercept, r, r2, sse, ssr, sst, sy, sx, see};
    }

    // I then export the results of the linear regression analysis for plotting
    const regression = linearRegression(challengers, approval);
    const chronRegress = linearRegression(approval, year);

    /* 

    Compiling the modules into bundle handled by rollup
    to compile:
      rollup main.js --file bundle.js --format umd --name "myBundle"
      
    */

    // The colors array will help me color datapoints based on if the sitting president's party won the next election
    const clrs = ['red', 'green', 'grey'];

    // svgs 1 2 and 3 represent the three svg elements I'll be working with
    const svg = d3.select('svg');
    const svg2 = d3.select('.box');
    const svg3 = d3.select('.chronology');

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
      const yLabel = '# of opposing party primary challengers';
      const radius = 10;
      const clr = c => clrs[`${c.partyWin}`];
      const xtp = 8;
      const ytp = 7;
      const margin = { top: 50, right: 50, bottom: 60, left: 100 };
      // By subtracting margins in the width and height elements I can insert labels to my axes
      const innerWidth = +svg.attr('width') - margin.left - margin.right;
      const innerHeight = +svg.attr('height') - margin.top - margin.bottom;
      const slope = parseFloat(regression.slope);
      const intercept = parseFloat(regression.intercept);
      const cSlope = parseFloat(chronRegress.slope);
      const cIntercept = parseFloat(chronRegress.intercept);
      const div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

      // These regression functions give the values for the regression lines
      function regLine(x) {
        return (parseFloat(x) * slope) + intercept;
      }

      function chronRegLine(x) {
        return (parseFloat(x) * cSlope) + cIntercept;
      }
      
      // The xScale is set to linear and ranges the width of the svg element's width
      const xScale = d3.scaleLinear()
        .domain(d3.extent(challenger, xVal))
        .range([0, innerWidth])
        .nice();

      // The yScale is also linear and ranges the height of the svg element's height
      const yScale = d3.scaleLinear()
        .domain(d3.extent(challenger, yVal))
        .range([innerHeight, 0])
        .nice();

      // By setting a 'g' element, I can automatically translate the margin left and top padding...
      // ...to all subsequent elements
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
      
      // Here is where the actual axes are set and stylized with ticks
      const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(xtp);

      const yAxis = d3.axisLeft(yScale)
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

      // This is where the interactivity comes in; when a datapoint is clicked, the box will flash with text...
      // ...that gives the President, their approval rating, the number of opposing party primary candidates...
      // ...and a list of all those that ran in the primary
      g.selectAll('circle')
        .on('click', function(challenger) {
          box.selectAll("*").remove();
          box.append('text').text(`In ${challenger.year}, President ${challenger.president} had a ${challenger.approval}% approval rating`).attr('x', +svg2.attr('width') / 2).attr('text-anchor', 'middle');
          box.append('text').text(`and the opposition party put up ${challenger.numChallengers} nominees in their primary`).attr('y', 20).attr('x', +svg2.attr('width') / 2).attr('text-anchor', 'middle');
          box.append('text').text(`Those running for the nomination were:`).attr('y', 50).attr('x', +svg2.attr('width') / 2).attr('text-anchor', 'middle');
          box.append('text').text(challenger.names.join(" | ")).attr('y', 75).attr('x', +svg2.attr('width') / 2).attr('text-anchor', 'middle').attr("class", "names");
        });

      g.selectAll('circle')
        .on('mouseover', function(challenger) {
          svg.append("text").attr('id', "tmouseover").attr('x', c => xScale(xVal(challenger))-30).attr('y', c => yScale(yVal(challenger))+80)
            .text(`${challenger.president}, ${challenger.year}`);
        })
        .on('mouseout', function() {
          d3.select("#tmouseover").remove();
        });

      // Now, I apply the same logic as above to the second graph
      // Please refer to previous comments for an explanation
      const cxScale = d3.scaleLinear()
        .domain(d3.extent(challenger, xValC))
        .range([0, innerWidth])
        .nice();

      const cyScale = d3.scaleLinear()
        .domain(d3.extent(challenger, xVal))
        .range([innerHeight, 0])
        .nice();

      const chron = svg3.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const cxAxis = d3.axisBottom(cxScale)
        .tickSize(-innerHeight)
        .tickPadding(xtp)
        .tickFormat(d => parseInt(d));

      const cyAxis = d3.axisLeft(cyScale)
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
          box.append('text').text(challenger.names.join(" | ")).attr('y', 75).attr('x', +svg2.attr('width') / 2).attr('text-anchor', 'middle').attr("class", "names");
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
          d3.select("#tmouseover").remove();
        });

    }// The function is rendered on the challenger data and the graphs are shown
    render(challengerData);

})));
