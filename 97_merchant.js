/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

function init() {
  
}

function on_cm(name, data)
//needs a timer to see when the last movement was sent
{
  //game_log("Received a code message from: "+name);

  //check if one of our adventurers called for the merchant
  if (name == Characters.Warrior || name == Characters.Mage || name == Characters.Ranger || name == Characters.merchant) {
    //if not already walking or not already there, start walking
    if (!is_moving(character) || !get_player(name)) {
      smart_move({ x: data.x, y: data.y, map: data.map });
    }
  }

  //once we've reached the adventurer, walk back to town with the loot
  if (data == "done") {
    travelTo("bank");
  }
}