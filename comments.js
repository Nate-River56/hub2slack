
var link = function (url, text) {
  return '<' + url + '|' + text + '>';
};

exports.push = function(msg){
  var text = 'Pushed' + "\n";

  text += msg.compare + "\n";
  for (var i = 0; i < msg.commits.length; i++) {
      var commit = msg.commits[i];
      text += link(commit.url, commit.id.substr(0, 8)) + ' ' + commit.message + ' - ' + commit.author.name + "\n";
  }
  return text;
}

exports.pull_request = function(msg){
  var text = '';
  var pull_request = msg.pull_request;

  if (msg.action == 'opended' || msg.action == 'closed') {
      text += 'Pull Request ' + msg.action + "\n";
      text += pull_request.title + "\n";
      text += pull_request.body + "\n";
      text += pull_request.html_url;
  }
  return text;
}

exports.pull_request_review_comment = function(msg){
  var text = '';
  var comment = msg.comment;

  text += comment.user.login + ": \n";
  //text += convertName(comment.body) + "\n";
  text += comment.html_url;
  return text;
}

exports.issues = function(msg){
  var text = '';
  var issue = msg.issue;

  if (msg.action == 'opended' || msg.action == 'closed') {
      text += 'Issue ' + msg.action + "\n";
      text += link(issue.html_url, issue.title);
  }
  return text;
}


