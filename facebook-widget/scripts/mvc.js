//// Backbone functions ////

var App = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {}
};

//// MODELS ////

    var User = Backbone.Model.extend({
        url: '',
        defaults: {
            "firstname" : "",
            "lastname" : "",
            "age" : "",
            "gender" : "",
            "type" : ""
        },
        initialize: function() {
            this.set(this.defaults);
            /*this.set({name: user.name, age: user.age});*/
        },
        defineType: function() {
            defineUserType(user);
        }
    });

    //// COLLECTIONS ////

    var Users = Backbone.Collection.extend({
        model: User
    });

    //// VIEWS ////

    var UserData = Backbone.View.extend({
        render: function() {
            $('.userdata').html(
                "<h2>Hallo " + user.attributes.firstname + "!<h2/>" +
                "<p>Welkom bij Spaarnwoude</p>" +
                "<img id='userImg' src='" + user.attributes.userImg + "'>"
            );       
        }
    });

    //// ROUTERS ////

    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'test': 'test'
        }
    });

    var userdata = new UserData();

    var router = new Router();
    router.on('route:index', function() {
        console.log("Index.html");
    });

    Backbone.history.start();

    /// GLOBAL FUNCTIONS ////

    function fbLogout() {
        FB.logout(function(response) {
            location.reload();
        });
    }

    function defineUserType(user) {

        var type = { "technologist": "0" , "lazy": "0", "musical": "0" };

        /*var lazy = 0;
        var musical = 0;
        var technologist = 0;*/

        for (var key in user.attributes.likes_objects) {
          if (user.attributes.likes_objects.hasOwnProperty(key)) {
            /*console.log(key + " -> " + user.attributes.likes_objects[key].category);*/
            if (user.attributes.likes_objects[key].category === "Spas/beauty/personal care") {
                type.lazy++;
            };
            if (user.attributes.likes_objects[key].category === "Musician/band") {
                type.musical++;
            };
            if (user.attributes.likes_objects[key].category === "Computers/technology" || user.attributes.likes_objects[key].category === "Internet/software" || user.attributes.likes_objects[key].category === "Software" || user.attributes.likes_objects[key].category === "Website") {
                type.technologist++;
            };
          }
        };
        
        /*if (type.lazy > 0) {
            console.log('lazy = ' + type.lazy);
        };

        if (type.musical > 0) {
            console.log('Musical = ' + type.musical);
        };
        if (type.technologist > 0) {
            console.log('technologist = ' + type.technologist);
        };*/

        user.set({ type: type });
    }

    function getDistanceFromLatLonInKm(lat2,lon2) {
      var lat1 = 52.40461;
      var lon1 = 4.69455;
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
