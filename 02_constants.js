/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

const colorGreen = "#1ED97C";
const colorWhite = "#EFF6FF";
const colorShading = "#909CC0";
const colorNavy = "#1C222B";


var Characters;
(function (Characters) {
  Characters["Warrior"] = "D4ddy001";
  Characters["Mage"] = "D4ddy002";
  Characters["Ranger"] = "D4ddy003";
  Characters["Merchant"] = "D4ddy004";
})(Characters || (Characters = {}));

var CharacterTypes;
(function (CharacterTypes) {
  CharacterTypes["Mage"] = "mage";
  CharacterTypes["Merchant"] = "merchant";
  CharacterTypes["Priest"] = "priest";
  CharacterTypes["Ranger"] = "ranger";
  CharacterTypes["Rogue"] = "rogue";
  CharacterTypes["Warrior"] = "warrior";
})(CharacterTypes || (CharacterTypes = {}));

var ItemTypes;
(function (ItemTypes) {
  ItemTypes["Activator"] = "activator";
  ItemTypes["Amulet"] = "amulet";
  ItemTypes["Belt"] = "belt";
  ItemTypes["Booster"] = "booster";
  ItemTypes["Box"] = "box";
  ItemTypes["Cape"] = "Cape";
  ItemTypes["Chest"] = "chest";
  ItemTypes["CompoundScroll"] = "cscroll";
  ItemTypes["Computer"] = "computer";
  ItemTypes["Cosmetics"] = "cosmetics";
  ItemTypes["Earring"] = "earring";
  ItemTypes["Elixir"] = "elixir";
  ItemTypes["Figurine"] = "figurine";
  ItemTypes["Flute"] = "flute";
  ItemTypes["Gem"] = "gem";
  ItemTypes["Gloves"] = "gloves";
  ItemTypes["Helmet"] = "helmet";
  ItemTypes["Jar"] = "jar";
  ItemTypes["Key"] = "key";
  ItemTypes["Licence"] = "licence";
  ItemTypes["Material"] = "material";
  ItemTypes["Misc"] = "misc";
  ItemTypes["MiscOffhand"] = "misc_offhand";
  ItemTypes["Offering"] = "offering";
  ItemTypes["Orb"] = "orb";
  ItemTypes["Pants"] = "pants";
  ItemTypes["Pet"] = "pet";
  ItemTypes["PetLicence"] = "petlicence";
  ItemTypes["PlayerScroll"] = "pscroll";
  ItemTypes["Potion"] = "pot";
  ItemTypes["Qubics"] = "qubics";
  ItemTypes["Quest"] = "quest";
  ItemTypes["Quiver"] = "quiver";
  ItemTypes["Ring"] = "ring";
  ItemTypes["Shield"] = "shield";
  ItemTypes["Shoes"] = "shoes";
  ItemTypes["SkillItem"] = "skill_item";
  ItemTypes["Source"] = "source";
  ItemTypes["Stand"] = "stand";
  ItemTypes["Stone"] = "stone";
  ItemTypes["Throw"] = "throw";
  ItemTypes["Token"] = "token";
  ItemTypes["Tome"] = "tome";
  ItemTypes["UpgradeScroll"] = "uscroll";
  ItemTypes["Weapon"] = "weapon";
  ItemTypes["XP"] = "xp";
})(ItemTypes || (ItemTypes = {}));

var JewelryTypes;
(function (JewelryTypes) {
  JewelryTypes["Amulet"] = "amulet";
  JewelryTypes["Earring"] = "earring";
  JewelryTypes["Orb"] = "orb";
  JewelryTypes["Ring"] = "ring";
})(JewelryTypes || (JewelryTypes = {}));

var ArmorTypes;
(function (ArmorTypes) {
  ArmorTypes["Belt"] = "belt";
  ArmorTypes["Cape"] = "Cape";
  ArmorTypes["Chest"] = "chest";
  ArmorTypes["Gloves"] = "gloves";
  ArmorTypes["Helmet"] = "helmet";
  ArmorTypes["Pants"] = "pants";
  ArmorTypes["Shield"] = "shield";
  ArmorTypes["Shoes"] = "shoes";
})(ArmorTypes || (ArmorTypes = {}));

var WeaponTypes;
(function (WeaponTypes) {
  WeaponTypes["Axe"] = "axe";
  WeaponTypes["Basher"] = "basher";
  WeaponTypes["Bow"] = "bow";
  WeaponTypes["Dagger"] = "dagger";
  WeaponTypes["Dart"] = "dart";
  WeaponTypes["Fist"] = "fist";
  WeaponTypes["Hammer"] = "hammer";
  WeaponTypes["Mace"] = "mace";
  WeaponTypes["ShortSword"] = "short_sword";
  WeaponTypes["Spear"] = "spear";
  WeaponTypes["Staff"] = "staff";
  WeaponTypes["Stars"] = "stars";
  WeaponTypes["WonderBlade"] = "wblade";
})(WeaponTypes || (WeaponTypes = {}));

