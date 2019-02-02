/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

function init() {

  parent.attackActive = true;
  parent.walkingActive = true;
  parent.isPartyLeader = true;
  parent.partyLeader = Characters.Warrior; //character.name
  
}

setInterval(function callForParty() {
  createParty();
}, 3600000); //loop every hour