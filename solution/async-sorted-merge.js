"use strict";

const { dateCompare, reorderLast } = require('../lib/log-source-utils');

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    logSources.sort(dateCompare);

    while (logSources.length) {
      printer.print(logSources[logSources.length - 1].last);

      if (logSources[logSources.length - 1].drained) {
        logSources.pop();
      } else {
        await logSources[logSources.length - 1].popAsync();
        reorderLast(logSources);
      }
   }

    printer.done();
    resolve(console.log("Async sort complete."));
  });
};
