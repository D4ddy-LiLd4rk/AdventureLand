/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

const cd_Blink = 1200;
const cd_ManaBurst = 6000;
const cd_CManaBurst = 6000;
const cd_Energize = 4000;

let lastUse_Blink = new Date(0);
let lastUse_ManaBurst = new Date(0);
let lastUse_CManaBurst = new Date(0);
let lastUse_Energize = new Date(0);

function init() {

  parent.attackActive = true;
  parent.walkingActive = false;
  
}

function useCombatSkills(target) {
  if (mssince(lastUse_ManaBurst) < cd_ManaBurst && target.hp >= calcManaBurstDmg()) {
    useManaBurst(target);
    lastUse_ManaBurst = new Date();
  }
}

/**
 * Teleport to a nearby location.
 */
function useBlink(target) {
  use_skill(MageSkills.Blink, target);
}

/**
 * Converts your entire mana pool to damage. Deals 0.5 magical damage for each MP.
 */
function useManaBurst(target) {
  use_skill(MageSkills.ManaBurst, target);
}

/**
 * A skill for experienced mages. Allows you to control your most powerful ability.
 */
function useControlledManaBurst(target) {
  use_skill(MageSkills.ControlledManaBurst, target);  
}

/**
 * Transfers mana to a target. As a side effect the target gains high attack speed for a short duration.
 */
function useEnergize(target) {
  use_skill(MageSkills.Energize, target);  
}

/**
 * Reveals invisible entities nearby and prevents them from going invisible again for 12 seconds.
 */
function useLight(target) {
  use_skill(MageSkills.Light, target);  
}

/**
 * Pull someone to your location using the magical paths that surround our world.
 */
function useMagiport(target) {
  use_skill(MageSkills.Magiport, target);  
}

function calcManaBurstDmg() {
  return 0.5 * character.mp;
}