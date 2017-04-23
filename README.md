## Cat Herder

[Cat Herder live][live_site]

[live_site]: https://spacether.github.io/cat_herder/

Cat herder is a game where one attempts to do the impossible: herd cats.

As the player, you must herd you escaped cats into a cat corral, shown in brown.
When you call the cats they run away from you.
So you move around the level, calling to the cats, and they run away from you, running towards the corral.

Cat Herder is a personal project by Justin Black.

!["Cat Herder play screen"][play_screen]

## Game Features

- Cats bounce off walls
- Cats stop moving when they get to their corral in the top left
- Game increases in hardness when re-playing (number of cats double)
- Game can be paused and audio settings can be changed

## Project Design

Cat Herder was designed and built in Javascript with help from the p5 library
The following are Cat Herder's technical features:

- Designed in vanilla javascript with OOP classes
- Graphics displayed with the p5 library via HTML5 canvas
- Rudimentary hit detection through the p5 collision library
- Custom vector class created for normal vector calculation and rebounding

### Key Challenges

- Hit detection offered by p5 was very rudimentary
  - Collision only reported for line-line intersection
  - Shapes do not report which line is hitting another line
  - No reporting of normal vectors
  - SOLUTION: write my own vector class to bridge the gaps
- Coordinate system of canvas is modified cartesian
  - SOLUTION: work in the modified coordinate system, clockwise = positive
- Plotting png images in p5 is not working
  - SOLUTION: keep using the primitive shapes, sadly

[play_screen]: ./docs/images/cat_herder_playscreen.png "Cat Herder play screen"

![Justin Analytics](https://ga-beacon.appspot.com/UA-97855011-1/cat_herder?pixel)
