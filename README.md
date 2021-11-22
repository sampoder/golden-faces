# How Gold is Your Face?

For this year's Maths Week, I've built a web app that uses a photo to calculate a set of ratios based on measurements of the user's facial features. It then calculates the mean average of those ratios and compares them to the infamous golden ratio: `1.61803398875`.

Many have theorised that having that having a face that is close to the golden ratio will mean you have "a beautiful face". A fun fact that I learnt this Maths Week was that the Mona Lisa has a face that follows closely the golden ratio! Maybe that's why people line up for hours to view it? But ultimatly the definition of "a beautiful face" is subjective, as Grade 11 has learnt in TOK. What isn't subjective is Maths (in most cases) so I'll stick to that for now on.

To build the web app I used p5.js, a programming library focused around graphics that builds on top of JavaScript & the HTML Canvas element. The entire codebase has been open sourced at https://github.com/sampoder/goldenratio/ but here is a short snippet of my code that sets up the camera:

```javascript
cnv = createCanvas(windowWidth, windowHeight);
cnv.mouseClicked(handleMouseClicked);
cnv.parent("canvas");
capture = createCapture(VIDEO);
capture.hide();
```

If you'd like to see how golden your own face is you can use the app at https://grt.sampoder.com & compare your result with other members of the community at https://airtable.com/shri5Iq1UD1PaYppJ. 
