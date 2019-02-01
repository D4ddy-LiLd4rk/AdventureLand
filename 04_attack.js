/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

function attackMonster(monster) {
  if (!parent.attackActive || character.rip || is_moving(character)) return;

  var target = get_targeted_monster();
  if (!target) {
    target = get_nearest_monster(monster);
    if (target) change_target(target);
    else {
      set_message("No Monsters");
      return;
    }
  }

  if (!in_attack_range(target)) {
    if (parent.walkingActive) {
      walkHalfwayToTarget(target);
      // Walk half the distance
    }
  }
  else if (can_attack(target)) {
    set_message("Attacking");
    attack(target);
  }
}