'use strict';

module.exports = function(Listings) {
  Listings.findFilteredListingCount = function(filterData, cb) {

    var address = (filterData[0].address) ? filterData[0].address : '';
    var unit = (filterData[0].unit) ? filterData[0].unit : '';
    var neighbourhood = (filterData[0].neighbourhoodSlug) ? filterData[0].neighbourhoodSlug : '';
    var city = (filterData[0].cityMunicipalitySlug) ? filterData[0].cityMunicipalitySlug : '';
    Listings.count({
      addr: address,
      neighbourhoodSlug: neighbourhood,
      cityMunicipalitySlug: city,
      isActive: 1,
      listingsTypeId: {neq: 2},
    }, function(err, count) {
      cb(null, count);
    });
  },
  Listings.remoteMethod('findFilteredListingCount', {
    accepts: {arg: 'filterData', type: 'array'},
    returns: {arg: 'totalItems', type: Listings},
  });

  Listings.findFilteredListing = function(filterData, cb) {

    var address = (filterData[0].address) ? filterData[0].address : '';
    var unit = (filterData[0].unit) ? filterData[0].unit : '';
    var neighbourhood = (filterData[0].neighbourhoodSlug) ? filterData[0].neighbourhoodSlug : '';
    var city = (filterData[0].cityMunicipalitySlug) ? filterData[0].cityMunicipalitySlug : '';
    Listings.find({
      where: {
        addr: address,
        neighbourhoodSlug: neighbourhood,
        cityMunicipalitySlug: city,
        isActive: 1,
        listingsTypeId: {neq: 2},
      },
    }, function(err, listings) {
      cb(null, Object.assign({}, JSON.parse(JSON.stringify((listings))), {
      }));
    });
  },
  Listings.remoteMethod('findFilteredListing', {
    accepts: {arg: 'filterData', type: 'array'},
    returns: {arg: 'items', type: Listings},
  });
};