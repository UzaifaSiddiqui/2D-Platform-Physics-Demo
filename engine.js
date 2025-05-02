let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 


let c = canvas.getContext("2d");

///Player Construction
const gravity = 1.5;
class Player{
    constructor(){
        this.position={
            x:100,
            y:100
        }
        this.velocity={
            x:0,
            y:0
        }
        this.width = 30;
        this.height = 30;
    }
    draw(){
        c.fillStyle="red";
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        if (this.position.y + this.height + this.velocity.y <=canvas.height){
            this.position.y +=this.velocity.y;
            this.velocity.y += gravity;
        }else{
            this.velocity.y = 0;
        }
    }
}

let player = new Player();

///Platform Construction

class Platform{
    constructor(){
        this.position={
            x:200,
            y:100
        }
        this.width = 300;
        this.height = 20;
    }
    draw(){
        c.fillStyle = "blue";
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}

let platform = new Platform();


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    player.update();
    platform.draw();

    //Platfrom collision detection
   if (player.position.y+player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >=platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x < platform.position.x + platform.width
   ){
        player.velocity.y = 0;
    }

} 

animate(); 

document.addEventListener("keydown",({key})=>{
    switch(key){
        case "ArrowUp":
            console.log("up");
            player.velocity.y -= 20;
            break;
        case "ArrowRight":
            console.log("right");
            player.velocity.x = 1;
            break;
        case "ArrowLeft":
            console.log("left");
            player.velocity.x = -1;
            break;
    }
})

document.addEventListener("keyup",({key})=>{
    switch(key){
        case "ArrowRight":
            console.log("right");
            player.velocity.x = 0;
            break;
        case "ArrowLeft":
            console.log("left");
            player.velocity.x = 0;
            break;
    }
})