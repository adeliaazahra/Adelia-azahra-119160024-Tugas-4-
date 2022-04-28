let vs = []
function setup (){
  createCanvas( 800,800);
  v =new Vehicle (200,200);
}

function draw (){
   background(242);
  
  v.display()
  v.edges()
  v.update();
  v.wander();

}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 30;
    this.maxspeed = 1;
    this.maxforce = 0.01;
    this.wanderTheta = PI/2;
  }
  
  wander(){
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location);
    
    let wanderRadius = 50;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar, yBar));
    
    let debug = true;
    
    if (debug){
      push()
      fill(150, 75, 0);
      stroke('black')
      line(this.location.x, this.location.y, projPoint.x, projPoint.y)
      stroke('black');
      circle(projPoint.x, projPoint.y, 8);
      noFill();
      stroke('black');
      circle(projPoint.x, projPoint.y, wanderRadius*2);
      
      line(this.location.x, this.location.y, wanderPoint.x, wanderPoint.y)
      stroke('black')
      fill('yellow')
      circle(wanderPoint.x, wanderPoint.y, 16);
      pop()
    }
    
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta += random(-0.5, 0.5);
  }
  
  seek(vektorTarget){
    // percieve target location 
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading() //+ PI/2;
    push();
    
    stroke(0);
    translate(this.location.x, this.location.y)
    rotate(theta)
   fill(255,255,255)
   
  strokeWeight(1)
    vertex
  fill(255,255,0)
  ellipse(120,100,90,50);
  ellipse(70,95,50,50);
  

  fill(255,255,255)
  ellipse(55,85,15,15);
  ellipse(70,85,15,15);
  
  fill(0,0,0)
  ellipse(65,85,5,5);
  ellipse(50,85,5,5);
  
  
//

  fill(0,0,204,0.3)
  arc(107,78,30,80,radians(180),radians(0));
  arc(135,78,30,100,radians(185),radians(20));
  


arc(65,65,15,20,radians(90),radians(0));
arc(75,65,15,20,radians(90),radians(0));



strokeWeight(6)
arc(84,69,40,120,radians(20),radians(80));
arc(95,70,40,120,radians(20),radians(80));
arc(107,70,40,120,radians(20),radians(80));
arc(118,70,40,120,radians(20),radians(80));
arc(135,70,30,115,radians(20),radians(80));

strokeWeight(2)
arc(90,120,20,40,radians(20),radians(80));
arc(100,120,20,40,radians(20),radians(80));
arc(120,120,20,40,radians(20),radians(80));
arc(130,120,20,40,radians(20),radians(80));



fill(128,0,0)
arc(64,100,20,20,radians(0),radians(180));
arc(64,100,radians(0),radians(30));


    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }
}