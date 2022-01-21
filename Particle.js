class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.velocity.multi(random(-2.5, 2.5))
        this.acc = createVector(0, 0);
        this.r = 2;
        this.lifetime= 255;
    }

    finished(){//calling the method finsihed
        return (this.lifetime < 0)
    }

    applyForce(force){
        this.acc.add(force) // the rate at which they ball due to the force
    }

    update() {
        this.velocity.add(this.acc);
        this.pos.add(this.velocity);
        this.acc.set(0, 0);
        this.lifetime -= 7; // how long they last
    }

    render() {
                //stroke(255, this.lifetime)
                //strokeWeight(2)
        noStroke();
        fill(255, 0, 0, this.lifetime);
            //if (this.isFinished()){ // if the particle system hits the length and bounces back then change the colour, calling method isfinished
                //fill(0, 255, 0)  // WE DONT NEED THIS ANYMORE BECAUSE THE PARTICLES ARENT BOUNCING BACK
            //}
        ellipse(this.pos.x, this.pos.y, this.r * 2)
    }

    edges() {
        if (this.pos.y >= height - this.r) {  // when the particles hit the end of the canvas, bounce them back
            this.pos.y = height - this.r;
            this.velocity.y *= -1
        } else if (this.pos.y <= 0 + this.r) {
            this.pos.y = 0 + this.r;
            this.velocity.y *= -1
        }
    }
}