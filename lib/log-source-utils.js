"use strict";

const dateCompare = (a, b) => a.last.date.getTime() - b.last.date.getTime();

// TODO: refine brute force sort
// note: reorderFirst assumes the rest of LogSource array is ordered chronologically
const reorderFirst = (orderedSources) => orderedSources.sort(dateCompare);

module.exports = {
  dateCompare,
  reorderFirst,
};