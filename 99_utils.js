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

function createParty() {
  if (parent.isPartyLeader) {
    let party = [Characters.Warrior, Characters.Mage, Characters.Ranger, Characters.Merchant];

    for (let character in party) {
      if (character === parent.partyLeader) continue;
      send_party_invite(character);
    }
  }
}

function on_party_invite(name) {
  accept_party_invite(name);
}

function on_party_request(name) {
  accept_party_request(name);
}

function getPartyMembers() {
  return Object.values(parent.entities).filter(char =>
    char.type === "character" && !char.rip &&
    char.party && char.party === character.party);
}

function getPartyMembersIncludingSelf() {
  let partyMembers = Object.values(parent.entities).filter(char =>
    char.type === "character" && !char.rip &&
    char.party && char.party === character.party);

  partyMembers.push(character);

  return partyMembers;
}