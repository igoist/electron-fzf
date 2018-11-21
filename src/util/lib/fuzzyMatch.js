const fuzzyMatches = (fuzzy, text) => {
  fuzzy = fuzzy.toLowerCase();
  text = text.toLowerCase();

  let tp = 0; // text position / pointer
  let matches = [];

  // match algorithm 匹配算法，之后再改
  for (let i = 0; i < fuzzy.length; i++) {
    const f = fuzzy[i];

    for (; tp < text.length; tp++) {
      const t = text[tp];
      if (f === t) {
        matches.push(tp);
        tp++;
        break;
      }
    }
  }

  return matches;
};

const fuzzyList = (fuzzy, list) => {
  const results = [];

  for (let i = 0; i < list.length; i++) {
    const originalIndex = i;
    const item = list[i].title; // here !!
    
    const matches = fuzzyMatches(fuzzy, item);

    if (matches.length === fuzzy.length) {
      let t = item;

      for (let i = 0; i < matches.length; i++) {
        const index = matches[matches.length - (i + 1)];

        // high light the matched result
        // const c = clcFgMatchYellow(t[index]);
        // const c = clcBgYellow(clcFgMatchBlack(t[index]));
        const c = t[index];
        t = t.slice(0, index) + '<span class="em">' + c + '</span>' + t.slice(index + 1);
      }

      results.push({
        originalIndex,
        original: item,
        colored: t
      })
    }
  }

  // sorts in-place
  results.sort((a, b) => {
    if (a.original < b.original) return -1;
    return 1;
  });

  return results;
};

export {
  fuzzyMatches,
  fuzzyList
}