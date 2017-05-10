const express = require('express')
const router = express.Router()

var fs = require('fs')
var readline = require('readline')
var google = require('googleapis')
var googleAuth = require('google-auth-library')
var events
var eventArr= new Array()
function eventSum(title, id, startTime, endTime) {
  this.title = title
  this.id = id
  this.start = startTime
  this.end = endTime
}
var calendar = google.calendar('v3')
var auth
var clientSecret
var clientId
var redirectUrl
var oauth2Client
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar']
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/'
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json'

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err)
    return
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(content), listEvents)
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  this.clientSecret = credentials.installed.client_secret
  this.clientId = credentials.installed.client_id
  this.redirectUrl = credentials.installed.redirect_uris[0]
  this.auth = new googleAuth()
  this.oauth2Client = new this.auth.OAuth2(this.clientId, this.clientSecret, this.redirectUrl);
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback)
    } else {
      this.oauth2Client.credentials = JSON.parse(token)
      callback(oauth2Client)
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl)
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err)
        return
      }
      oauth2Client.credentials = token
      storeToken(token)
      callback(oauth2Client)
    })
  })
}


/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR)
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token))
  console.log('Token stored to ' + TOKEN_PATH)
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

function listEvents(auth) {
  this.auth = auth
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err)
      return
    }
     events = response.items

    //return events;
    if (events.length == 0) {
      console.log('No upcoming events found.')
    } else {
      console.log('Upcoming 10 events:')
      for (var i = 0; i < events.length; i++) {
        var event = events[i]
        eventArr.push(new eventSum(event.summary,event.id, event.start.dateTime, event.end.dateTime))
        var start = event.start.dateTime || event.start.date
        //eventSum =event.summary
        console.log('%s - %s', start, event.summary)
        }
      }
    })
  }


  router.get('/getEvents',(req, res, next) => {
  res.send(eventArr)
  })


router.post('/register', (req, res, next)=>{
  console.log(auth)
  const starTime = req.body.startTime
  const endTime = req.body.endTime
  const name = req.body.name
  const email = req.body.email
  var event = {
    'summary': name,
    'location': 'Room 1',
    'start': {
      'dateTime': starTime,
      'timeZone': 'Sweden/Stockholm',
    },
    'end': {
      'dateTime': endTime,
      'timeZone': 'Sweden/Stockholm',
    },
    'recurrence': [],
    'attendees': [
      {'email': email },
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  }

  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
      res.json({
        success: false,
        msg:'Booking was unsuccessful',
        err: err
      })
    }else {
      console.log('Event created: %s', event.htmlLink)
        res.send({success: true,
                  msg:'Booking Successful'},
                  event.htmlLink)
                }
    })
  })


  module.exports = router
