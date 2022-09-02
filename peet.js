//Zachary Franczak
//2021-2022

let scene1 = {
  key: 'scene1',
  active: true,
  preload: scene1Preload,
  create: scene1Create,
  update: scene1Update
};
let scene2 = {
  key: 'scene2',
  active: false,
  preload: scene2Preload,
  create: scene2Create,
  update: scene2Update
};
let scene3 = {
  key: 'scene3',
  active: false,
  preload: scene3Preload,
  create: scene3Create,
  update: scene3Update
};
let config = {
  type: Phaser.AUTO,
  scale: {
    width: 1600,
    height: 800,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "matter",
        matter: {
            gravity: {y: 0.8},
            wireframes: false,
            
            
                        debug: false,
            debugBodyColor: 0xffffff
            
        },

  },
  scene: [scene1, scene2, scene3]
};

let game = new Phaser.Game(config);

let openingText, gameOverText, playerWonText, scoring, isOffScreen, destroy;
let scene1image;
let sound;
let box;
var score = 0;
var scoreText;
let gameStarted = false;


function scene1Preload() {

  this.load.image('title', 'titlescreen.png');

  this.load.audio('music', 'pistachio.ogg');
  this.load.audio('winsong', 'gmusicnew.ogg');
}

function scene1Create() {

  scene1image = this.add.image(800, 400, 'title');
  scene1image.scale = .5;
  sound1 = this.sound.add('music');
  sound2 = this.sound.add('winsong');
  sound1.play(
    {
      volume: 0.1,
      loop: true
    }
  );
 

  this.input.on('pointerup', scene1Transition, this);
}

function scene1Update() { }

function scene1Transition() {

  this.scene.transition(
    {
      target: 'scene2',
      duration: 2000,
      moveBelow: true,
      allowInput: false,
      onUpdate: function (progress) {
        scene1image.alpha = 1 - progress;
      }
    }
  );
}
let scene2image;
let effect2;

function scene2Preload() {
  
  this.load.audio('zap', 'gameover.ogg');
  
  console.log('scene2');
  this.load.image('slingshot', 'slingshot.png');
  this.load.image('pistachio', 'pistachio.png');
  this.load.image('wholePistachio', 'wholePistachio.png')
  this.load.image('bottle', 'whiskey.png');
  this.load.image('bottle2', 'bottle.png');
  this.load.image('paddle', 'paddle.png');
  this.load.image('bar', 'bar.png');
  this.load.image('shelf', 'shelf.png');
  

}

