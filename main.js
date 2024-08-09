import kaplay from 'kaplay';

const k = kaplay({
  width: 1280,
  height: 720,
}); // Starts KAPLAY
console.log(k);

k.loadBean(); // Load a sprite

const player = k.add([
  // add() works for adding game object
  k.sprite('bean'), // Add a sprite
  k.pos(k.center()), // Set the position to the center of the screen
  k.area(), // Add a collision area to the object
  k.body(), // Add physics to the object
  k.offscreen(), //Add the behavior of object when it goes out of view.
]);

k.setGravity(1800); // Set the gravity acceleration (pixels per second)

k.add([
  // add() a platform to hold the player
  k.rect(width(), 50),
  k.outline(3),
  k.area(),
  k.pos(0, height() - 50), // Bottom of the screen
  k.body({ isStatic: true }), // Static body, it won't move
]);

let counter = 0;

// Add text with counter
const counterUI = k.add([k.text('0')]);

player.onKeyPress(['up', 'space'], () => {
  // when space key is pressed
  if (player.isGrounded()) {
    // only if it's grounded
    player.jump(); // jump, given from the body() component

    counterUI.text = counter;
  }
});

// Register an event that runs when object goes out of view.
player.onExitScreen(() => {
  k.go('gameover');
});

// Define a scene of game over
k.scene('gameover', () => {
  k.add([k.text('Game Over'), k.pos(k.center())]);
});

// Run the callback every n seconds.
k.loop(1, () => {
  const speed = [300, 500, 800, 1000];
  const currentSpeed = speed[Math.floor(Math.random() * speed.length)];
  add([
    k.rect(50, 50),
    k.pos(1280, 620),
    k.area(),
    k.outline(3),
    k.body(),
    k.move(k.vec2(-1, 0), currentSpeed),
  ]);
  counter++;
});
