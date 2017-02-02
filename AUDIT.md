Better Code Hub Analysis
==================

###Shan Li Nio, 6222420

![BCH](https://github.com/SLNio/Final-Project/blob/master/doc/BCH.PNG)

Besides automating tests, the points that need improvement include:

- Write simple units of code
- Keep unit interfaces small
- Keep architecture components balanced

For the first two points the amount of code per function and the number of branch points need to be reduced in certain functions.
In order to solve these issues, I will first check if I could replace duplicate code for one general helpers function. Although I think there are definitely some sections that can be improved other sections of code are impossible to reduce in amount, since D3 simply requires a lot of code for all different components, such as axes, tooltips, bars, legendas etc. 

The same counts for reducing the number of branch points. I will look into replacing some if/else statements, but some of my visualisations require multiple conditions to be activated or not. 