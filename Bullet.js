//there will be an array of bullets
class Bullet {
    constructor(x, y, a){// a for angle arc
    this.pos = createVector(x, y); 
    //this.velocity = bulletVelocity; //velocity in the y direction
    this.angle = a; // capturing angel from barrel

    }// end of contructor

    render() {

        push ()
        translate (this.pos.x,this.pos.y);   // translate
        fill(0, 255, 0); //color of bullet
        ellipse(0, 0, bulletWidth, bulletHeight); //bullet is a circle
        pop ()

    } // end of render

    move() {
    this.pos.x += Math.cos(this.angle)*bulletVelocity; // cos = angle/hyp
    this.pos.y += Math.sin(this.angle)*bulletVelocity; //sin = opp/hyp
    }// end of class move

    hits(alien){ // method on bullet for hits, alien object is passed
        let distance = (p5.Vector.sub(this.pos, alien.pos)).mag(); // the magnitude of that vector is the radius of the two objects
        if (distance <  bulletHeight/2 + alienHeight/2){ // so that its more accurate when the bullet his the alien and when it deletes
            // the height is devided by two so that the bullets height centre hits the al;ien height centre thats when they both delete
            return true; // if the radius' of each object overlap with eachother then make that hit return true

        }else{
            return false;
        }
    } // end of bits alien
    
}// end of class bullet