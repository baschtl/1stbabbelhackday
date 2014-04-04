'use strict';

angular.module('hackdayApp')
  .factory('contentFactory', function () {
    var rawItems = [
      {id: 1, image_id:"381279",l1_text:"teleskop",l2_text:"telescope"},
      {id: 2, image_id:"381281",l1_text:"tyngdekraft",l2_text:"gravity"},
      {id: 3, image_id:"380440",l1_text:"satelitt",l2_text:"satellite"},
      {id: 4, image_id:"378597",l1_text:"astronaut",l2_text:"astronaut"}/*,
      {image_id:"381285",l1_text:"svart hull",l2_text:"black hole"},
      {image_id:"378560",l1_text:"astroide",l2_text:"asteroid"},
      {image_id:"378322",l1_text:"solformørkelse",l2_text:"solar eclipse"},
      {image_id:"381292",l1_text:"uendelig",l2_text:"infinite"}*/
    ];


    var Card = function (id, type, text, imageId) {
      this.id = id;
      this.type = type;
      this.text = text;
      this.imageId = imageId;
      this.flipped = false;
      this.flip = function () {
        this.flipped = !this.flipped;
        collection.sendData(JSON.stringify({id: this.id, type: this.type, flipped: this.flipped}));
      };
    };

    var collection = {};
    collection.cards = [];
    var firstPick;
    var secondPick;

    collection.cardClicked = function (card) {
      if (card.flipped) {
        return;
      }

      card.flip();

      if (!firstPick || secondPick) {

        if (secondPick) {
          firstPick.flip();
          secondPick.flip();
          firstPick = secondPick = undefined;
        }

        firstPick = card;
        console.log('one more');

      } else {

        if (firstPick.pair === card) {
          // message = (unmatchedPairs > 0) ? console.log("MATCH") : console.log("WON");
          console.log('MATCH');
          firstPick = secondPick = undefined;
        } else {
          secondPick = card;
          console.log('MISS');
        }
      }

    };

    collection.syncItems = function (peersCard) {
      var changedCard = _.find(collection.cards, function (card) {
        return card.id === peersCard.id && card.type === peersCard.type;
      });
      console.log(peersCard);
      console.log(changedCard);
      changedCard.flipped = peersCard.flipped;
    };

    rawItems.forEach(function (item) {
      var referenceCard = new Card(item.id, 'reference', item.l1_text, item.image_id);
      var learningCard = new Card(item.id, 'learning', item.l2_text, item.image_id);
      referenceCard.pair = learningCard;
      learningCard.pair = referenceCard;
      collection.cards = collection.cards.concat([referenceCard, learningCard]);
    });

    collection.cards = _.shuffle(collection.cards);

    // Public API here
    return {
      getContent: function () {
        return collection;
      }
    };
  });
