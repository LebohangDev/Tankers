// exporting class named PlayerTank for game
export class PlayerTank {
    image; // HTML image
    xPos; // x location of player tank
    yPos; // y location of player tank
    speed = 1; // Speed of the player tank
    rotation = 0.50; // initialize rotation 
    // constructor for creating a new instance of PlayerTank 
    constructor(imagePath, context, xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        // loaiding the image from the path specified 
        this.image = new Image();
        this.image.src = imagePath;
        this.context = context;

        // bind the event listener to the class instance
        this.handleKeyDown = this.handleKeyDown.bind(this);

        // listen for keydown events on the document
        document.addEventListener("keydown", this.handleKeyDown);

        // creating object to store the pressed keys
        this.keysPressed = {};
         // addding event listeners for keydown and keyup events
        window.addEventListener('keydown', (event) => {
            this.keysPressed[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {

            this.keysPressed[event.key] = false
        });
        

        // continuously update the player tank's rotation based on the cursor position
        document.addEventListener("mousemove", (event) => this.updateRotationToCursor(event));

        

        

    }
    // method to update the rotation of tank based on the cursors position 
    updateRotationToCursor(event) {
        // Calculate the angle between the player tank and the cursor position
        let angle = Math.atan2(
            event.clientY - (this.yPos + this.image.height / 2),
            event.clientX - (this.xPos + this.image.width / 2)
        );

        // Update the rotation of the player tank
        this.rotation = angle * (180 / Math.PI);
    }

    // adding a method to handle keydown events 
    handleKeyDown() {
        if (this.keysPressed["W"]) {
            // Move forward
            this.moveForward()
        }
        
        if (this.keysPressed["S"]) {
            // Move backwards
            this.moveBackward();
        }
        

        
    }
    // method to move tank forward
    moveForward(){

        let rotationAngle = this.rotation * (Math.PI / 180);
        this.xPos += Math.cos(rotationAngle) * this.speed;
        this.yPos += Math.sin(rotationAngle) * this.speed;




    }
// method to move tank backwards
    moveBackward(){

        let rotationAngle = this.rotation * (Math.PI / 180);
        this.xPos -= Math.cos(rotationAngle) * this.speed;
        this.yPos -= Math.sin(rotationAngle) * this.speed;




    }
    
    // method to remove eventlisteners to prevent memeory leaks 
    removeEventListeners() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }
    
    // draw method to draw tank on canvas 
    draw() {
        // saves the current state of the canvas context
        this.context.save();
    
        // Translate to the center of the tank image
        this.context.translate(
            this.xPos + this.image.width / 2, //tranlsation is set to the center of the tank image by adding half of the image widht to the x-coordinate 
            this.yPos + this.image.height / 2 // translation is set tht half of the image height to the y-coordinate  
        );
    
        // rotate based on the tank's rotation property
        this.context.rotate(this.rotation * (Math.PI / 180));// used to rotate image to the current orgin 
    
        // draw the tank image centered at the translated position
        this.context.drawImage(
            this.image,
            -this.image.width / 2,
            -this.image.height / 2
        );
    
        this.context.restore(); // used to restore the canvas back to the orgiganl state it was when the save() method was called 
    }


}
