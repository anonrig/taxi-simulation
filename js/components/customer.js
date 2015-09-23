function Customer(address) {
    this.address = address;
    this.idle = false;
    this.ended = false;
};


Customer.prototype.setIdle = function(idleStatus) {
    this.idle = idleStatus;
};

Customer.prototype.isIdle = function() {
    return this.idle;
};

Customer.prototype.arrived = function() {
    this.idle = false;
    this.ended = true;
};

Customer.prototype.isEnded = function() {
    return this.ended;
};