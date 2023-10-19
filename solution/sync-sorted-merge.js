"use strict";

const { dateCompare, reorderLast } = require('../lib/log-source-utils');

// Print all entries, across all of the sources, in chronological order.

// TODO: Clarify whether LogSource props should be accessed directly.  Currently
//       reaching into the implementation of LogSource in order to avoid missing
//       the initial log message; but, this tightly couples sorted-merge to
//       LogSource implementation.  Is it okay for sorted-merge to reuse LogSource
//       data structure to save space?  Or, should initial entry be ignored and only
//       fetch logs via pop() return?

// Note: LogSource is constructed with an initial log entry that will be missed if
//       logs are read via pop().  So, using pop() to advance log, but reading
//       data directly from LogSource when printing output.
module.exports = (logSources, printer) => {
  logSources.sort(dateCompare);

  while (logSources.length) {
    printer.print(logSources[logSources.length - 1].last);

    if (logSources[logSources.length - 1].drained) {
      logSources.pop();
    } else {
      logSources[logSources.length - 1].pop();
      reorderLast(logSources);
    }
  }

  printer.done();
  return console.log("Sync sort complete.");
};
