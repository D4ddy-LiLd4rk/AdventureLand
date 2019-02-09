/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

function getDifference(a, b) {
  return Math.abs(a - b);
}

function isBelowPercent(current, max, percentage) {
  return current / max < percentage;
}

function isAbovePercent(current, max, percentage) {
  return current / max > percentage;
}

function actionText(text, color) {
  parent.d_text(text, character, { color: color });
}

function roundBy(a, b) {
  return Math.round(a / b) * b;
}

function roundDownBy(a, b) {
  return Math.floor(a / b) * b;
}

function roundUpBy(a, b) {
  return Math.ceil(a / b) * b;
}

function partyHandler() {
  if (parent.isPartyLeader) {
    createParty();
  } else {
    if (character.party && character.party !== "D4ddy001") leaveParty();
  }
}

function createParty() {
    let party = [Characters.Warrior, Characters.Mage, Characters.Ranger, Characters.Merchant];

    for (let index in party) {
      if (party[index] === "D4ddy001") continue;
      if (!parent.party[party[index]]) send_party_invite(party[index]);
    }
}

function on_party_invite(name) {
  if (!character.party && "D4ddy001" === name) accept_party_invite(name);
}

function on_party_request(name) {
  if (!character.party && "D4ddy001" === name) accept_party_request(name);
}

function leaveParty() {
  parent.socket.emit("party", {event: "leave"});
}

function getPotionsInInventory() {
  return Object.values(character.items).filter(item => 
    item &&
    parent.G.items[item.name].type === "pot"     
  );
}

function getPartyMembers() {
  return Object.values(parent.entities).filter(char =>
    is_character(char) && !char.rip &&
    char.party && char.party === character.party);
}

function getPartyMembersIncludingSelf() {
  let partyMembers = getPartyMembers();
  partyMembers.push(character);

  return partyMembers;
}

function getMonstersNearby(distance) {
  if (!distance) distance = character.range;
  return Object.values(parent.entities).filter(monster =>
    is_monster(monster) && parent.distance(monster, character) <= distance);
}
/*
function bank_store(num, pack, pack_slot) {
  // bank_store(0) - Stores the first item in inventory in the first/best spot in bank
  // parent.socket.emit("bank",{operation:"swap",pack:pack,str:num,inv:num});
  // Above call can be used manually to pull items, swap items and so on - str is from 0 to 41, it's the storage slot #
  // parent.socket.emit("bank",{operation:"swap",pack:pack,str:num,inv:-1}); <- this call would pull an item to the first inventory slot available
  // pack is one of ["items0","items1","items2","items3","items4","items5","items6","items7"]
  if (!character.bank) return game_log("Not inside the bank");
  if (!character.items[num]) return game_log("No item in that spot");
  if (!pack_slot) pack_slot = -1; // the server interprets -1 as first slot available
  if (!pack) {
    var cp = undefined, cs = undefined;
    bank_packs.forEach(function (cpack) {
      if (!character.bank[cpack]) return;
      for (var i = 0; i < 42; i++) {
        if (pack) return;
        if (can_stack(character.bank[cpack][i], character.items[num])) // the item we want to store and this bank item can stack - best case scenario
        {
          pack = cpack;
        }
        if (!character.bank[cpack][i] && !cp) {
          cp = cpack;
        }
      }
    });
    if (!pack && !cp) return game_log("Bank is full!");
    if (!pack) pack = cp;
  }
  parent.socket.emit("bank", { operation: "swap", pack: pack, str: -1, inv: num });
}*/