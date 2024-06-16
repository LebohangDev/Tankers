

// exporting Class named  bullet for game
export class Bullet {
    image; // HTML image
    xPos; // x location of bullet
    yPos; // y location of bullet
    speed = 4; // Speed of the bullet
    rotation; // Rotation of the bullet
    width; // Width of the bullet image
    height; // Height of the bullet image
    inAir = true; // Whether the bullet is in the air or not 

    // constructor for creating a new Bullet instance
    constructor(imagePath, context, xPos, yPos, rotation, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.rotation = rotation;
        this.width = width;
        this.height = height;

        // Load the image from the path specified 
        this.image = new Image();
        this.image.src = imagePath;
        this.context = context;
    }

    // moving the bullet based on its speed and rotation calculated
    move() {
        // calculating the new position based on the bullets speed and rotation
        let rotationAngle = this.rotation * (Math.PI / 180);
        this.xPos += Math.cos(rotationAngle) * this.speed;
        this.yPos += Math.sin(rotationAngle) * this.speed;

        // Checking if the bullet is out of bounds of the canvas 
        if (
            this.xPos < 0 ||
            this.xPos > this.context.canvas.width ||
            this.yPos < 0 ||
            this.yPos > this.context.canvas.height
        ) {
            // Set the inAir flag to false if the bullet is out of bounds to remove bullet 
            this.inAir = false;
        }
    }

    // Drawing the bullet on the canvas
    draw() {
        // Save the current state of the context
        this.context.save();

        // translate and rotate the context based on the bullet's position and rotation
        this.context.translate(this.xPos, this.yPos);
        this.context.rotate(this.rotation * (Math.PI / 180));

        // Draw the bullet image centered at the current position
        this.context.drawImage(
            this.image,
            -this.width / 2,  // center the image depending on the width 
            -this.height / 2,  // center the image dpednign on the height
            this.width,  // width of the bullet
            this.height  // height of the bullet 
        );

        // restore the context to its saved state
        this.context.restore();
    }
    

}