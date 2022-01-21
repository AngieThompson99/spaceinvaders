// no array as there will only be 1 shooter
class Shooter {
    constructor(x, y) { //pass parameter
        this.pos = createVector(x, y); //stores positions of x and y using vector
       
        this.direction = 0;
        this.barrelAngle = -PI / 2;// so that the barrell points upwards on start
    }

    render() {
        
        push()
        translate (this.pos.x, this.pos.y);  // using translate, 
        //we move the canvas so that the shooter thinks its at 0,0 but it is really in the middle of the axis
        //ellipse(0,0,alienWidth,alienHeight)
        
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(0, 0, shooterWidth, shooterHeight); // originally in top left corner 0,0


        rotate(this.barrelAngle); // angle at what the barrell is pointing, we'll change this in sketch by the key events
        rectMode(CORNER) // so that we can rotate it around its corner and not by its centre
        fill(255, 100, 0);
        noStroke();
        rect(-5, -5, 40, 10);
        pop()
    }
    move() {
        if (this.pos.x < 0 || this.pos.x > 500) { //if it crosses over left border(0),or right border(500)
            this.direction += -1 //plus or minus the direction so it wont go off the screen
        } 

        this.pos.x += this.direction;
    }


   setDirection(direction){ //receives value, we tell it to set it to that value
       this.direction = direction
   }

}