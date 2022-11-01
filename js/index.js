import log from "@ajar/marker";
console.time("my benchmark");
import fs from "fs/promises";

async function ReadFiles() {
  try {
    let userData = [];
    let facebook_id = [];
    
    const files = await fs.readdir("./files");

    //run over all of the files
    for (let file of files) {
      let fileContent = await fs.readFile(`./files/${file}`, "utf-8");
      let lines = fileContent.split(`\r\n`);

      //creat users
      for (let i = 0; i < lines.length; i++) {
        let data = lines[i].split(",");
        let user = {
          facebook_id: data[0],
          full_name: data[1].slice(1, data[1].length - 1),
          email: data[2],
        };

        //Make sure each user appears only once.
        if (!facebook_id.includes(`'${data[0]}'`)) {
          userData.push(user);
          facebook_id.push(`'${data[0]}'`);
        }
      }
      //Convert data to a string
      userData = JSON.stringify(userData);

      // print number of unic users
      log.magenta(`There are ${userData.length} users`);

      //write the data to a new file
      fs.writeFile("./files/results.json", userData);
    }
  } catch (err) {
    log.red(err);
  }
  console.timeEnd("my benchmark");
}
ReadFiles();
