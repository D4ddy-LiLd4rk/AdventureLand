function fastTravelTown() {
  use_skill("use_town");
}

function travelTo(destination, destinationInTown) {
  if (destinationInTown) fastTravelTown();
  smart_move({ to: destination });

  /*switch (destination) {
    case "upgrade":
    case "compound":
      smart_move({ to: destination });
      break;
    case "exchange":
      smart_move({ to: destination });
      break;
    case "potions":
      smart_move({ to: destination });
      break;
    case "scrolls":
      smart_move({ to: destination });
      break;
    default:
      smart_move({ to: destination });
  }*/
}

function walkHalfwayToTarget(target) {
  move(
    character.x + (target.x - character.x) / 2,
    character.y + (target.y - character.y) / 2
  );
}

function walkToTargetWithinAttackRange(target) {
  //character.range
  move(
    character.x + (target.x - character.x) / 2,
    character.y + (target.y - character.y) / 2
  );
}