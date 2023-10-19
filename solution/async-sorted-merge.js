"use strict";

const { buildMinHeap, minHeapify, removeMinHeapNode } = require('../lib/log-source-utils');

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    buildMinHeap(logSources);;

    while (logSources.length) {
      printer.print(logSources[0].last);

      if (logSources[0].drained) {
        removeMinHeapNode(logSources, 0);
      } else {
        await logSources[0].popAsync();
        minHeapify(logSources, 0);
      }
   }

    printer.done();
    resolve(console.log("Async sort complete."));
  });
};
