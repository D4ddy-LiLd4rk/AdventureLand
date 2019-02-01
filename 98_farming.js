/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

let attackActive = false;
let walkingActive = false;

let goldThreshold = 75000;
let goldTransferAmount = 5000;

setInterval(function () {

  //initialize character class specific resources
  init();

  checkHealthAndManaPotionsInInventory();
  restoreHealthOrMana();
  loot();

  let monster = {
    // max_att: max attack
    // min_xp: min XP
    // target: Only return monsters that target this "name" or player object
    // no_target: Only pick monsters that don't have any target
    // path_check: Checks if the character can move to the target
    // type: Type of the monsters, for example "goo", can be referenced from `show_json(G.monsters)` 
    min_xp: 100,
    max_att: 120
  };
  attackMonster(monster);

}, 1000 / 4); // Loops every 1/4 seconds.

/*----------------------
 |  Merchant Functions
 *----------------------*/

setInterval(function callMerchant() {
  if (hasGoldOrItems() && !is_moving(Characters.Merchant)) {
    send_cm(Characters.Merchant, {
      x: character.real_x,
      y: character.real_y,
      map: character.map
    });

    if (get_player(Characters.Merchant)) {
      sendGoldToMerchant()
      sendItemsToMerchant()
      send_cm(Characters.Merchant, "done");
    }

  };

}, 60000); //loop every 2 seconds

function hasGoldOrItems() {
  return ((character.gold > goldThreshold) || (character.esize + getNumberOfPotions < 42));
}

function sendGoldToMerchant() {
  if (character.gold > goldThreshold) {
    send_gold(Characters.Merchant, goldTransferAmount);
  }
}

function sendItemsToMerchant() {
  if (character.esize === 42) return; //empty inventory
  for (var index in character.items) {
    if (character.items[index] && parent.G.items[character.items[index].name].type !== ItemTypes.Potion) {
      send_item(Characters.Merchant, index);
    }
  }
}

function getNumberOfPotions() {
  let numberOfPotions = 0;
  if (character.esize === 42) return numberOfPotions; //empty inventory
  for (var index in character.items) {
    if (character.items[index] && parent.G.items[character.items[index].name].type === ItemTypes.Potion) {
      numberOfPotions++;
    }
  }
  return numberOfPotions;
}