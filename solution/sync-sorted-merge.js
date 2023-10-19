"use strict";

const { buildMinHeap, minHeapify, removeMinHeapNode } = require('../lib/log-source-utils');

// Print all entries, across all of the sources, in chronological order.

// Note: LogSource is constructed with an initial log entry that will be missed if
//       logs are read via pop().  So, using pop() to advance log, but reading
//       data directly from LogSource when printing output.
module.exports = (logSources, printer) => {
  buildMinHeap(logSources);

  while (logSources.length) {
    printer.print(logSources[0].last);

    if (logSources[0].drained) {
      removeMinHeapNode(logSources, 0);
    } else {
      logSources[0].pop();
      minHeapify(logSources, 0);
    }
  }

  printer.done();
  return console.log("Sync sort complete.");
};
