var hospitals = [];
var factories = [];
var routes = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  for(var i = 1; i < 10; i++){
    hospitals.push(new Hospital(((i/10)+10)*10,"Hospital "+i));
    //shuffle(hospitals,true);
  }
  for(var i = 1; i < 4; i++){
    factories.push(new Factory(i * 120, i *120,"Factory "+i));
    //shuffle(factories,true);
  }
  frameRate(10);
}

function draw() {
  background(255,255,255);  
  if(frameCount % 100 === 0){   
    routes = [];                        
    for(var i in hospitals){
      hospitals[i].demand = round(random(20,i*random(12,16)));
    }
    for(var j in factories){
      factories[j].currentStock = factories[j].totalSupply;
      for(var k in hospitals){
        if(hospitals[k].demand > 0){
          if(factories[j].currentStock - hospitals[k].demand >= 0){
            routes.push(factories[j].name+` (${hospitals[k].demand}) `+"--> "+hospitals[k].name);
            factories[j].currentStock -= hospitals[k].demand;
              hospitals[k].demand = 0;
            }else if(hospitals[k].demand - factories[j].currentStock >= 0){
              routes.push(factories[j].name+` (${hospitals[k].demand}) `+"--> "+hospitals[k].name);
              hospitals[k].demand -= factories[j].currentStock ;
              factories[j].currentStock = 0;
          }
        }
      }
    }
  }
  for(var i = 0; i < routes.length;i++){
    textSize(height/(2*routes.length));
    textAlign(CENTER);
    text(routes[i],width/2,(i*height/routes.length)+25);
  }
}