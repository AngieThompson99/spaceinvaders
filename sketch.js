let screenWidth = 500;
let screenHeight = 500;
let aliens=[];//an array of aliens

                                                        // PARAMS GUI
let params={
    numCols : 12,//number of aliens going across the column
    numRows : 7// rumber of rows 
} 

//params.numCols // accessing the value

let hSpace = 30; //horizontal spacing
let vSpace = 30; //vertical spacing
let alienWidth = 20; // Alien Height
let alienHeight = 20; //Alien Width
let alienVelocity = 1; //how fast the alien moves
let xOffSet = (screenWidth - (params.numCols-1)*hSpace) / 2; // 7 cols by 50 minus screen width divided by 2
let yOffset = 20;
let shiftDown = 40;// spacing that it moves down
let alienImg;


                                                        // SHOOTER
let shooterWidth = 100;
let shooterHeight = 20;
let shooter;


                                                        // BULLET
let bulletWidth = 10;
let bulletHeight = 10;
let bullets = []; // bullets array of bullet
let bulletVelocity = 10;

let emitters = []; // defining emitters as an array

let gui;                                            //GUI Variable 

function preload(){
    alienImg = loadImage('assets/spaceInvaders.png');
}

function setup() {
    populateAliens(); //calls function populate aliens, then looks for the function below

    gui=QuickSettings.create(550,25, "My space invaders customs")
        .addRange("Number of columns",5 , 20, params.numCols, 1, // increments cols
        function(value){
            params.numCols = value // mske the gui cols the actual cols
            aliens=[];// empties the aliens array
            xOffSet = (screenWidth - (params.numCols-1)*hSpace) / 2; // recalculates offset
           populateAliens(); //reconfigures it, populates it again with new cols

    }// end of function cols
    )// end of range cols 
    .addRange("Number of rows",5 , 20, params.numRows, 1, // increments cols
    function(value){
        params.numRows = value // updates value
        aliens=[];// empties the old aliens array
        xOffSet = (screenWidth - (params.numRows-1)*hSpace) / 2; // recalculates offset
       populateAliens(); //reconfigures it, populates it again with new cols

}// end of function rows
)// end of range rows 

    shooter = new Shooter(screenWidth/2, screenHeight -shooterHeight / 2);
    createCanvas(screenWidth, screenHeight);//witdth and height of background canvas
    background(255);
    //emitters.push(new Emitter(250, 250)) // not in setup anyhmore beacuse im only allowing it when the alien is hit with the bullet
}

function draw() { // start of function draw
    background(0);
        //emitters.push(new Emitter(250, 250))
    emitters.forEach(emitter => { // for each element in the array
        emitter.createParticles(); // calling create particles method
        emitter.update();
        emitter.show();
    });

    
    //shooter.move();
    shooter.render(); //draws shooter
    shooter.move();
    let shift = false;

    aliens.forEach(alien => { // arrow function
        alien.move();
        alien.render(); //call render method of alien
        alien.pos.x >= screenWidth ? shift = true : null;//if else function, so that aliens dont go off screen on theright side
        alien.pos.x <= 0 ? shift = true : null; // when aliens hit left side they go down and change direction
   
    });

    if (shift) {
        aliens.forEach(alien => { //arrow function
            alien.shift(); //moves to next level
        })
    }// end of if statement 

    for(let i = bullets.length -1; i >= 0; i--){//counting back now
        bullets[i].move();
        bullets[i].render();
        // check if bullet is intersecting
        for(let j = aliens.length - 1; j >= 0; j--){ //for everybullet we're gomnna go through the aliens
            if(bullets[i].hits(aliens[j])){
                console.log('hit');
    // explosion emitter
                emitters.push(new Emitter(aliens[j].pos.x, aliens[j].pos.y)) ;// emitter for hitting alien, explosion at postion of alien hit, j is for alien, i is for bullet

                //console.log('hit');// this is a visual indicator to tell you tht the alien has been hit
                aliens.splice(j, 1); // gets rid of aliens when hit by bullet j is alien
                bullets.splice(i, 1); // gets rid of bullet that hit alien  i is bullet
                break; //break out of loop instead of letting it run
            }
        }
    }

    checkGameStatus()


}// end of function draw

function checkGameStatus(){  // if the postion of any of the aliens goes past the shooter
    let gameOver=false;
    aliens.forEach(alien => { // arrow function
        if(alien.pos.y>400){ // y postion going down
            console.log("Game Over")
            gameOver=true;
        }
   
    });

    if (gameOver){ // if gasme over is true
        noLoop(); //stops the draw loop from running
        textSize(120);
        textLeading(110)
        fill(255, 0, 0);
        textAlign(CENTER, CENTER)
        text("Game\nOver", 250, 230)
    }

} // end of function check game status

// interaction starts here with key pressed listener
function keyPressed(){
    if (keyCode === 32) {
        bullets.push(new Bullet(
            shooter.pos.x,
            screenHeight - shooterHeight, // so that the bullets come out at the end of the barrel
            shooter.barrelAngle)) // so that the bullets angle comes out the same angle that the barrel is at
            console.log("angies key pressed")
    }

    if (keyCode === RIGHT_ARROW){ // move shooter direction + the x axis, so its going right
        //shooter.setDirection(1);
        shooter.barrelAngle += 0.2;
        
    } else if (keyCode === LEFT_ARROW){ //move shooter direction - the x axis so that its going left
        //shooter.setDirection(-1);
        shooter.barrelAngle -= 0.2;
    } 
}



function populateAliens() { //this is the original function of aliens, calls array and makes new alien
    for (let row = 0; row< params.numRows; row++){ //auto increments each row
        for (let col = 0; col < params.numCols; col++){// for loop to multiply alien array, gives them random position
            console.log("angie populate aliens")
            aliens.push(new Alien(col * hSpace + xOffSet, row * vSpace + yOffset)) //each aliens x is multiplied by horizontal spacing each time
        }
    }
}
