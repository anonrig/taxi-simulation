function Trip (taxi, customer, map) {
    this.taxi = taxi;
    this.customer = customer;
    this.directionsService = new google.maps.DirectionsService;
    this.line = null;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.startPoint = this.taxi.address;
    this.map = map;
    this.endPoint = this.customer.address;

    this.init_();
};

/** @private */
Trip.prototype.init_ = function() {
    this.directionsDisplay.setMap(this.map);;
};

/** Assume taxi and customer have both x and y coord */
Trip.prototype.start = function() {
    /** for text purposes */
    var that = this;

    this.taxi.setIdle(true);
    this.customer.setIdle(true);
    console.log('taxi starts', this.taxi.address)
    this.directionsService.route({
        origin: that.startPoint,
        destination: that.endPoint,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          that.directionsDisplay.setDirections(response);
          that.createPolyline_(response);
        } else {
          console.error('Directions request failed due to ' + status);
        }
    });
};


/** @private */
Trip.prototype.createPolyline_ = function(result) {
    var that = this;

    this.line = new google.maps.Polyline({
            path: result.routes[0].overview_path,
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 4,
            icons: [{
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    strokeColor: '#393'
                },
                offset: '100%'
            }]
        });
    this.line.setMap(that.map);

    var count = 0;
    this.animateInterval = setInterval(function() {
        count++;
        that.animate_(count);
    }, 20);
};


Trip.prototype.animate_ = function(count) {
    if (count > 200) {
        this.end_();
        return clearInterval(this.animateInterval);
    }

    var icons = this.line.get('icons');
    icons[0].offset = (count / 2) + '%';
    this.line.set('icons', icons);
};

/** @private */
Trip.prototype.end_ = function() {
    this.directionsDisplay.setMap(null);
    this.taxi.setAddress(this.endPoint);
    this.taxi.setIdle(false);
    this.customer.arrived();

    console.info('taxi finishes', this.taxi.address);
};


Trip.events = {
    'LOAD': 'load'
};

