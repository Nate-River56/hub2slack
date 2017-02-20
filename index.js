var aws = require('aws-sdk');
var request = require('request');

var comments = require('./comments.js');

exports.handler = function(event, context){
    console.log('Received event:', JSON.stringify(event, null, 2));

    var eventName = event.Records[0].Sns.MessageAttributes['X-Github-Event'].Value;
    var msg = JSON.parse(event.Records[0].Sns.Message);
    var text = '';
    
    switch (eventName) {
        case 'issue_comment':
        case 'pull_request_review_comment':
          text += comments.pull_request_review_comment(msg);
        break;
        case 'issues':
          text += comments.issues(msg);
        break;
        case 'push':
          text += comments.push(msg);
        break;
        case 'pull_request':
          text += comments.pull_request(msg);
        break;
    }
    
    if (!text) {
        context.done();
        return;
    }
    
    console.log(text)
    
    request({
        url: process.env.SLACK_WEBHOOK_URL,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        json: {text: text, link_names: 1}
    }, function () {
        context.done();
    });

};
