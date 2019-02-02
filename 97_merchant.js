/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

let movingToChar = false;
let movingToBank = false;

function init() {

}

setInterval(function doMerchantStuff() {
  if (isInsideBank()) {
    depositGold();
    depositItems();
  }
}, 2000); //loop every 2 seconds

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
  if (character.gold > 100000) {
    bank_deposit(character.gold - 100000);
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