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

            var trip = new Trip(currentTaxi, currentCustomer, map);
            THandler.setIdle(currentTaxi.address)
            trip.start(function() {
                THandler.list.push(currentTaxi);
            });
            CHandler.setIdle(currentCustomer.address)
        }
    }, 5000);
};


Bootstrapper.cities = [
  [ "San Francisco, CA, US", 1857 ],
  [ "Oakland, CA, US", 924 ],
  [ "London, ENG, GB", 511 ],
  [ "New York City, NY, US", 482 ],
  [ "Madison, WI, US", 444 ],
  [ "Hangzhou, CN", 439 ],
  [ "Sydney, AU", 435 ],
  [ "Copenhagen, DK", 305 ],
  [ "Melbourne, AU", 254 ],
  [ "Boston, MA, US", 254 ],
  [ "Philadelphia, PA, US", 244 ],
  [ "Brisbane, AU", 232 ],
  [ "Vancouver, CA", 217 ],
  [ "Berlin, DE", 216 ],
  [ "Austin, TX, US", 209 ],
  [ "Portland, OR, US", 208 ],
  [ "Brooklyn, NY, US", 206 ],
  [ "Phoenix, AZ, US", 203 ],
  [ "Washington, D. C., DC, US", 194 ],
  [ "Cupertino, CA, US", 177 ],
  [ "Provo, UT, US", 157 ],
  [ "Portugalete, ES", 156 ],
  [ "Oslo, NO", 144 ],
  [ "San Rafael, CA, US", 138 ],
  [ "The Hague, NL", 138 ],
  [ "Cincinnati, OH, US", 128 ],
  [ "Pasadena, CA, US", 118 ],
  [ "Wellington, NZ", 115 ],
  [ "Bangkok, TH", 114 ],
  [ "Fremont, CA, US", 108 ],
  [ "China, MX", 106 ],
  [ "Red Lick, TX, US", 106 ],
  [ "Gaborone, BW", 104 ],
  [ "Napa, CA, US", 97 ],
  [ "Berkeley, CA, US", 94 ],
  [ "Poznań, PL", 94 ],
  [ "Aptos, CA, US", 93 ],
  [ "Chicago, IL, US", 91 ],
  [ "Warsaw, PL", 84 ],
  [ "Moscow, RU", 84 ],
  [ "Paris, FR", 83 ],
  [ "Cambridge, CA", 82 ],
  [ "Aveiro, PT", 82 ],
  [ "Seattle, WA, US", 82 ],
  [ "Norway, MI, US", 81 ],
  [ "Mountain View, CA, US", 80 ],
  [ "Köln, DE", 77 ],
  [ "Stockholm, SE", 77 ],
  [ "Buenos Aires, AR", 76 ],
  [ "Varna, BG", 76 ],
  [ "Hamburg, DE", 75 ],
  [ "Los Angeles, CA, US", 73 ],
  [ "Buffalo, NY, US", 71 ],
  [ "Bristol, ENG, GB", 70 ],
  [ "Charlotte, NC, US", 68 ],
  [ "Cañada de Gómez, AR", 66 ],
  [ "Clarkston, MI, US", 66 ],
  [ "Leiria, PT", 64 ],
  [ "Lincoln, NE, US", 64 ],
  [ "Würzburg, DE", 64 ],
  [ "Riga, LV", 64 ],
  [ "Colombo, LK", 64 ],
  [ "Ottawa, CA", 64 ],
  [ "Russiaville, IN, US", 63 ],
  [ "Palo Alto, CA, US", 63 ],
  [ "Miami, FL, US", 62 ],
  [ "Kiel, DE", 62 ],
  [ "Corona, CA, US", 60 ],
  [ "Jyväskylä, FI", 60 ],
  [ "South Salt Lake, UT, US", 59 ],
  [ "Sheffield, ENG, GB", 58 ],
  [ "Toronto, CA", 58 ],
  [ "Las Vegas, NV, US", 58 ],
  [ "West Hollywood, CA, US", 56 ],
  [ "Ningbo, CN", 56 ],
  [ "Skopje, MK", 56 ],
  [ "Southampton, ENG, GB", 56 ],
  [ "Manila, NCR, PH", 56 ],
  [ "West Richland, WA, US", 56 ],
  [ "Trondheim, NO", 55 ],
  [ "Los Gatos, CA, US", 54 ],
  [ "Sant Cugat del Vallès, ES", 54 ],
  [ "Marion, IL, US", 54 ],
  [ "Amsterdam, NL", 53 ],
  [ "Redwood City, CA, US", 52 ],
  [ "Santa Clara, CA, US", 52 ],
  [ "Taipei, TW", 52 ],
  [ "Beijing, CN", 52 ],
  [ "Newcastle, AU", 50 ],
  [ "American Fork, UT, US", 50 ],
  [ "Rochester, NY, US", 50 ],
  [ "Zürich, ZH, CH", 49 ],
  [ "Ohioville, PA, US", 48 ],
  [ "Roaming Shores, OH, US", 46 ],
  [ "Haarlem, NL", 44 ],
  [ "Dschang, CM", 44 ],
  [ "Córdoba, AR", 43 ],
  [ "Sunnyvale, CA, US", 42 ],
  [ "Prague, CZ", 40 ],
  [ "Nantes, FR", 40 ],
  [ "Rome, IT", 39 ],
  [ "Dublin, L, IE", 38 ],
  [ "Lisbon, PT", 38 ],
  [ "San Diego, CA, US", 37 ],
  [ "Guangzhou, CN", 37 ],
  [ "Bergen, NO", 36 ],
  [ "Shanghai, CN", 36 ],
  [ "Missoula, MT, US", 36 ],
  [ "Charleston, SC, US", 35 ],
  [ "Brazil, IN, US", 34 ],
  [ "West Orange, NJ, US", 24 ],
  [ "Linz, AT", 24 ],
  [ "Boulder, CO, US", 24 ],
  [ "Chennai, IN", 24 ],
  [ "Denver, CO, US", 23 ],
  [ "California, MD, US", 23 ],
  [ "England, AR, US", 22 ],
  [ "Lund, SE", 22 ],
  [ "Athens, GR", 22 ],
  [ "Hollywood, FL, US", 22 ],
  [ "Porto Alegre, BR", 21 ],
  [ "Detroit, MI, US", 21 ],
  [ "Newport Beach, CA, US", 21 ],
  [ "Novosibirsk, RU", 21 ],
  [ "Port Orchard, WA, US", 21 ],
  [ "Canberra, AU", 20 ],
  [ "Orem, UT, US", 20 ],
  [ "Saint Petersburg, RU", 20 ],
  [ "Menlo Park, CA, US", 20 ],
  [ "Barcelona, ES", 20 ],
  [ "Villefranche-sur-Saône, FR", 20 ],
  [ "Helsinki, FI", 20 ],
  [ "Bordeaux, FR", 20 ],
  [ "Groningen, NL", 20 ],
  [ "Tallinn, EE", 20 ],
  [ "Tel Aviv, IL", 19 ],
  [ "Sherbrooke, CA", 19 ],
  [ "Knoxville, TN, US", 18 ],
  [ "Hong Kong, HK", 18 ],
  [ "Grenoble, FR", 18 ],
  [ "South Jordan, UT, US", 18 ],
  [ "Hässleholm, SE", 17 ],
  [ "Santa Monica, CA, US", 17 ],
  [ "Oakton, VA, US", 17 ],
  [ "Jacksonville Beach, FL, US", 17 ],
  [ "Franceville, GA", 16 ],
  [ "Frankfurt am Main, DE", 16 ],
  [ "Minneapolis, MN, US", 16 ],
  [ "Ithaca, NY, US", 16 ],
  [ "Dachau, DE", 16 ],
  [ "Vienna, AT", 16 ],
  [ "San Jose, CA, US", 16 ],
  [ "Bochum, DE", 16 ],
  [ "Redmond, WA, US", 16 ],
  [ "Tokyo, JP", 15 ],
  [ "Darmstadt, DE", 15 ],
  [ "Herne, DE", 15 ],
  [ "Hunan, CN", 15 ],
  [ "Fairfax, VA, US", 15 ],
  [ "Belgium, WI, US", 15 ],
  [ "Alameda, CA, US", 15 ],
  [ "Kraków, PL", 15 ],
  [ "Dallas, TX, US", 14 ],
  [ "Roubaix, FR", 14 ],
  [ "Baltimore, MD, US", 14 ],
  [ "Burlingame, CA, US", 14 ],
  [ "Spokane, WA, US", 14 ],
  [ "Poughkeepsie, NY, US", 14 ],
  [ "Montréal, CA", 14 ],
  [ "Evesham, ENG, GB", 14 ],
  [ "São Paulo, BR", 14 ],
  [ "Auckland, NZ", 13 ],
  [ "Plouzané, FR", 13 ],
  [ "München, DE", 13 ],
  [ "Guildford, ENG, GB", 13 ],
  [ "Houston, TX, US", 13 ]
];