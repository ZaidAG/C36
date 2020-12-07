class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }
    play(){
     form.hideForm();
     textSize(25);
     text("Game Starts!!!!",120,100);
     Player.getPlayerInfo();
     if(allPlayers!==undefined){
       var displayPosition=120;
       for(var plr in allPlayers){
      if(plr==="player"+player.index){
        fill("yellow");
      }else{
        fill("red");
      }
        displayPosition=displayPosition+20;
        textSize(15);
        text(allPlayers[plr].name+" : "+allPlayers[plr].distance,100,displayPosition);
       }
     }
   } 

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountReference=await database.ref("playerCount").once("value");
      if(playerCountReference.exists()){
        playerCount=playerCountReference.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }
}
