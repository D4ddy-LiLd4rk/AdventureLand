/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

let movingToChar = false;
let movingToBank = false;

let justRespawned = false;
let oldLocation = {};

let coordsBooster = {x: 192, y:-538, map: main};

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
}, 1000 / 4); //loop every 2 seconds

function needMoney() {
  return character.gold < 300000;
}

function withdrawMoney() {
  bank_withdraw(Math.abs(character.gold - 300000));
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

  if (Math.abs(quantitySmallHP - 600) > 0) buy("hpot0", Math.abs(quantitySmallHP - 600));
  if (Math.abs(quantityBigHP - 600) > 0) buy("hpot1", Math.abs(quantityBigHP - 600));
  if (Math.abs(quantitySmallMP - 600) > 0) buy("mpot0", Math.abs(quantitySmallMP - 600));
  if (Math.abs(quantityBigMP - 600) > 0) buy("mpot1", Math.abs(quantityBigMP - 600));
}

function on_cm(name, data) {
  if (!is_moving(character) || !get_player(name)) {
    closeMerchStand();
    smart_move({ x: data.x, y: data.y, map: data.map });
    moveToChar();
  }

  if (data == "done") {
    travelTo("bank", true);
    moveToBank();
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
    bank_store(item);
  }
}