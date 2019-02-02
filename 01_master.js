/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

load_code(2);  //constants
load_code(3);  //movement
load_code(4);  //attack
load_code(5);  //consumables
load_code(6);  //skills
load_code(99); //utils
load_code(100); //acc_contribute

loadFarmingOrMerchant();

function loadFarmingOrMerchant() {
  if (character.ctype === CharacterTypes.Merchant) {
    load_code(97); //merchant
  } else {
    load_code(98); //farming
    loadCharacterClass();
  }
}

function loadCharacterClass() {
  switch (character.ctype) {
    case CharacterTypes.Warrior:
      load_code(96);
      break;
    case CharacterTypes.Mage:
      load_code(95);
      break;
    case CharacterTypes.Ranger:
      load_code(94);
      break;
    case CharacterTypes.Priest:
      load_code(93);
      break;
    case CharacterTypes.Rogue:
      load_code(92);
      break;
  }
}