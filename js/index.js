import log from "@ajar/marker";
console.time("my benchmark");
import fs from "fs/promises";

async function ReadFiles() {
  try {
    let userData = [];
    let user_id = [];

    const files = await fs.readdir("./files");

    //run over all of the files
    for (let file of files) {
      let fileContent = await fs.readFile(`./files/${file}`, "utf-8");
      let lines = fileContent.split(`\r\n`);

      //creat users
      for (const line of lines) {
        let [facebook_id, full_name, email] = line.split(",");
        let user = {
          facebook_id,
          full_name: full_name.slice(1, full_name.length - 1),
          email,
        };

        //Make sure each user appears only once.
        if (!user_id.includes(`'${facebook_id}'`)) {
          userData.push(user);
          user_id.push(`'${facebook_id}'`);
        }
      }
    }
    // print number of unic users
    log.magenta(`There are ${userData.length} users`);

    //write the data to a new file and Convert data to a string
    await fs.writeFile("./files/results.json", JSON.stringify(userData, null, 2));

  } catch (err) {
    log.red(err);
  }
  console.timeEnd("my benchmark");
}
ReadFiles();
