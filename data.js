// First, the array with all of the challenger information
export const challengerData = [
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
]

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
    40]

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
    11]

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
    2020]

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
export const regression = linearRegression(challengers, approval);
export const chronRegress = linearRegression(approval, year);
