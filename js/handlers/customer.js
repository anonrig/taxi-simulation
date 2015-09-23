function CustomerHandler() {
    this.list = Bootstrapper.cities;

    this.init_();
};

CustomerHandler.prototype.init_ = function() {
    var temporaryList = [];

    this.list.forEach(function(city) {
        temporaryList.push(new Customer(city[0]));
    });

    this.list = temporaryList;
    delete temporaryList;
};

CustomerHandler.prototype.setIdle = function(name) {
    var customer = this.list.filter(function(item) {
        return item.address == name;
    });

    if (!customer) return;

    this.list = this.list.filter(function(item) {
        return item.address != name;
    });
};

CustomerHandler.prototype.getAvailable = function() {
    return this.list;
};