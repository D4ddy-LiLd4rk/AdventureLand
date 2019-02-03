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
    game_log("Taunting nearby monsters!", parent.colorGreen);
    actionText(parent.G.skills[WarriorSkills.Agitate.name].name, parent.colorGreen);
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
  game_log("Swinging my axe!", parent.colorGreen);
  actionText(parent.G.skills[WarriorSkills.Cleave.name].name, parent.colorGreen);
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
  game_log("I'm an earthquake!", parent.colorGreen);
  actionText(parent.G.skills[WarriorSkills.Stomp.name].name, parent.colorGreen);
  use_skill(WarriorSkills.Stomp.name);
  lastUse_Stomp = new Date();
}

/**
 * Taunts an enemy. Prevents players from escaping in pvp. Steals aggro from friendly targets.
 */
function useTaunt(target) {
  if (parent.distance(target, character) <= WarriorSkills.Taunt.range) {
    game_log("Come at me bruh!", parent.colorGreen);
    actionText(parent.G.skills[WarriorSkills.Taunt.name].name, parent.colorGreen);
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