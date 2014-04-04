'use strict';

angular.module('hackdayApp')
  .factory('contentFactory', function () {
    var items = [
      {id: "0", type:"P",speaker_role:"M1",sound_id:"144242",image_id:"381279",l1_text:"teleskop",l2_text:"telescope"},
      {id: "1", type:"P",speaker_role:"M1",sound_id:"144244",image_id:"381281",l1_text:"tyngdekraft",l2_text:"gravity"},
      {id: "2", type:"P",speaker_role:"M1",sound_id:"144246",image_id:"380440",l1_text:"satelitt",l2_text:"satellite"},
      {id: "3", type:"P",speaker_role:"M1",sound_id:"144248",image_id:"378597",l1_text:"astronaut",l2_text:"astronaut"},
      {id: "4", type:"P",speaker_role:"M1",sound_id:"144250",image_id:"381285",l1_text:"svart hull",l2_text:"black hole"},
      {id: "5", type:"P",speaker_role:"M1",sound_id:"144252",image_id:"378560",l1_text:"astroide",l2_text:"asteroid"},
      {id: "6", type:"P",speaker_role:"M1",sound_id:"144254",image_id:"378322",l1_text:"solformørkelse",l2_text:"solar eclipse"},
      {id: "7", type:"P",speaker_role:"M1",sound_id:"144256",image_id:"381292",l1_text:"uendelig",l2_text:"infinite"}
    ];

    // Public API here
    return {
      getContent: function () {
        return items;
      }
    };
  });
