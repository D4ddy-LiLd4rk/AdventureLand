/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

let healthPotion = 50;
let manaPoition = 100;
let lastPotion = new Date(0);

let healthThreshold = 0.4;
let manaThreshold = 0.2;

function restoreHealthOrMana() {
  if (safeties && mssince(lastPotion) < 600) return;
  var used = false;
  if (new Date() < parent.next_potion) return;
  if (!used) used = useHealthPotion(character);
  if (!used) used = useManaPotion(character);
  if (used) lastPotion = new Date();
}

function useHealthPotion() {
  if (((getDifference(character.max_hp, character.hp) >= healthPotion) || isBelowPercent(character.hp, character.max_hp, healthThreshold))
    && isAbovePercent(character.mp, character.max_mp, manaThreshold)) {
    use_skill("use_hp", character);
    return true;
  }
  return false;
}

function useManaPotion() {
  if (getDifference(character.max_mp, character.mp) >= manaPoition) {
    use_skill("use_mp", character);
    return true;
  }
  return false;
}

function checkHealthAndManaPotionsInInventory() {
  let found = false;
  for (var index in character.items) {
    if (character.items[index]) {
      let itemName = character.items[index].name;
      if (itemName && parent.G.items[itemName].type === ItemTypes.Potion) {
        let itemStats = parent.G.items[itemName].gives;
        if (itemStats) {
          let type = itemStats[0][0];
          let amount = itemStats[0][1];

          setPotionValues(type, amount);
          found = true;
        }
      }
    }
  }
  if (!found) {
    //set to default skill
    setPotionValues("hp", 50);
    setPotionValues("mp", 100);
  }
}

function setPotionValues(type, amount) {
  if (type === "hp") {
    healthPotion = amount;
  } else if (type === "mp") {
    manaPoition = amount;
  }
}