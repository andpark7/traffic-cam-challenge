// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

$(document).ready(function() {
    var mapElem = document.getElementById('map');
    //set the focus of the map
    var center = {
        lat: 47.6,
        lng: -122.3
    };

    //create new map element
    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    //make a new infowindow
    var infoWindow = new google.maps.InfoWindow();

    //get data from seattle gov
    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {
            //make a marker for each data point
            data.forEach(function (station) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(station.location.latitude),
                        lng: Number(station.location.longitude)
                    },
                    map: map
                });

                //make a infowindow pop up if a marker is clicked on
                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<p>' + station.cameralabel + '</p>';
                    html += '<img src=' + station.imageurl.url + '>';
                    map.panTo(this.getPosition());
                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                });

                //closes the infowindow if anywhere on the map is clicked
                google.maps.event.addListener(map, 'click', function() {
                    infoWindow.close();
                });

                //filters markers depending on user input
                $('#search').bind('search keyup', function() {
                    var searchElem = this.value.toLowerCase();
                    if (station.cameralabel.toLowerCase().indexOf(searchElem) == -1) {
                        marker.setMap(null);
                    } else {
                        marker.setMap(map);
                    }
                });//bind
            });//foreach
        })//done
        //fail case
        .fail(function(error) {
            alert("There is an error!");
        });

});


