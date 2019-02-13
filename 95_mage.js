/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

let lastUse_Blink = new Date(0);
let lastUse_ManaBurst = new Date(0);
let lastUse_CManaBurst = new Date(0);
let lastUse_Energize = new Date(0);

function init() {

  parent.attackActive = true;
  parent.walkingActive = false;
  
}

function useCombatSkills(target) {
  if (canUseManaBurst(target)) {
    useManaBurst(target);
    useManaPotion();
  }

  if (canUseEnergize()) {
    useEnergize();
  }
}

/**
 * Teleport to a nearby location.
 */
function useBlink(target) {
  //for blink: use_skill("blink",[x,y])
  use_skill(MageSkills.Blink.name, target);
  lastUse_Blink = new Date();
}

/**
 * Converts your entire mana pool to damage. Deals 0.5 magical damage for each MP.
 */
function useManaBurst(target) {
  game_log("Casting " + parent.G.skills[MageSkills.ManaBurst.name].name + " for " + calcManaBurstDmg() + " dmg", colorGreen);
  actionText(parent.G.skills[MageSkills.ManaBurst.name].name, colorGreen);
  use_skill(MageSkills.ManaBurst.name, target);
  lastUse_ManaBurst = new Date();
}

/**
 * A skill for experienced mages. Allows you to control your most powerful ability.
 */
function useControlledManaBurst(target) {
  use_skill(MageSkills.ControlledManaBurst.name, target);  
  lastUse_CManaBurst = new Date();
}

/**
 * Transfers mana to a target. As a side effect the target gains high attack speed for a short duration.
 */
function useEnergize() {
  let partyMembers = getPartyMembers();
  
  partyMembers = Object.values(partyMembers).filter(char =>
		parent.distance(char, character) <= MageSkills.Energize.range && 
		isBelowPercent(char.mp, char.max_mp, 0.7) 
  );
  partyMembers.sort((a, b) => a.mp / a.max_mp - b.mp / b.max_mp);
	if(partyMembers.length){
    actionText(parent.G.skills[MageSkills.Energize.name].name, colorGreen);
    use_skill(MageSkills.Energize.name, partyMembers[0]);
    game_log("Used " + parent.G.skills[MageSkills.Energize.name].name + " on " + partyMembers[0].name, colorGreen);
    lastUse_Energize = new Date();
	}    
}

/**
 * Reveals invisible entities nearby and prevents them from going invisible again for 12 seconds.
 */
function useLight(target) {
  use_skill(MageSkills.Light.name, target);  
  lastUse_Light = new Date();
}

/**
 * Pull someone to your location using the magical paths that surround our world.
 */
function useMagiport(target) {
  use_skill(MageSkills.Magiport.name, target);  
  lastUse_Magiport = new Date();
}

function calcManaBurstDmg() {
  return 0.5 * character.mp;
}

function canUseManaBurst(target) {
  return (mssince(lastUse_ManaBurst) > MageSkills.ManaBurst.cd && target.hp >= calcManaBurstDmg() && character.mp > 2000);
}

function canUseEnergize() {
  return (mssince(lastUse_Energize) > MageSkills.Energize.cd && character.level >= MageSkills.Energize.level);
}