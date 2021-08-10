const cron = require("node-cron");
const { data } = require("./utils");

cron.schedule("* * * * * *", () => {
    console.log("execution");
})
