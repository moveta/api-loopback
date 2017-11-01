'use strict';

module.exports = function(Listings) {
  Listings.findFilteredListingCount = function(filterData, cb) {
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
  Listings.remoteMethod('findFilteredListingCount', {
    accepts: {arg: 'filterData', type: 'array'},
    returns: {arg: 'totalItems', type: Listings},
  });

  Listings.findFilteredListing = function(filterData, cb) {
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
      cb(null, JSON.parse(JSON.stringify((listings)), {
      }));
    });
  },
  Listings.remoteMethod('findFilteredListing', {
    accepts: {arg: 'filterData', type: 'array'},
    returns: {arg: 'items', type: Listings},
  });
};