/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */
let lastUse_Courage = new Date(0);
let lastUse_Luck = new Date(0);
let lastUse_ThrowStuff = new Date(0);

let movingToChar = false;
let movingToBank = false;

let justRespawned = false;
let oldLocation = {};

let isPartyLeader = false;

let potions = {
  D4ddy001: { name: "D4ddy001", inventory: { hpot0: { q: -1 }, hpot1: { q: -1 }, mpot0: { q: -1 }, mpot1: { q: -1 } } },
  D4ddy002: { name: "D4ddy002", inventory: { hpot0: { q: -1 }, hpot1: { q: -1 }, mpot0: { q: -1 }, mpot1: { q: -1 } } },
  D4ddy003: { name: "D4ddy003", inventory: { hpot0: { q: -1 }, hpot1: { q: -1 }, mpot0: { q: -1 }, mpot1: { q: -1 } } }
};

function init() {

}

setInterval(function doMerchantStuff() {

  if (character.rip) {
    oldLocation = { x: character.real_x, y: character.real_y, map: character.map };
    setTimeout(respawn,15000);
    justRespawned = true;
    return 1;
  }
  if (justRespawned) {
    smart_move(oldLocation);
    justRespawned = false;
    oldLocation = {};
  }

  if (is_moving(character)) return;

  init();

  partyHandler();

  checkHealthAndManaPotionsInInventory();
  restoreHealthOrMana();

  if (!is_moving(character)) fastTravelTown();

  if (!is_moving(character)) {
    smart_move({ to: "potions", return: true }, function () { sellGarbage(); });
    return;
  }

  if (needMoney() && !is_moving(character)) {
    smart_move({ to: "bank", return: true }, function () { withdrawMoney(); });
    return;
  }

  if (needPotions() && !is_moving(character)) {
    smart_move({ to: "potions", return: true }, function () { buyPotions(); });
    return;
  }

  if (!is_moving(character)) {
    smart_move({ to: "bank", return: true }, function () { depositGold(); depositItems(); });
  }
}, 1000 / 4); //loop every 5 seconds

function needMoney() {
  return character.gold < 300000;
}

function withdrawMoney() {
  bank_withdraw(getDifference(character.gold, 300000));
}

function needPotions() {
  return (quantity("hpot0") < 600
    || quantity("hpot1") < 600
    || quantity("mpot0") < 600
    || quantity("mpot1") < 600);
}

function buyPotions() {
  let quantitySmallHP = quantity("hpot0");
  let quantityBigHP = quantity("hpot1");
  let quantitySmallMP = quantity("mpot0");
  let quantityBigMP = quantity("mpot1");

  if (quantitySmallHP - 600 < 0) buy("hpot0", getDifference(quantitySmallHP, 600));
  if (quantityBigHP - 600 < 0) buy("hpot1", getDifference(quantityBigHP, 600));
  if (quantitySmallMP - 600 < 0) buy("mpot0", getDifference(quantitySmallMP, 600));
  if (quantityBigMP - 600 < 0) buy("mpot1", getDifference(quantityBigMP, 600));
}

function deliverPotions() {
  Object.values(potions).forEach(function(member) {
    if (get_player(member.name)) {
      if (member.inventory.hpot0.q != -1 && member.inventory.hpot0.q - 200 < 0) send_item(member.name, getItemSlot("hpot0"), getDifference(member.inventory.hpot0.q, 200));
      if (member.inventory.hpot1.q != -1 && member.inventory.hpot1.q - 200 < 0) send_item(member.name, getItemSlot("hpot1"), getDifference(member.inventory.hpot1.q, 200));
      if (member.inventory.mpot0.q != -1 && member.inventory.mpot0.q - 200 < 0) send_item(member.name, getItemSlot("mpot0"), getDifference(member.inventory.mpot0.q, 200));
      if (member.inventory.mpot1.q != -1 && member.inventory.mpot1.q - 200 < 0) send_item(member.name, getItemSlot("mpot1"), getDifference(member.inventory.mpot1.q, 200));
    }
  });
}

