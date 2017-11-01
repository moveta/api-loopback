'use strict';

module.exports = function(Listings) {
  Listings.findListingByAddressCount = function(filterData, cb) {
    filterData[0]['addr'] = filterData[0].address;
    if (filterData[0].unit) {
      filterData[0]['aptNum'] = filterData[0].unit;
    }
    filterData[0]['isActive'] = 1;
    filterData[0]['listingsTypeId'] = {'neq': 2};
    delete filterData[0]['address'];
    Listings.count(filterData[0], function(err, count) {
      cb(null, count);
    });
  },
  Listings.remoteMethod('findListingByAddressCount', {
    accepts: {arg: 'filterData', type: 'array'},
    returns: {arg: 'totalItems', type: Listings},
  });

  Listings.findListingByAddress = function(filterData, cb) {
    filterData[0]['addr'] = filterData[0].address;
    if (filterData[0].unit) {
      filterData[0]['aptNum'] = filterData[0].unit;
    }
    filterData[0]['isActive'] = 1;
    filterData[0]['listingsTypeId'] = {'neq': 2};
    delete filterData[0]['address'];
    Listings.find({
      where: filterData[0],
    }, function(err, listings) {
      cb(null, JSON.parse(JSON.stringify((listings)), {}));
    });
  },
  Listings.remoteMethod('findListingByAddress', {
    accepts: {arg: 'filterData', type: 'array'},
    returns: {arg: 'items', type: Listings},
  });

  Listings.findListingInactiveByAddressCount = function(filterData, cb) {
    filterData[0]['addr'] = filterData[0].address;
    if (filterData[0].unit) {
      filterData[0]['aptNum'] = filterData[0].unit;
    }
    filterData[0]['isActive'] = 0;
    filterData[0]['listingsTypeId'] = {'neq': 2};
    delete filterData[0]['address'];
    Listings.count(filterData[0], function(err, count) {
      cb(null, count);
    });
  },
  Listings.remoteMethod('findListingInactiveByAddressCount', {
    accepts: {arg: 'filterData', type: 'array'},
    returns: {arg: 'totalItems', type: Listings},
  });

  Listings.findListingInactiveByAddress = function(filterData, cb) {
    filterData[0]['addr'] = filterData[0].address;
    if (filterData[0].unit) {
      filterData[0]['aptNum'] = filterData[0].unit;
    }
    filterData[0]['isActive'] = 0;
    filterData[0]['listingsTypeId'] = {'neq': 2};
    delete filterData[0]['address'];
    Listings.findOne({
      where: filterData[0],
      order: 'timestampSql DESC',
    }, function(err, listings) {
      cb(null, JSON.parse(JSON.stringify((listings)), {}));
    });
  },
  Listings.remoteMethod('findListingInactiveByAddress', {
    accepts: {arg: 'filterData', type: 'array'},
    returns: {arg: 'items', type: Listings},
  });
};