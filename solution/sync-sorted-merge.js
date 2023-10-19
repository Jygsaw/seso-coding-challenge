"use strict";

const { dateCompare, reorderFirst } = require('../lib/log-source-utils');

// Print all entries, across all of the sources, in chronological order.

// Note: LogSource is constructed with an initial log entry that will be missed if
//       logs are read via pop().  So, using pop() to advance log, but reading
//       data directly from LogSource when printing output.
module.exports = (logSources, printer) => {
  // TODO: Clarify whether LogSource props should be accessed directly.  Currently
  //       reaching into the implementation of LogSource in order to avoid missing
  //       the initial log message; but, this tightly couples sorted-merge to
  //       LogSource implementation.  Or, should initial entry be ignored and only
  //       fetch logs via pop() return?

  logSources.sort(dateCompare);

  while (logSources.length) {
    printer.print(logSources[0].last);

    if (logSources[0].drained) {
      logSources.shift();
    } else {
      logSources[0].pop();
      reorderFirst(logSources);
    }
  }

  printer.done();
  return console.log("Sync sort complete.");
};