function getItemSlot(name) {
  for (var i = 0; i < character.items.length; i++) {
    if (character.items[i] && character.items[i].name == name) return i;
  }
  return -1;
}

function askForPotions() {
  send_cm([Characters.Warrior, Characters.Mage, Characters.Ranger], "askPotions");
}

function on_cm(name, data) {
  if (name === Characters.Warrior || name === Characters.Mage || name === Characters.Ranger || name === Characters.Merchant) {
    if (!is_moving(character) || !get_player(name) && "x" in data) {
      smart_move({ x: data.x, y: data.y, map: data.map }, function () { askForPotions(); useLuck(); });
    }
    if ("potions" in data) {
      potions[name] = data.potions;
      deliverPotions();
    }
  }
}

function sellGarbage() {
  for (var i = 5; i < 42; i++) {
    if (character.items[i] 
      && (character.items[i].name === "hpbelt" || character.items[i].name === "hpamulet" || character.items[i].name === "ringsj")) {
        sell(i);
      }
  }
}

function openMerchStand() {
  if (!isMerchStandActive()) {
    parent.open_merchant(0);
  }
}

function closeMerchStand() {
  if (isMerchStandActive()) {
    parent.close_merchant(0);
  }
}

function toggleMerchStand() {
  if (isMerchStandActive()) {
    parent.close_merchant(0);
  } else {
    parent.open_merchant(0);
  }
}

function isMerchStandActive() {
  return character.stand !== false;
}

function moveToChar() {
  movingToChar = true;
  movingToBank = false;
}

function moveToBank() {
  movingToBank = true;
  movingToChar = false;
}

function stoppedMoving() {
  movingToChar = false;
  movingToBank = false;
}

function isMovingToChar() {
  return movingToChar;
}

function isMovingToBank() {
  return movingToBank;
}

function isInsideBank() {
  //!character.bank
  return character.map === "bank";
}

function depositGold() {
  if (character.gold > 300000) {
    bank_deposit(character.gold - 300000);
  }
}

function depositItems() {
  if (character.esize === 42) return; //empty inventory
  for (item in character.items) {
    if (item == 0) continue;
    if (!character.items[item]) continue;
    if(parent.G.items[character.items[item].name].type === ItemTypes.Potion) continue;
    bank_store(item);
  }
}

/**
 * When you sense danger, you know what to do...
 */
function useCourage() {
  use_skill(Merchantkills.Courage.name);
  lastUse_Courage = new Date();
}

/**
 * Buff a target to increase their luck. 2% chance for you to receive a duplicate of their looted items!
 */
function useLuck() {  
  let partyMembers = getPartyMembers();
  
  partyMembers = Object.values(partyMembers).filter(char =>
		parent.distance(char, character) <= Merchantkills.Luck.range
  );
	partyMembers.forEach(function (member) {
    actionText(parent.G.skills[Merchantkills.Luck.name].name, colorGreen);
    use_skill(Merchantkills.Luck.name, member.name);
    game_log("Used " + parent.G.skills[Merchantkills.Luck.name].name + " on " + member.name, colorGreen);
    lastUse_Luck = new Date();
  });    
}

/**
 * Terrified? Just throw whatever you can find at your opponent!
 */
function useThrowStuff(target) {
  use_skill(Merchantkills.ThrowStuff.name, target);
  lastUse_ThrowStuff = new Date();
}

function canUseCourage() {
  return (mssince(lastUse_Courage) > Merchantkills.Courage.cd && character.level >= Merchantkills.Courage.level);
}

function canUseLuck() {
  return (mssince(lastUse_Luck) > Merchantkills.Luck.cd && character.level >= Merchantkills.Luck.level);
}

function canUseThrowStuff() {
  return (mssince(lastUse_ThrowStuff) > Merchantkills.ThrowStuff.cd && character.level >= Merchantkills.ThrowStuff.level);
}

add_bottom_button(99, "Sell Items", function() {
  let i = prompt("Ab Slot#", 5);
  for (i; i < 42; i++) {
    sell(i);
  }
});