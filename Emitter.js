class Emitter{
    constructor(x, y){
        this.position=createVector(x,y);
        this.particles=[] // particles array

    }
    createParticles(){
        if (this.counter < 20){
            for(let i = 0; i < 1; i++){
                this.particles.push(new Particle(this.position.x, this.position.y)) // create the new partcle at the location of the emitter
                this.counter++;
            }
        }
    }
    update(){
        this.particles.forEach(particle => {
            let gravity = createVector(0, 0.2);
            particle.applyForce(gravity);
            particle.update();
        });

        for(let i = this.particles.length - 1; i >= 0; i --){
            if (this.particle[i].isFinished()){ // check if its finsihed and get rid of it if it is
                this.particles.splice(i, 1);
            }
        }

    }

    show(){
        this.particles.forEach(particle => {
            particle.render();
            //let gravity = createVector(0, 0.2);
            //particle.applyForce(gravity);
            //particle.update()
        })

    }

} // END 
