"use strict";

const { dateCompare, reorderFirst } = require('../lib/log-source-utils');

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    logSources.sort(dateCompare);

    while (logSources.length) {
      printer.print(logSources[0].last);

      if (logSources[0].drained) {
        logSources.shift();
      } else {
        await logSources[0].popAsync();
        reorderFirst(logSources);
      }
   }

    printer.done();
    resolve(console.log("Async sort complete."));
  });
};
