/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

let lastUse_Agitate = new Date(0);
let lastUse_Charge = new Date(0);
let lastUse_Cleave = new Date(0);
let lastUse_HardShell = new Date(0);
let lastUse_Stomp = new Date(0);
let lastUse_Taunt = new Date(0);
let lastUse_WarCry = new Date(0);

function init() {

  parent.attackActive = true;
  parent.walkingActive = true;
  parent.isPartyLeader = true;
  parent.partyLeader = Characters.Warrior; //character.name

}

function useCombatSkills(target) {

  if (canUseAgitate() || canUseTaunt()) {
    let used = false;

    if (canUseAgitate()) used = useAgitate();
    if (!used && canUseTaunt()) used = useTaunt(target);
    if (used) {
      if (canUseCleave()) {
        useCleave();
      }

      if (canUseStomp()) {
        useStomp();
      }
    }
  }
}

setInterval(function callForParty() {
  createParty();
}, 3600000); //loop every hour

/**
 * Taunts all nearby monsters.
 */
function useAgitate() {
  let nearbyMonsters = getMonstersNearby(WarriorSkills.Agitate.range);

  if (nearbyMonsters.length) {
    game_log("Taunting nearby monsters!", colorGreen);
    actionText(parent.G.skills[WarriorSkills.Agitate.name].name, colorGreen);
    use_skill(WarriorSkills.Agitate.name);
    lastUse_Agitate = new Date();
    return true;
  }
  return false;
}

/**
 * Gain 30 Speed for a short duration.
 */
function useCharge() {

}

/**
 * Swing your axe in a flurry to damage all enemies nearby!
 */
function useCleave() {
  game_log("Swinging my axe!", colorGreen);
  actionText(parent.G.skills[WarriorSkills.Cleave.name].name, colorGreen);
  use_skill(WarriorSkills.Cleave.name);
  lastUse_Cleave = new Date();
}

/**
 * Use everything at your disposal to protect yourself from physical attacks for a short duration.
 */
function useHardShell() {

}

/**
 * Use your basher to Stomp the ground to Stun enemies nearby!
 */
function useStomp() {
  game_log("I'm an earthquake!", colorGreen);
  actionText(parent.G.skills[WarriorSkills.Stomp.name].name, colorGreen);
  use_skill(WarriorSkills.Stomp.name);
  lastUse_Stomp = new Date();
}

/**
 * Taunts an enemy. Prevents players from escaping in pvp. Steals aggro from friendly targets.
 */
function useTaunt(target) {
  if (parent.distance(target, character) <= WarriorSkills.Taunt.range) {
    game_log("Come at me bruh!", colorGreen);
    actionText(parent.G.skills[WarriorSkills.Taunt.name].name, colorGreen);
    use_skill(WarriorSkills.Taunt.name, target);
    lastUse_Taunt = new Date();
    return true;
  }
  return false;
}

/**
 * Motivate your allies to fight!
 */
function useWarCry() {

}

function canUseCleave() {
  return (mssince(lastUse_Cleave) > WarriorSkills.Cleave.cd
    && character.mp > WarriorSkills.Cleave.mp
    && character.level >= WarriorSkills.Cleave.level);
}

function canUseStomp() {
  return (mssince(lastUse_Stomp) > WarriorSkills.Stomp.cd
    && character.mp > WarriorSkills.Stomp.mp
    && character.level >= WarriorSkills.Stomp.level
    && parent.G.items[character.slots.mainhand.name].wtype === WeaponTypes.Basher);
}

function canUseAgitate() {
  return (mssince(lastUse_Agitate) > WarriorSkills.Agitate.cd
    && character.mp > WarriorSkills.Agitate.mp
    && character.level >= WarriorSkills.Agitate.level);
}

function canUseTaunt() {
  return (mssince(lastUse_Taunt) > WarriorSkills.Taunt.cd
    && character.mp > WarriorSkills.Taunt.mp);
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