# AdventureLand
Adventure Land MMORPG 

This is my version of customizing and automating my chars in Adventure Land. Hope you enjoy my CODE.

You can simply copy&paste my code at your liking and maintain your ingame CODE manually or use my updateScript with the ingame snippet option.

In the end it  should look like this:

![Ingame CODE List](https://imgur.com/XKWDbV0.png)

# Update Script
To execute the script press "," ingame to open the snippet console:

![Ingame Snippet](https://i.imgur.com/LdXKE4I.png)

Insert the following code from [updateScript.js](https://github.com/D4ddy-LiLd4rk/AdventureLand/blob/master/updateScript.js)

```js
/*	
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

const baseURL = "https://raw.githubusercontent.com/D4ddy-LiLd4rk/AdventureLand/master/";

const allFiles = ["01_master.js",
  "02_constants.js",
  "03_movement.js",
  "04_attack.js",
  "05_consumables.js",
  "06_skills.js",
  "92_rogue.js",
  "93_priest.js",
  "94_ranger.js",
  "95_mage.js",
  "96_warrior.js",
  "97_merchant.js",
  "98_farming.js",
  "99_utils.js"];

parent.api_call("list_codes", {
  callback: function () {
    game_log("Updating from GitHub/D4ddy-LiLd4rk...");
    for (let file of allFiles) {
      let request = new XMLHttpRequest();
      request.open("GET", baseURL + file);
      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
          let codeObject = getCodeObject(file);
          let data = {
            name: codeObject.name,
            slot: codeObject.slot,
            code: request.responseText
          }
          parent.api_call("save_code", data);
          game_log("Saved to slot [" + codeObject.name + "] as " + codeObject.slot);
        }
      }
      request.send();
    }
  }
});

function getCodeObject(file) {
  let codeObject;

  let arr = file.substring(0, file.length - 3).split("_");

  codeObject = {
    slot: arr[0],
    name: arr[1]
  };

  return codeObject;
}
```
