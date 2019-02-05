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


add_bottom_button(1, 'Update Code', function () {
  const baseURL = "https://raw.githubusercontent.com/D4ddy-LiLd4rk/AdventureLand/master/";

  const allFiles = ["01_master.js",
    "02_constants.js",
    "03_movement.js",
    "04_attack.js",
    "05_consumables.js",
    "06_skills.js",
    "92_rogue.js",
    "93_priest.js",
    "94_ranger.js",
    "95_mage.js",
    "96_warrior.js",
    "97_merchant.js",
    "98_farming.js",
    "99_utils.js"];

  parent.api_call("list_codes", {
    callback: function () {
      game_log("Updating from GitHub/D4ddy-LiLd4rk...");
      for (let file of allFiles) {
        let request = new XMLHttpRequest();
        request.open("GET", baseURL + file);
        request.onreadystatechange = function () {
          if (request.readyState === 4 && request.status === 200) {
            let codeObject = getCodeObject(file);
            let data = {
              name: codeObject.name,
              slot: codeObject.slot,
              code: request.responseText
            }
            parent.api_call("save_code", data);
            game_log("Saved to slot [" + codeObject.name + "] as " + codeObject.slot);
          }
        }
        request.send();
      }
    }
  });

  function getCodeObject(file) {
    let codeObject;

    let arr = file.substring(0, file.length - 3).split("_");

    codeObject = {
      slot: arr[0],
      name: arr[1]
    };

    return codeObject;
  }
});

add_bottom_button(2, 'ENGAGE', function () {
  
  if (parent.$(".codebutton" + 2).html() === "ENGAGE") {
    start_runner();
    set_button_value(2, "DISENGAGE");
  } else if (parent.$(".codebutton" + 2).html() === "DISENGAGE") {
    stop_runner();
    set_button_value(2, "ENGAGE");
  }
});