/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

let lastUse_ThreeShot = new Date(0);
let lastUse_FourFingers = new Date(0);
let lastUse_FiveShot = new Date(0);
let lastUse_PoisonArrow = new Date(0);
let lastUse_Supershot = new Date(0);
let lastUse_Track = new Date(0);

function init() {

  parent.attackActive = true;
  parent.walkingActive = false;

}

function useCombatSkills(target) {
  if (canUseSupershot()) {
    useSupershot(target);
  }

  if (canUsePoisonArrow()) {
    usePoisonArrow(target);
  }
}

/**
 * Hits 3 targets at once! Deals 0.7X damage to each target.
 */
function useThreeShot(target) {
  use_skill(RangerSkills.ThreeShot.name, target);
  lastUse_ThreeShot = new Date();
}

/**
 * Use the ancient arts to send the target to a deep meditation state. 
 * Just several taps to key chakra points does the job!
 */
function useFourFingerTechnique(target) {
  use_skill(RangerSkills.FourFingerTechnique.name, target);
  lastUse_FourFingers = new Date();
}

/**
 * Hits 5 targets at once! Deals 0.5X damage to each target.
 */
function useFiveShot(target) {
  use_skill(RangerSkills.FiveShot.name, target);
  lastUse_FiveShot = new Date();
}

/**
 * Fire a single low damage but poison coated arrow at your opponent.
 */
function usePoisonArrow(target) {
  if (character.items.includes("poison")) {
  game_log("Ah, sweet toxicity!", colorGreen);
  actionText(parent.G.skills[RangerSkills.PoisonArrow.name].name, colorGreen);
  use_skill(RangerSkills.PoisonArrow.name, target);
  lastUse_PoisonArrow = new Date();
  }
}

/**
 * Deals 1.5X instant damage from an incredible distance (range 3X).
 */
function useSupershot(target) {
  if (parent.distance(target, character) <= character.range * 3 && target.hp >= calcSupershotDmg()) {
    game_log("Sniping for " + calcSupershotDmg() + " dmg and " + Math.round(parent.distance(target, character)) + " distance", colorGreen);
    actionText(parent.G.skills[RangerSkills.Supershot.name].name, colorGreen);
    use_skill(RangerSkills.Supershot.name, target);
    lastUse_Supershot = new Date();
  }
}

/**
 * Use your fine-tuned senses to detect others.
 */
function useTrack(target) {
  use_skill(RangerSkills.Track.name, target);
  lastUse_Track = new Date();
}

function canUsePoisonArrow() {
  return (mssince(lastUse_PoisonArrow) > RangerSkills.PoisonArrow.cd
    && character.mp > RangerSkills.PoisonArrow.mp);
}

function canUseSupershot() {
  return (mssince(lastUse_Supershot) > RangerSkills.Supershot.cd
    && character.mp > RangerSkills.Supershot.mp);
}

function canUseTrack() {
  return (mssince(lastUse_Track) > RangerSkills.Track.cd
    && character.mp > RangerSkills.Track.mp);
}

function calcSupershotDmg() {
  return 1.5 * character.attack;
}