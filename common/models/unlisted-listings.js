'use strict';

module.exports = function(UnlistedListings) {
  UnlistedListings.findUnlistedListingsByAddressCount = function(filterData, cb) {
    filterData[0]['addr'] = filterData[0].address;
    delete filterData[0]['address'];
    delete filterData[0]['unit'];
    UnlistedListings.count(filterData[0], function(err, count) {
      cb(null, count);
    });
  },
  UnlistedListings.remoteMethod('findUnlistedListingsByAddressCount', {
    accepts: {arg: 'filterData', type: 'array'},
    returns: {arg: 'totalItems', type: UnlistedListings},
  });

  UnlistedListings.findUnlistedListingsByAddress = function(filterData, cb) {
    filterData[0]['addr'] = filterData[0].address;
    delete filterData[0]['address'];
    delete filterData[0]['unit'];
    UnlistedListings.findOne({
      where: filterData[0],
      include: [
        'neighbourhoods',
        'cities',
      ],
    }, function(err, unlistedListings) {
      cb(null, JSON.parse(JSON.stringify((unlistedListings)), {}));
    });
  },
  UnlistedListings.remoteMethod('findUnlistedListingsByAddress', {
    accepts: {arg: 'filterData', type: 'array'},
    returns: {arg: 'items', type: UnlistedListings},
  });
};
