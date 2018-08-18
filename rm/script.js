/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log('hi');


var pubnub = new PubNub({
    subscribeKey: 'sub-c-cc23b78e-95a4-11e8-a3d3-06c892d4f3de', // always required
    publishKey: 'pub-c-a0ea2960-92f2-41b9-a2b9-05922493a5da' // only required if publishing
});


console.log('pubnub newed');

pubnub.addListener({
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel for which the message belongs
        var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload
        var publisher = m.publisher; //The Publisher
        console.log("message "+m.message );
    },
    presence: function(p) {
        // handle presence
        var action = p.action; // Can be join, leave, state-change or timeout
        var channelName = p.channel; // The channel for which the message belongs
        var occupancy = p.occupancy; // No. of users connected with the channel
        var state = p.state; // User State
        var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        var publishTime = p.timestamp; // Publish timetoken
        var timetoken = p.timetoken;  // Current timetoken
        var uuid = p.uuid; // UUIDs of users who are connected with the channel
        console.log("presence "+p.action );
      
    },
    status: function(s) {
        var affectedChannelGroups = s.affectedChannelGroups;
        var affectedChannels = s.affectedChannels;
        var category = s.category;
        var operation = s.operation;
        console.log("statuse "+s.operation );
      
    }
});


  // subscribe to the game channel and monitor presence events on that channel
  pubnub.subscribe({
    channels: ["thunder"],
    withPresence: true
  });

function getTime() {
  // assuming an initialized PubNub instance already exists
  pubnub.time(function(status, response) {
      if (status.error) {
          // handle error if something went wrong based on the status object
      } else {
          console.log("time "+response.timetoken);
      }
  })
}

function push() {
  pubnub.publish(
      {
          message: "strike",
          channel: 'thunder',
          sendByPost: false, // true to send via post
          storeInHistory: false, //override default storage options
      },
      function (status, response) {
          // handle status, response
      }
  );
}