var DamageTypes;
(function (DamageTypes) {
  DamageTypes["Heal"] = "heal";
  DamageTypes["Magical"] = "magical";
  DamageTypes["Physical"] = "physical";
})(DamageTypes || (DamageTypes = {}));

var MageSkills;
(function (MageSkills) {
  MageSkills["Blink"] = {
    name: "blink",
    mp: 1600,
    cd: 1200
  };
  MageSkills["ManaBurst"] = {
    name: "burst",
    cd: 6000
  };
  MageSkills["ControlledManaBurst"] = {
    name: "cburst",
    cd: 6000,
    level: 75
  };
  MageSkills["Energize"] = {
    name: "energize",
    cd: 4000,
    range: 320,
    level: 20
  };
  MageSkills["Light"] = {
    name: "light",
    mp: 2000
  };
  MageSkills["Magiport"] = {
    name: "magiport",
    mp: 900
  };
})(MageSkills || (MageSkills = {}));

var Merchantkills;
(function (Merchantkills) {
  Merchantkills["Courage"] = {
    name: "mcourage",
    mp: 2400,
    cd: 2000,
    level: 70
  };
  Merchantkills["Luck"] = {
    name: "mluck",
    mp: 10,
    cd: 100,
    range: 320,
    level: 40
  };
  Merchantkills["ThrowStuff"] = {
    name: "throw",
    mp: 200,
    cd: 400,
    range: 200,
    level: 60
  };
})(Merchantkills || (Merchantkills = {}));

var PriestSkills;
(function (PriestSkills) {
  PriestSkills["Blink"] = {
    name: "blink"
  };
  PriestSkills["ManaBurst"] = {
    name: "burst"
  };
  PriestSkills["ControlledManaBurst"] = {
    name: "cburst"
  };
  PriestSkills["Energize"] = {
    name: "energize"
  };
  PriestSkills["Light"] = {
    name: "light"
  };
  PriestSkills["Magiport"] = {
    name: "magiport"
  };
})(PriestSkills || (PriestSkills = {}));

var RangerSkills;
(function (RangerSkills) {
  RangerSkills["ThreeShot"] = {
    name: "3shot",
    mp: 300,
    level: 60
  };
  RangerSkills["FourFingerTechnique"] = {
    name: "4fingers",
    mp: 260,
    duration: 5000,
    cd: 40000,
    range: 120,
    level: 64
  };
  RangerSkills["FiveShot"] = {
    name: "5shot",
    mp: 420,
    level: 75
  };
  RangerSkills["PoisonArrow"] = {
    name: "poisonarrow",
    mp: 360,
    cd: 300
  };
  RangerSkills["Supershot"] = {
    name: "supershot",
    mp: 400,
    cd: 30000
  };
  RangerSkills["Track"] = {
    name: "track",
    mp: 80,
    cd: 1600,
    range: 1440
  };
})(RangerSkills || (RangerSkills = {}));

var RogueSkills;
(function (RogueSkills) {
  RogueSkills["Blink"] = {
    name: "blink"
  };
  RogueSkills["ManaBurst"] = {
    name: "burst"
  };
  RogueSkills["ControlledManaBurst"] = {
    name: "cburst"
  };
  RogueSkills["Energize"] = {
    name: "energize"
  };
  RogueSkills["Light"] = {
    name: "light"
  };
  RogueSkills["Magiport"] = {
    name: "magiport"
  };
})(RogueSkills || (RogueSkills = {}));

var WarriorSkills;
(function (WarriorSkills) {
  WarriorSkills["Agitate"] = {
    name: "agitate",
    mp: 420,
    cd: 2200,
    range: 320,
    level: 68
  };
  WarriorSkills["Charge"] = {
    name: "charge",
    duration: 3200,
    cd: 40000
  };
  WarriorSkills["Cleave"] = {
    name: "cleave",
    mp: 720,
    cd: 1200,
    range: 160,
    level: 52
  };
  WarriorSkills["HardShell"] = {
    name: "hardshell",
    mp: 480,
    duration: 8000,
    cd: 16000,
    level: 60
  };
  WarriorSkills["Stomp"] = {
    name: "stomp",
    mp: 120,
    duration: 3200,
    cd: 24000,
    range: 400,
    level: 52
  };
  WarriorSkills["Taunt"] = {
    name: "taunt",
    mp: 40,
    cd: 3000,
    range: 200
  };
  WarriorSkills["WarCry"] = {
    name: "warcry",
    mp: 320,
    duration: 8000,
    cd: 60000,
    range: 600,
    level: 70
  };
})(WarriorSkills || (WarriorSkills = {}));