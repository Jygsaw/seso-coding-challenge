const { dateCompare, reorderFirst } = require('../lib/log-source-utils');
const { logSourceA, logSourceB, logSourceC } = require('../__fixtures__/log-source');

describe("dateCompare Behaviors", () => {
  test("It should order log sources chronologically increasing", () => {
    const logSources = [logSourceA, logSourceB];

    expect(logSources[0].last.msg).toBe(logSourceA.last.msg);
    expect(logSources[1].last.msg).toBe(logSourceB.last.msg);

    logSources.sort(dateCompare);

    expect(logSources[0].last.msg).toBe(logSourceB.last.msg);
    expect(logSources[1].last.msg).toBe(logSourceA.last.msg);
  });
});

describe("reorderFirst Behaviors", () => {
  test("It should sort the log source array", () => {
    const logSources = [logSourceA, logSourceB, logSourceC];

    expect(logSources[0].last.msg).toBe(logSourceA.last.msg);
    expect(logSources[1].last.msg).toBe(logSourceB.last.msg);
    expect(logSources[2].last.msg).toBe(logSourceC.last.msg);

    reorderFirst(logSources);

    expect(logSources[0].last.msg).toBe(logSourceB.last.msg);
    expect(logSources[1].last.msg).toBe(logSourceA.last.msg);
    expect(logSources[2].last.msg).toBe(logSourceC.last.msg);
  });

  test("It should mutate the original array", () => {
    const logSources = [logSourceA, logSourceB];

    expect(logSources).toBe(logSources);
    expect(logSources).toEqual([logSourceA, logSourceB]);

    reorderFirst(logSources);

    expect(logSources).toBe(logSources);
    expect(logSources).toEqual([logSourceB, logSourceA]);
  });
});
