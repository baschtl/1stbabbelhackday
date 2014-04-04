'use strict';

angular.module('hackdayApp')
  .factory('contentFactory', function () {
    var rawItems = [
      {image_id:"381279",l1_text:"teleskop",l2_text:"telescope"},
      {image_id:"381281",l1_text:"tyngdekraft",l2_text:"gravity"},
      {image_id:"380440",l1_text:"satelitt",l2_text:"satellite"},
      {image_id:"378597",l1_text:"astronaut",l2_text:"astronaut"},
      {image_id:"381285",l1_text:"svart hull",l2_text:"black hole"},
      {image_id:"378560",l1_text:"astroide",l2_text:"asteroid"},
      {image_id:"378322",l1_text:"solformørkelse",l2_text:"solar eclipse"},
      {image_id:"381292",l1_text:"uendelig",l2_text:"infinite"},
      {image_id:"381292",l1_text:"uendelig",l2_text:"infinite"}
    ];


    var Card = function (type, text, imageId) {
      this.type = type;
      this.text = text;
      this.imageId = imageId;
      this.frontUp = false;

      var that = this;

      this.onClick = function () {
        console.log(that);
      };
    };

    var collection = [];

    rawItems.forEach(function (item) {
      var referenceCard = new Card('reference', item.l1_text, item.image_id);
      var learningCard = new Card('learning', item.l2_text, item.image_id);
      referenceCard.pair = learningCard;
      learningCard.pair = referenceCard;
      collection = collection.concat([referenceCard, learningCard]);
    });

    collection = _.shuffle(collection);

    // Public API here
    return {
      getContent: function () {
        return collection;
      }
    };
  });
