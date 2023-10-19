const { dateCompare, reorderLast } = require('../lib/log-source-utils');
const { logSourceA, logSourceB, logSourceC, logSourceD } = require('../__fixtures__/log-source');

describe("dateCompare Behaviors", () => {
  test("It should order log sources chronologically decreasing", () => {
    const logSources = [logSourceA, logSourceB];

    expect(logSources[0].last.msg).toBe(logSourceA.last.msg);
    expect(logSources[1].last.msg).toBe(logSourceB.last.msg);

    logSources.sort(dateCompare);

    expect(logSources[0].last.msg).toBe(logSourceB.last.msg);
    expect(logSources[1].last.msg).toBe(logSourceA.last.msg);
  });
});

describe("reorderLast Behaviors", () => {
  test("It should sort the log source array", () => {
    const logSources = [logSourceD, logSourceB, logSourceA, logSourceC];

    expect(logSources[0].last.msg).toBe(logSourceD.last.msg);
    expect(logSources[1].last.msg).toBe(logSourceB.last.msg);
    expect(logSources[2].last.msg).toBe(logSourceA.last.msg);
    expect(logSources[3].last.msg).toBe(logSourceC.last.msg);

    reorderLast(logSources);

    expect(logSources[0].last.msg).toBe(logSourceD.last.msg);
    expect(logSources[1].last.msg).toBe(logSourceC.last.msg);
    expect(logSources[2].last.msg).toBe(logSourceB.last.msg);
    expect(logSources[3].last.msg).toBe(logSourceA.last.msg);
  });

  test("It should mutate the original array", () => {
    const logSources = [logSourceA, logSourceB];

    expect(logSources).toBe(logSources);
    expect(logSources).toEqual([logSourceA, logSourceB]);

    reorderLast(logSources);

    expect(logSources).toBe(logSources);
    expect(logSources).toEqual([logSourceB, logSourceA]);
  });
});
