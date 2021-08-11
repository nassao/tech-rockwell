const cron = require('node-cron');

const { http, data } = require('../utils');

class Scraper {
    // Maximum lenght to show
    maxLenght = 1000;
    fileName = 'lastResult.json';

    constructor() {
        this.task = cron.schedule('* * * * * *', () => {}, {
            scheduled: false
        });
    }

    /**
     * 
     * @param {string} cronExpression Cron expression to schedule
     * @param {string} url URL of resource to call
     */
    scheduleTask(cronExpression, url) {
        // Stop previous task
        this.task.stop();

        this.task = cron.schedule(cronExpression, () => {
            this.scrapUrl(url);
        });
    }

    async scrapUrl (url) {

        const siteResponse = await http.get(url);
        var siteHeaders = siteResponse.headers;

        while (JSON.stringify(siteHeaders).length > this.maxLenght) {
            const keysArray = Object.keys(siteHeaders);
            const lastKey = keysArray.pop();
            delete siteHeaders[lastKey];
        }

        const lastResult = {
            url,
            headers: siteHeaders
        }

        data.removeItem(this.fileName);
        data.setItem(this.fileName, JSON.stringify(lastResult));
    }
}

module.exports = new Scraper();
