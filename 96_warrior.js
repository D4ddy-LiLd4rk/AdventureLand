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
  
}

setInterval(function callForParty() {
  createParty();
}, 3600000); //loop every hour

/**
 * Taunts all nearby monsters.
 */
function useAgitate() {

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

}

/**
 * Taunts an enemy. Prevents players from escaping in pvp. Steals aggro from friendly targets.
 */
function useTaunt() {

}

/**
 * Motivate your allies to fight!
 */
function useWarCry() {

}
