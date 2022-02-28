const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, enemy1, enemy2, box2 , box3;
var BackgroundImg, platform;
var hexaLaunch, slingshot,smokeImage;

var gameState = "onSling";
var score = 0;
var reload,reloadImage;

function preload() {
    getBackgroundImg();
    keyPressed();
    reload = loadImage ("sprites/reloadImage.jpg");
}

function setup() {
    var canvas = createCanvas(1500, 400);

    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600, height, 1500, 20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(600, 320, 70, 70);
    box2 = new Box(700, 320, 70, 70);
    box3 = new Box(920, 320, 70, 70);
    box4 = new Box(1020, 320, 70, 70);
    enemy1 = new Enemy(810, 350);
    log1 = new Log(810, 260, 500, PI / 2);

    box5 = new Box(700, 240, 70, 70);
    box6 = new Box(920, 240, 70, 70);
    enemy2 = new Enemy(810, 220);

    log3 = new Log(810, 180, 300, PI / 2);

    box7= new Box(810, 160, 70, 70);
    log4 = new Log(810, 150, 200, PI / 2);
    log5 = new Log(700, 150, 15, PI / 2);
    log6 = new Log(910, 150, 15, PI / 2);

    hexaLaunch = new Hexa(200, 50);

    slingshot = new SlingShot(hexaLaunch.body, { x: 200, y: 50 });
}

function draw() {

    if (BackgroundImg) {
        background(BackgroundImg);
    }
    fill("gold");
    textSize(20);
    text("Score: " + score, 1100, 55);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    ground.display();
    enemy1.display();
    enemy1.score();
    log1.display();


    box5.display();
    box6.display();
    enemy2.display();
    enemy2.score();
    log3.display();

    box7.display();
    log4.display();
    log5.display();
    log6.display();

    hexaLaunch.display();
    platform.display();

    slingshot.display();


    if(score == 400){
        fill("gold");
        textSize(100);
        text("YOU WON",500,200);
        textSize(20);
        text("Press 'r' to Play-Again",650,250);
    }

    if(keyCode === 82){
        document.location.reload();
    }

}


function mouseDragged() {
    if (gameState !== "launched") {
        Matter.Body.setPosition(hexaLaunch.body, { x: mouseX, y: mouseY });
    }
}


function mouseReleased() {
    slingshot.fly();
    gameState = "launched";
}

function keyPressed() {
    if (keyCode === 32) {
        slingshot.attach(hexaLaunch.body);
    }
}



async function getBackgroundImg() {
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJson = await response.json();
    console.log(responseJson.datetime);
    var hour = responseJson.datetime.slice(11, 13);
    console.log(hour);

    if (hour >= 06 && hour <= 19) {
        bg = "sprites/bgop.jpg"
    }
    else {
        bg = "sprites/bgop.jpg"
    }
    BackgroundImg = loadImage(bg);
}
