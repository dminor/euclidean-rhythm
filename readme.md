Euclidean Rhythms
-----------------

I recently ran across the paper
"[The Euclidean Algorithm Generates Traditional Musical Rhythms"](http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf)
by Godfried Toussaint. The basic idea is to distribute beats and rests as
evenly as possible in a measure to create a rhythm. The algorithm has
similarities to the Euclidean algorithm, but was originally developed by
E. Bjorklund
"[The Theory of Rep-Rate Pattern Generation in the SNS Timing System"](https://ics-web.sns.ornl.gov/timing/Rep-Rate%20Tech%20Note.pdf)
for timing pulses in a neutron accelerator.

Neither paper is new, and there are already many implementations, but creating
my own seemed like a good excuse to dig into Web Audio. My implementation is
based on the example provided in the Toussaint paper.

The heart of the algorithm is repeatedly inserting the remaining components
into the pattern. Initially the pattern is all rests and the remainder is
all pulses. If the remainder becomes empty, it is set to any portion of
the pattern which was not modified on the previous iteration.

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

This implementation can create nested arrays. These are flattened prior
to returning the generated pattern.

The *clave* sound I used was taken from [freesound](http://www.freesound.org/people/Sajmund/sounds/132417/).
