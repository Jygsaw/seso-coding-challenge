"use strict";

const dateCompare = (a, b) => a.last.date.getTime() - b.last.date.getTime();

const buildMinHeap = (logSources) => {
  for (let i = Math.floor(logSources.length / 2) - 1; i >= 0; i--) {
    minHeapify(logSources, i);
  }
};

// note: The performance is about the same as sorting and inserting, so the display
//       (and future disk) I/O is probably the main bottleneck for processing the logs.
// 1000 sync log sources = 1163 logs/s
//                       = 1159 logs/s
// 100 sync log sources = 1179 logs/s
const minHeapify = (logSources, i) => {
  const left = i * 2 + 1;
  const right = i * 2 + 2;

  if (left < logSources.length && dateCompare(logSources[i], logSources[left]) > 0) {
    [logSources[i], logSources[left]] = [logSources[left], logSources[i]];
    minHeapify(logSources, left);
  }
  if (right < logSources.length && dateCompare(logSources[i], logSources[right]) > 0) {
    [logSources[i], logSources[right]] = [logSources[right], logSources[i]];
    minHeapify(logSources, right);
  }
};

const removeMinHeapNode = (logSources, i) => {
  const end = logSources.pop();
  if (i <= logSources.length - 1) {
    logSources[i] = end;
    minHeapify(logSources, i);
  }
};

module.exports = {
  dateCompare,
  buildMinHeap,
  minHeapify,
  removeMinHeapNode,
};