function euclidean_rhythm(pulses, slots) {

  if (slots < pulses) {
    return [];
  }

  if (slots == pulses) {
    var pattern = []
    for (var i = 0; i < slots; i++) {
      pattern.push(1);
    }

    return pattern;
  }

  var pattern = []
  var remainder = []

  for (var i = 0; i < slots; i++) {
    if (i < pulses) {
      pattern.push(1);
    } else {
      remainder.push(0);
    }
  }

  while (true) {
    count = Math.min(pattern.length, remainder.length);
    for (var i = 0; i < count; i++) {
      pattern[i] = [pattern[i], remainder.pop()]
    }

    if (remainder.length == 0) {
      remainder = pattern.slice(i);
      if (remainder.length <= 1) {
        break;
      }

      pattern = pattern.slice(0, i);
    }
  }

  function flatten(seq) {
    var res = [];
    for (var i = 0; i < seq.length; i++) {
      if (Array.isArray(seq[i])) {
        var flattened = flatten(seq[i]);
        for (var j = 0; j < flattened.length; j++) {
          res.push(flattened[j]);
        }
      } else {
        res.push(seq[i]);
      }
    }
    return res;
  }

  return flatten(pattern);
}
