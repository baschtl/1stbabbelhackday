'use strict';

angular.module('hackdayApp')
  .factory('contentFactory', function () {
    var rawItems = [
      {id: 1, image_id:"381279",l2_text:"teleskop",l1_text:"telescope"},
      {id: 2, image_id:"381281",l2_text:"tyngdekraft",l1_text:"gravity"},
      {id: 3, image_id:"380440",l2_text:"satelitt",l1_text:"satellite"},
      {id: 4, image_id:"378597",l2_text:"astronaut",l1_text:"astronaut"},
      {id: 5, image_id:"381285",l2_text:"svart hull",l1_text:"black hole"},
      {id: 6, image_id:"378560",l2_text:"asteroide",l1_text:"asteroid"},
      {id: 7, image_id:"378322",l2_text:"solformørkelse",l1_text:"solar eclipse"},
      {id: 8, image_id:"381292",l2_text:"uendelig",l1_text:"infinite"},
      {id: 9, image_id:"354893",l2_text:"koffert",l1_text:"suitcase"}
    ];

    var Card = function (id, type, text, imageId) {
      this.id = id;
      this.type = type;
      this.text = text;
      this.imageId = imageId;
      this.flipped = false;
      this.picked = false;
      this.flip = function () {
        this.flipped = !this.flipped;
        collection.sendData(JSON.stringify({messageType: 'sync', id: this.id, type: this.type, flipped: this.flipped}));
      };
    };

    var collection = {};
    collection.cards = [];
    collection.score = 0;
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
          firstPick.picked = false;
          secondPick.picked = false;
          firstPick = secondPick = undefined;
        }

        firstPick = card;
        firstPick.picked = true;

      } else {

        if (firstPick.pair === card) {
          // message = (unmatchedPairs > 0) ? console.log("MATCH") : console.log("WON");
          collection.changeScoreBy(3);
          firstPick.picked = false;
          if (secondPick) { secondPick.picked = false; }
          firstPick = secondPick = undefined;
        } else {
          secondPick = card;
          secondPick.picked = true;
          collection.changeScoreBy(-1);
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

    collection.changeScoreBy = function (change) {
      collection.score += change;
      collection.sendData(JSON.stringify({messageType: 'score', score: collection.score}));
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
