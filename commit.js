const util = require("util");
const { exec } = require("child_process");
const execAsync = util.promisify(exec);

Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function random(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

async function run() {
    const days = 10;
    let date = new Date('11-13-2022');
    for (let i = 0; i < days; i++) {
        if (!random(0, 1)) continue;
        date = await date.addDays(1);
        console.log(date);
        await execAsync(`echo "Date commit: ${date}" > dates.txt`);
        await execAsync(`git add dates.txt`);
        console.log('Commit:', await execAsync(`git commit --quiet --date "${date}" -m "Pasted date"`));
        await sleep(100);
    }
}
run();
