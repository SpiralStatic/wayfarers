$(function() {
    $.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyCOuJieqxDGIPhqPY0fCa8vLf0Lbbj7BrY', function(data) {
        var array = $('#coords').attr('value').split(",");
        var coords = array.map(function(val) {
            return parseFloat(val);
        });

        function initMap() {
            var location = new google.maps.LatLng(coords[0], coords[1]);
            console.log(location);
            var mapCanvas = document.getElementById('map');
            var mapOptions = {
                center: location,
                zoom: 8,
                panControl: false
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);
            var styles = [{
                "featureType": "landscape",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 65
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 51
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.highway",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 30
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.local",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 40
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "transit",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "administrative.province",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": -25
                }, {
                    "saturation": -100
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#ffff00"
                }, {
                    "lightness": -25
                }, {
                    "saturation": -97
                }]
            }];

            map.set('styles', styles);
        }
        (function(cb) {
            eval(data);
            console.log(google);
            return (function() {
                return cb();
            })();
        })(initMap);
    });
});
