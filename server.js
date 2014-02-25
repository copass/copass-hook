var express = require('express');
var app = express();
var https = require("https");

app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);


var addLabel = function(app_name, issueNumber) {
	console.log('Hooking '+ app_name + ', issue #'+issueNumber);

	var username = process.env.GITHUB_NAME||'YOUR-GITHUB-USERNAME';
	var password = process.env.GITHUB_PASSWORD||'YOUR-GITHUB-PASSWORD';

	var appNameToMilestoneNumber = {
		'copass-dev' : 11,
		'copass' : 12
	}

	var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
	var data = '{"milestone": '+(appNameToMilestoneNumber[app_name]||0)+'}';

	var options = {
	  host: 'api.github.com',
	  path: '/repos/copass/copass/issues/'+issueNumber,
	  method: 'PATCH',
	  headers: {
		  'User-Agent': 'Copass-Hook',
		  'Authorization': auth,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
		}
	};

	var req = https.request(options, function(res) {
		if (parseInt(res.headers.status) == 200) {
	  	console.log('#'+issueNumber+' successfully hooked');	
		}
	});
	req.end(data);

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

}

app.get('/', function(req, res) {
	console.log(req)
	res.send("<h1>Welcome to the Copass Hooks Apps</h1>");
	res.send("<p>POST / [log]={{log}} will hook github repository to add labels</p>");
});

app.post('/', function(req, res) {
	console.log(req.body);
	app_name = req.body.app;
	matches = req.body.git_log.match(/(fixes?|closes?) #\d+/g);
	for (var i = 0; i < matches.length; i++) {
		issue_number = parseInt(matches[i].replace(/.* #/, ''));
		addLabel(app_name, issue_number);
	};

	res.send('Ok, updated milestone to github for '+ matches.length + ' issues');
});

var port = process.env.PORT || 9000;
app.listen(port, function() {
	console.log('Listening on port ' + port + ' in ' + app.get('env') + ' mode');
});