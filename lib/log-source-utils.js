"use strict";

const dateCompare = (a, b) => b.last.date.getTime() - a.last.date.getTime();

// note: reorderLast assumes the LogSource array (0, n - 1) is ordered chronologically
const reorderLast = (ordered) => {
  nativeReorder(ordered);
};

// Interview note: After testing manual insertion of newly fetched logs in
//       the simulated data, native sort() provided the best performance.  This
//       is probably because native sort() is highly optimized and the data is
//       mostly sorted with new log timestamps belonging near the end of the
//       ordered LogSources.  However, if expected log time differences for newly
//       fetched entries are large enough to require insertion across the ordered
//       LogSources, binary search might be the safest option.
// 1000 sync log sources = 1146 logs/s
// 100 sync log sources = 1182 logs/s
//                      = 1176 logs/s
const nativeReorder = (ordered) => {
  ordered.sort(dateCompare);
};

// note: sequential search could be faster if the expected time between logs
//       within the same LogSource is small and the expected time between LogSources
//       is big
// 1000 sync log sources = 1162 logs/s
// 100 sync log sources = 1178 logs/s
//                      = 1193 logs/s
const sequentialReorder = (ordered) => {
  const last = ordered.pop();

  let i = ordered.length - 1;
  while (i >= 0) {
    if (ordered[i].last.date.getTime() > last.last.date.getTime()) {
      break;
    }
    i--;
  }

  ordered.splice(i + 1, 0, last);
};

// note: binary search could be faster if the expected time between logs
//       within the same LogSource is big and the expected time between LogSources
//       is small
// 1000 sync log sources = 1162 logs/s
// 100 sync log sources = 1181 logs/s
//                      = 1174 logs/s
const binaryReorder = (ordered) => {
  const last = ordered.pop();

  let left = 0;
  let right = ordered.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (ordered[mid].last.date.getTime() > last.last.date.getTime()) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  ordered.splice(left, 0, last);
};

module.exports = {
  dateCompare,
  reorderLast,
};