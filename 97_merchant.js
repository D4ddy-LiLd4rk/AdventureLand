/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

let movingToChar = false;
let movingToBank = false;

let justRespawned = false;
let oldLocation = {};

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
    respawn();
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

  checkHealthAndManaPotionsInInventory();
  restoreHealthOrMana();

  fastTravelTown();

  if (needMoney()) {
    smart_move({ to: "bank", return: true }, function () { withdrawMoney(); });
    return;
  }

  if (needPotions()) {
    smart_move({ to: "potions", return: true }, function () { buyPotions(); });
    return;
  }

  smart_move({ to: "bank", return: true }, function () { depositGold(); depositItems(); });
}, 1000 / 4); //loop every 2 seconds

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
  for (member in potions) {
    if (get_player(member)) {
  if (member.inventory.hpot0.q - 200 < 0) send_item(member.name, getItemSlot("hpot0"), getDifference(member.inventory.hpot0.q, 200));
  if (member.inventory.hpot1.q - 200 < 0) send_item(member.name, getItemSlot("hpot1"), getDifference(member.inventory.hpot1.q, 200));
  if (member.inventory.mpot0.q - 200 < 0) send_item(member.name, getItemSlot("mpot0"), getDifference(member.inventory.mpot0.q, 200));
  if (member.inventory.mpot1.q - 200 < 0) send_item(member.name, getItemSlot("mpot1"), getDifference(member.inventory.mpot1.q, 200));
    }
  }
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
      smart_move({ x: data.x, y: data.y, map: data.map }, function () { askForPotions() });
    }
    if ("potions" in data) {
      potions[name] = data.potions;
      deliverPotions();
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
    if (!character.items[item] && parent.G.items[character.items[item].name].type !== ItemTypes.Potion) continue;
    bank_store(item);
  }
}