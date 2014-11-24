// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

$(document).ready(function() {
    var mapElem = document.getElementById('map');
    var center = {
        lat: 47.6,
        lng: -122.3
    };

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();

    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {
            data.forEach(function (station) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(station.location.latitude),
                        lng: Number(station.location.longitude)
                    },
                    map: map
                });

                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<p>' + station.cameralabel + '</p>';
                    html += '<img src=' + station.imageurl.url + '>';
                    map.panTo(this.getPosition());
                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                });

                $('#search').bind('search keyup', function() {
                    var searchElem = $(this).text().toLowerCase();
                    if (marker.text().toLowerCase().indexOf(searchElem) == -1) {
                        marker.setMap(null);
                    } else {
                        marker.setMap(map);
                    }
                });

            });
        })
        .fail(function(error) {
            alert("There is an error!");
        });

});


