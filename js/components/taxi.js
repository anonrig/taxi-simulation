function Taxi(address) {
    this.address = address;
    this.idle = false;
};


Taxi.prototype.setIdle = function(isIdle) {
    this.idle = isIdle;

    return this;
};

Taxi.prototype.isIdle = function() {
    return this.idle;
};

Taxi.prototype.setAddress = function(newAddress) {
    this.address = newAddress;
    return this;
};