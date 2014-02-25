# Copass Hook

This app will automatically update the issues you referenced in you commits (eg. `This commit fixes #34`) by adding a milestone (eg. `In dev` or `In Prod`) depending on the config you set.

We have 2 apps here:
- <main_app> : copass
- <hook_app> : copass-hook (this app)

1. Clone <hook_app>

2. Create a milestone in github's <main_app>. Retrieve its number by filtering over the milestone and looking at the url : https://github.com/copass/copass/issues?milestone=<milestone_id>

3. Update `server.js` on line 16:

```js
var appNameToMilestoneNumber = {
  <main_app> : <milestone_id>
}
```

4. Commit changes: `git commit -am 'Updated milestone numbers'`

5. Create a heroku app for <hook_app> and push to heroku `git push heroku master`

6. Add environment variables to <hook_app>: `heroku --app <hook_app> config:set GITHUB_NAME=<GITHUB_NAME> GITHUB_PASSWORD=<GITHUB_PASSWORD>`

7. Add the deploy-hook to you heroku <main_app> ([doc](https://devcenter.heroku.com/articles/deploy-hooks)) : `heroku addons:add deployhooks:http --url=http://<hook_app>.herokuapp.com`

8. You are good to go!

### TODOS:

- Move appNameToMilestoneNumber to environment config
- Change authentication system
- Improve interactions with github (play with labels, check current milestone before updating)
- Find a solution to auto-update forgotten issues