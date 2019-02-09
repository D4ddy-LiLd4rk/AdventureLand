/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

function fastTravelTown() {
  use_skill("use_town");
}

function travelTo(destination, destinationInTown) {
  if (destinationInTown) smart.use_town = true;
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
  //TODO: walk towards target to hit it (useful for ranged chars)
  //character.range
  move(
    character.x + (target.x - character.x) / 2,
    character.y + (target.y - character.y) / 2
  );
}