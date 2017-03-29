## Cat Herder

### Background

Cat herder is a game where one attempts to do the impossible: herd cats.

The user is an owner who has many cats who do not want to come home.
The game is spent calling out to the cats and having them run away.

The player can move around the screen, a yard, in x+y, and call the cats, which
causes them to run away. The goal it to herd them in to a house or a
cat corral.

### Functionality & MVP  

Game dynamics:

- [ ] The user will move around the world in x+y
- [ ] The user will call the kitties
- [ ] The cats will run away from the user

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production Readme

### Wireframes

This app will consist of a single screen with game world, with
buttons for a tutorial, high scores, and links to my Github, my LinkedIn,
and the About modal.

![wireframes](images/cat_herder.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and for overall structure and game logic,
- `p5.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`cat_herder.js`: this script will handle the high level game logic.

`shapes.js`: this will be the library of primitives used in the game

`actors.js`: the cat and player classes

`level.js`: this will instantiate a level object using primitives read
from a file.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `p5.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `p5.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `p5.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the graphics API.  First, build out the primitives objects to connect to make some level files.  Then, use level.js to create and a level at different z heights.  Goals for the day:

- Make a player primitive
- Make rectangle wall primitives
- Make circle primitives
- Make a cat primitive
- Render a square grid to the `Canvas` using `p5.js`

**Day 3**: Create the cat flocking/herding logic.  Build out the game class.  Goals for the day:

- Make a herd of cats
- Have them run away from a mouse click or the person
- Seed the level with cats that that respond to input
- Object avoidance/detection

**Day 4**: Finish building the game class. Style the frontend, making it polished and professional.  Goals for the day:

- Build other levels
- Style the images for the game and the game page

### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Catnip
- [ ] Lasers
- [ ] Put a cat in your purse
- [ ] Have the cats attack the person
