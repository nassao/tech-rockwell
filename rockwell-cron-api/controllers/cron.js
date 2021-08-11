const { request, response } = require('express');
const cron = require('node-cron');
const Scraper = require('./scraper');

/**
 * Get the result of the last execution
 * @param {*} req Request
 * @param {*} res Response
 */
const cronGet = (req = request, res = response) => {
    const { url } = req.body;
    const { id } = req.params;
    const { q } = req.query;

    res.json({
        task: {
            expression: '* * * * * *',
            url: 'https://agile.nassao.com/',
        },
        response: '{"date":"Tue, 10 Aug 2021 21:27:30 GMT","server":"Apache","link":"<https://agile.nassao.com/wp-json/>; rel=\"https://api.w.org/\"","upgrade":"h2,h2c","connection":"Upgrade, close","vary":"Accept-Encoding","transfer-encoding":"chunked","content-type":"text/html; charset=UTF-8"}'
    })
};

/**
 * Validates the cron expression
 * @param {*} req Request
 * @param {*} res Response
 */
const cronPost = (req = request, res = response) => {
    const { url, expression } = req.body;

    const validCronExpression = cron.validate(expression);

    if (validCronExpression) {
        Scraper.scheduleTask(expression, url);

        res.json({
            message: 'Task successfully scheduled'
        })
    } else {
        res.status(400).json({
            message: 'Invalid cron expression'
        })
    }
};

module.exports = {
    cronGet,
    cronPost
}