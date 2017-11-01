'use strict';

module.exports = function(CondoProfile) {
  CondoProfile.findCondoProfileByAddressCount = function(filterData, cb) {
    filterData[0]['addr'] = filterData[0].address;
    delete filterData[0]['address'];
    delete filterData[0]['unit'];
    delete filterData[0]['neighbourhoodSlug'];
    delete filterData[0]['cityMunicipalitySlug'];
    CondoProfile.count(filterData[0], function(err, count) {
      cb(null, count);
    });
  },
  CondoProfile.remoteMethod('findCondoProfileByAddressCount', {
    accepts: {arg: 'filterData', type: 'array'},
    returns: {arg: 'totalItems', type: CondoProfile},
  });

  CondoProfile.findCondoProfileByAddress = function(filterData, cb) {
    filterData[0]['addr'] = filterData[0].address;
    delete filterData[0]['address'];
    delete filterData[0]['unit'];
    delete filterData[0]['neighbourhoodSlug'];
    delete filterData[0]['cityMunicipalitySlug'];
    CondoProfile.findOne({
      where: filterData[0],
      include: [
        'condosNeighbourhood',
        'condosCity',
      ],
    }, function(err, condoProfile) {
      cb(null, JSON.parse(JSON.stringify((condoProfile)), {}));
    });
  },
  CondoProfile.remoteMethod('findCondoProfileByAddress', {
    accepts: {arg: 'filterData', type: 'array'},
    returns: {arg: 'items', type: CondoProfile},
  });
};
