function Bootstrapper() {
    var mapContainer = document.getElementById('map'),
        map = new google.maps.Map(mapContainer, {
            zoom: 3,
            center: {lat: 41.85, lng: -87.65}
        });

    var CHandler = new CustomerHandler(),
        THandler = new TaxiHandler();

    setInterval(function() {
        var pendingCustomers = CHandler.getAvailable(),
            pendingTaxis = THandler.getAvailable();

        console.log('pendingCustomers', pendingCustomers.length)
        console.log('pendingTaxis', pendingCustomers.length)

        if (pendingTaxis && pendingCustomers) {
            var currentCustomer = pendingCustomers[pendingCustomers.length - 1],
                currentTaxi = pendingTaxis[pendingTaxis.length - 1];

            if (!currentTaxi || !currentCustomer) return;
            
            var trip = new Trip(currentTaxi, currentCustomer, map);
            THandler.setIdle(currentTaxi.address)
            trip.start(function() {
                THandler.list.push(currentTaxi);
            });
            CHandler.setIdle(currentCustomer.address)
        }
    }, 500);
};
