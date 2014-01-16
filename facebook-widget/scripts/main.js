var user = new User;  
user.on('change', userdata.render, this);

var updateStatusCallback;

    $.ajaxSetup({ cache: true });

    function firstAjax() {
        return $.getScript('//connect.facebook.net/en_UK/all.js', function(){
        FB.init({
          appId: '299004140247778',
          channelUrl : 'http://localhost/',
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
        });     
        $('#loginbutton,#feedbutton').removeAttr('disabled');
      });
    }

    function secondAjax() {
        return FB.Event.subscribe('auth.authResponseChange', function(response) {
        // Here we specify what we do with the response anytime this event occurs. 
            if (response.status === 'connected') {
                console.log("Connected with Facebook.");
                $('#fb-button').hide();
                setTimeout(function(){
                    $('#fb-root').append("<button onclick='fbLogout()'>Logout</button>");
                    $('.userdata').fadeIn(200);
                },500);
                // var test = user;
                // console.log(test);

                FB.api('/me', function(response) {
                    console.log(response);
                    var firstname = response.first_name;
                    var lastname = response.last_name;
                    var age = calcAge(response.birthday);
                    var gender = response.gender;
                    user.set({firstname: firstname, lastname: lastname, age: age, gender: gender});
                });

                FB.api('/me/picture?width=156&height=156', function(response) {
                    var img = response.data.url;
                    user.set({userImg: img });
                });

                FB.api(
                  {
                    method: 'fql.query',
                    query: 'select author_uid,coords,timestamp,message,checkin_id from checkin WHERE author_uid in(SELECT uid2 FROM friend WHERE uid1 = me()) LIMIT 50,100'
                  },
                  function(response) {
                    var all = new Backbone.Collection;
                    $.each(response, function(i) {
                        var longitude = this.coords.longitude;
                        var latitude = this.coords.latitude;
                        var distance = getDistanceFromLatLonInKm(latitude,longitude);
                        if (distance < 3) {
                            all.add(
                              {author_uid: this.author_uid, latitude: this.coords.latitude, longitude: this.coords.longitude, timestamp: this.timestamp, message: this.message}
                            );
                        }
                    });
                  }
                );

                var apis = ['movies', 'music', 'sports', 'activities', 'likes'];

                apis.forEach(function(temp) {
                    FB.api('/me/' + temp, function(response) {
                        if(!(response.error || response.data.length === 0)) {
                            var data = response.data;
                            var length = response.data.length;
                            var setString = temp; 
                            user.set(setString, length);
                            user.set(setString + '_objects', data);
                            /*$('#fb-' + temp).html('Amount of ' + temp + ' : ' + length);*/
                        }else {
                            console.log('No ' + temp + ' detected.');
                        }
                    });
                });
                
            } else if (response.status === 'not_authorized') {
                console.log("Not authorized.");
            } else {
                console.log("Not connected with Facebook.");
            }
        });
    }

    $.when(firstAjax()).pipe(secondAjax).done(function() {
        userdata.render();
    });


function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000));
}
    