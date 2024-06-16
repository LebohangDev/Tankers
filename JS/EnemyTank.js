// importing bullet and PlayerTank classes respectively 
import { PlayerTank } from './PlayerTank.js';
import { Bullet } from './Ammo.js';
// exporting class EnemyTank, extends PlayerTank 
export class EnemyTank extends PlayerTank {
    
    
    
    // constructor to create a new EnemyTank instance 
    constructor(imagePath, context, xPos, yPos) {
        super(imagePath, context, xPos, yPos); // Call PlayerTank constructor
        this.speed = 0; // Speed of the enemy tank
        this.minDistance = 200; // Minimum distance to keep from the player tank
        this.counter = 0; // initialize counter to keep track of generated tank 
    }

    // methodd to create aand return new enemy bullet 
    shootEnemyBullet() {
        // creating a new bullet instance with the specfified properties 
        let bullet = new Bullet('../Images/bullet.png', this.context, this.xPos, this.yPos, this.rotation, 100, 100);
        
        return bullet;
    }

    






    

    // Overrididing the draw method of PlayerTank class 
    draw() {


    
            // calcuating the angle between the enemy tank and the player tank
            let angle = Math.atan2(this.playerTank.yPos - this.yPos, this.playerTank.xPos - this.xPos);
            // saving current transformation state
            this.context.save();

            // translate to the center of the enemy tank image
            this.context.translate(this.xPos + this.image.width / 2, this.yPos + this.image.height /2);

            // rotate image based on the calucated angle plus half of the circle 
            this.context.rotate(angle + Math.PI);

            // draw the enemy tank image
            this.context.drawImage(this.image, this.image.width / 2, -this.image.height /2);

            this.context.restore();
           
    }


    
}
