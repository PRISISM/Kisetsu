# Kisetsu
## Project Details
Kisetsu is is a web app that allows users to follow the current anime season and vote after each episode airs on how much they enjoyed it. 
Users can then view the rankings which are calculated using a weighted average and smoothing algorithm applied over it. 

This was created as I discovered that people in the community would commonly debate over what is the best show during the airing season,
so this would allow for an easy and interesting way to show what is trending. 

This is still very much in development and I am looking at adding more features such as more build automation and Socket.io integration
for live votes. 

The following technologies/tools were used for developing *Kisetsu*:
* Node.js
* Express.js
* MongoDB/Mongoose
* Twitter Bootstrap
* js-cookie
* Pug
* JQuery 
* Sweet Alert 2
* AniList API

### Lessons Learned
This was my second project using the MEAN stack, this time following a rapid application development philosophy. I took inspiration from
Simon Holmes' book *Getting MEAN* and followed best practices as much as possible. This invovled planning the screens, drafting the application
architecture, and breaking development into stages.

I learned a lot from this project and am excited to continue working on. These are some of the points which I am taking away.
* Drafting a wireframe and developing a static site first makes it much easier to connect the front-end and back-end. 
* Folder structure is very important and I am happy I followed Angular best practices in dividing by function, not type. 
* Learning how to make proper queries on MongoDB side is useful so sorting doesn't have to be done with the raw JSON object that is returned.

