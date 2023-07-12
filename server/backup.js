console.log("backup");
// Backup methods
// best practice mongodump --db quiz --archive=./server/public/QUIZ_BACKUP.gzip --gzip
// mongodump -d quiz -o ./
// mongodump --db database_name

// mongorestore --db=quiz_app --archive=./server/public/QUIZ_BACKUP.gzip --gzip

const { spawn } = require("child_process");
const path = require("path");
const cron = require("node-cron");

const DB_NAME = "quiz";
const ARCHIVE_PATH = path.join(__dirname, "public", `${DB_NAME}.gzip`);

// 0 */6 * * * Every Six hour
// 0 0 * * * take Every Day at 12 night
// 0 10 * * * take Every Day at 10 morning

cron.schedule("0 10 * * *", () => backup());

// backup();

function backup() {
  const child = spawn("mongodump", [
    `--db=${DB_NAME}`,
    `--archive=${ARCHIVE_PATH}`,
    `--gzip`,
  ]);

  child.stdout.on("data", (data) => {
    console.log("stdout:\n", data);
  });

  child.stderr.on("data", (data) => {
    console.log("stderr:\n", Buffer.from(data).toString());
  });

  child.on("error", (error) => {
    console.log("error:\n", error);
  });

  child.on("exit", (code, signal) => {
    if (code) {
      console.log("Process Code:", code);
    } else if (signal) {
      console.log("Process Killed With Signal:", signal);
    } else {
      console.log("Back is Successfull ✅✅");
    }
  });
}
