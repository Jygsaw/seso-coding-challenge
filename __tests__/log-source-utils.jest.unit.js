const { dateCompare, buildMinHeap, minHeapify, removeMinHeapNode } = require('../lib/log-source-utils');
const {
  logSourceA, logSourceB, logSourceC, logSourceD, logSourceE, logSourceF, logSourceG,
} = require('../__fixtures__/log-source');

describe("dateCompare Behaviors", () => {
  test("It should order log sources chronologically increasing", () => {
    const logSources = [logSourceB, logSourceA];

    expect(logSources[0].last.msg).toBe(logSourceB.last.msg);
    expect(logSources[1].last.msg).toBe(logSourceA.last.msg);

    logSources.sort(dateCompare);

    expect(logSources[0].last.msg).toBe(logSourceA.last.msg);
    expect(logSources[1].last.msg).toBe(logSourceB.last.msg);
  });
});

describe("buildMinHeap Behaviors", () => {
  test("It should heapify the given log sources", () => {
    const logSources = [
      logSourceD,
      logSourceB,
      logSourceF,
      logSourceG,
      logSourceA,
      logSourceE,
      logSourceC,
    ];

    expect(logSources[0].last.msg).toBe(logSourceD.last.msg);

    buildMinHeap(logSources);

    expect(logSources[0].last.msg).toBe(logSourceA.last.msg);
  });

  test("It should mutate the original array", () => {
    const logSources = [logSourceB, logSourceA, logSourceC];

    expect(logSources).toBe(logSources);
    expect(logSources[0].last.msg).toBe(logSourceB.last.msg);

    buildMinHeap(logSources);

    expect(logSources).toBe(logSources);
    expect(logSources[0].last.msg).toBe(logSourceA.last.msg);
  });
});

describe("minHeapify Behaviors", () => {
  test("It should min heapify the given subtree root", () => {
    const logSources = [
      logSourceD,
      logSourceB,
      logSourceF,
      logSourceG,
      logSourceA,
      logSourceE,
      logSourceC,
    ];

    expect(logSources[0].last.msg).toBe(logSourceD.last.msg);
    expect(logSources[2].last.msg).toBe(logSourceF.last.msg);

    minHeapify(logSources, 2);

    expect(logSources[0].last.msg).toBe(logSourceD.last.msg);
    expect(logSources[2].last.msg).toBe(logSourceC.last.msg);
  });

  test("It should mutate the original array", () => {
    const logSources = [logSourceB, logSourceA, logSourceC];

    expect(logSources).toBe(logSources);
    expect(logSources[0].last.msg).toBe(logSourceB.last.msg);

    minHeapify(logSources, 0);

    expect(logSources).toBe(logSources);
    expect(logSources[0].last.msg).toBe(logSourceA.last.msg);
  });
});

describe("removeMinHeapNode Behaviors", () => {
  test("It should remove the specified node from log sources min heap", () => {
    const logSources = [
      logSourceA,
      logSourceB,
      logSourceC,
      logSourceD,
      logSourceE,
      logSourceF,
      logSourceG,
    ];

    expect(logSources.length).toBe(7);
    expect(logSources[1].last.msg).toBe(logSourceB.last.msg);

    removeMinHeapNode(logSources, 1);

    expect(logSources.length).toBe(6);
    expect(logSources[1].last.msg).toBe(logSourceD.last.msg);
    expect(logSources[3].last.msg).toBe(logSourceG.last.msg);
  });

  test("It should mutate the original array", () => {
    const logSources = [logSourceA, logSourceB, logSourceC];

    expect(logSources).toBe(logSources);
    expect(logSources[0].last.msg).toBe(logSourceA.last.msg);

    removeMinHeapNode(logSources, 0);

    expect(logSources).toBe(logSources);
    expect(logSources[0].last.msg).toBe(logSourceB.last.msg);
  });
});