function scene2Create() {
  this.add.image(800, 400, 'bar');
  effect2 = this.sound.add('zap');

  
   
  openingText = this.add.text(
    1600 / 2,
    800 / 2,
    'Press SPACE to Start',
    {
      fontFamily: 'Franklin Gothic',
      fontSize: '50px',
      fill: '#fff'
    }
  );
  scoreText = this.add.text(10, 453, 'SCORE: 0 / [500]', { fontSize: '32px', fill: '#fff', fontFamily: 'Franklin Gothic' }
  );
  shiftText = this.add.text(10, 420, 'Press SHIFT To Quit', { fontSize: '32px', fill: '#fff', fontFamily: 'Franklin Gothic' }
  );

 

  openingText.setOrigin(.6);
  let slingImage = this.add.image(700, 740, 'slingshot');
        slingImage.setScale(3.2,3.2);
    let slingImage2 = this.add.image(500, 740, 'slingshot');
        slingImage2.setScale(3.2,3.2);

 howToText = this.add.text(440, 740, 'DRAG PISTACHIO DOWN AND RELEASE TO FIRE', { fontSize: '32px', fill: '#fff', fontFamily: 'Franklin Gothic' });

  squareText = this.add.text(410, 660, '| +SUPER+ |  |  NORMAL |', { fontSize: '32px', fill: '#fff', fontFamily: 'Franklin Gothic' }
  );

  
      
    
      var shelf1 = this.matter.add.image(1200, 500, 'shelf');
        shelf1.setStatic(true); 
      var shelf2 = this.matter.add.image(1450, 657,  'shelf'); 
        shelf2.setStatic(true);
      var shelf3 = this.matter.add.image(290, 300, 'shelf'); 
        shelf3.setScale(0.8, 1)
        shelf3.setStatic(true);
      var shelf4 = this.matter.add.image(1000, 250, 'shelf'); 
        shelf4.setStatic(true);
      var shelf5 = this.matter.add.image(1500, 130, 'shelf'); 
        shelf5.setStatic(true);
        shelf5.setScale(.5, 1);
      
     let ball = this.matter.add.image(700, 600, 'pistachio');
        ball.setDisplaySize(50, 50)
        ball.setCircle(20);
        ball.setDensity(1);
        
      
      let box = this.matter.add.image(500, 600, 'wholePistachio');
        box.setDisplaySize(150, 120)
        box.setCircle(30);
        box.setDensity(7);
      

      
      var bottle1 = this.matter.add.image(1500, 400, 'bottle');
     bottle1.setScale(.6, 1.5);
     bottle1.setDensity(7)
      var bottle2 = this.matter.add.image(1020, 100, 'bottle');
      bottle2.setScale(.5, .5);
      var bottle3 = this.matter.add.image(250, 100, 'bottle');
      bottle3.setScale(.6, 1.5);
      bottle3.setDensity(5);
      var bottle4 = this.matter.add.image(1200, 100, 'bottle');
      bottle4.setScale(.6, .6);
      var bottle5 = this.matter.add.image(1450, 100, 'bottle');
      bottle5.setScale(.3, .3);
      bottle5.setDensity(20);
  
      cursors = this.input.keyboard.createCursorKeys();
    
   

      let slingshot = this.matter.add.worldConstraint(ball.body, null, 0.05, {
      pointA: { x: 700, y: 600 },
    })
    let mouseConstraint = this.matter.add.pointerConstraint({
      render: { visible: false },
    })
    let firing = false
    this.matter.world.on('dragend', function (body) {
      if (body === ball.body) {
        firing = true
      }
    })
 
    this.matter.world.on(
      'afterupdate',
      function () {
        if (
          firing &&
          Math.abs(ball.body.position.x - 700) < 20 &&
          Math.abs(ball.body.position.y - 600) < 20
        ) {
          ball = this.matter.add.image(500, 600, 'pistachio');
        
        
        ball.setCircle(100);
        ball.setDensity(1);
        ball.setScale(.2, .2)

          slingshot.bodyB = ball.body
          firing = false
        }
      },
      this,
    )

 
     let slingshot2 = this.matter.add.worldConstraint(box.body, null, 0.05, {
      pointA: { x: 500, y: 600 },
    })

    let firing2 = false
    this.matter.world.on('dragend', function (body) {
      if (body === box.body) {
        firing2 = true
      }
    })
 
    this.matter.world.on(
      'afterupdate',
      function () {
        if (
          firing2 &&
          Math.abs(box.body.position.x - 500) < 20 &&
          Math.abs(box.body.position.y - 600) < 20
        ) {
          box = this.matter.add.image(500, 600, 'wholePistachio');
          box.setCircle(150);
          box.setDensity(7);
          box.setScale(.2, .2);
          slingshot2.bodyB = box.body
          firing2 = false
        }
      },
      this,
    )
  


      

 scoring = function() {
    if (bottle1.y > 700) {
   score += 10;
    scoreText.setText('SCORE: ' + score + ' / [500]');
    
    }
  
 }

 destroy = function() {
   if (bottle1.y > 800) {
     
     bottle1.setPosition(1500, 50);
     bottle1.setMass(0);
     
   }
 }
 scoring2 = function() {
    if (bottle2.y > 700) {
   score += 10;
    scoreText.setText('SCORE: ' + score+ ' / [500]');
    
    }
  
 }

 destroy2 = function() {
   if (bottle2.y > 800) {
     
     bottle2.setPosition(1500, 50);
     bottle2.setMass(0);
     
   }
 }
 scoring3 = function() {
    if (bottle3.y > 700) {
   score += 10;
    scoreText.setText('SCORE: ' + score+ ' / [500]');
    
    }
  
 }

 destroy3 = function() {
   if (bottle3.y > 800) {
     
     bottle3.setPosition(1500, 50);
     bottle3.setMass(0);
     
   }
 }
 scoring4 = function() {
    if (bottle4.y > 700) {
   score += 10;
    scoreText.setText('SCORE: ' + score+ ' / [500]');
    
    }
  
 }

 destroy4 = function() {
   if (bottle4.y > 800) {
     
     bottle4.setPosition(1500, 50);
     bottle4.setMass(0);
     
   }
 }

scoring5 = function() {
    if (bottle5.y > 700) {
   score += 25;
    scoreText.setText('SCORE: ' + score+ ' / [500]');
    
    }
  
 }

 destroy5 = function() {
   if (bottle5.y > 800) {
     
     bottle5.setPosition(1500, 100);
     bottle5.setMass(0);
     
   }
 }
 lose = function(){
    if(bottle1.mass == 0 &&
      bottle2.mass == 0 &&
      bottle3.mass == 0 &&
      bottle4.mass == 0 &&
      bottle5.mass == 0 &&
      score < 500){
        this.scene.start('scene3');
      }
  }

  // Create game over text
  gameOverText = this.add.text(
    1600/ 2,
    800 / 2,
    'You have Lost',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '50px',
      fill: '#fff'
    }
  );

  gameOverText.setOrigin(0.5);

  // Make it invisible until the player loses
  gameOverText.setVisible(false);

  // Create the game won text
  playerWonText = this.add.text(
   1600 / 2,
    800 / 2,
    'You win!  To the Moon!',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '50px',
      fill: '#fff'
    }
  );

  playerWonText.setOrigin(0.6);
  

  // Make it invisible until the player wins
  win = function(){
  if(score > 499){playerWonText.setVisible(true)}
  else{playerWonText.setVisible(false)};
  }
 
}

 


song = function() {
    if (score > 200){
      
    effect2.play(
    {
      volume: 0.8,
      loop: true
    }
  )
}

  }

function scene2Update() {
  scoring();
  scoring2();
  scoring3();
  scoring4();
  scoring5();
  destroy();
  destroy2();
  destroy3();
  destroy4();
  destroy5();
  win();
  lose();
  song();
 

 
 if (cursors.space.isDown) {

  openingText.setVisible(false);
}
  if (cursors.shift.isDown) {
    this.scene.start('scene3');
  }

 if (cursors.down.isDown) {}

}



function scene2Transition() {
  effect2.play(
    {
      volume: 0.4,
      loop: false
    }
  );
  this.scene.start('scene3');
}
let scene3image;

function scene3Preload() {
  this.load.image('end', 'gameover.png');
}

function scene3Create() {
  scene3image = this.add.image(800, 400, 'end');
  scene3image.setScale(1.2)
  sound1.pause();
  this.input.on('pointerup', scene3Transition, this);
  score=0;
  
 
  effect2.play(
    {
      volume: 0.4,
      loop: false
    }
  );
}

function scene3Update() {

}

function scene3Transition() {
  this.scene.start('scene1');
}

