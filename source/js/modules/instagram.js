const $ = require('jquery');
const Instafeed = require('instafeed.js');
const Barba = require('barba.js');

const feed = new Instafeed({
  get: 'user',
  userId: '12752195',
  clientId: '8d733874853341d2bec0b929411b75f4',
  accessToken: '12752195.1677ed0.8274541354a84f12a7bfc80f1f16a452',
  resolution: 'standard_resolution',
  sortBy: 'random',
  template: '<div class="image-container"><img src="{{image}}" /></div>',
  limit: 33,
  after: () => {
    const numberArray = [];

    $('#instafeed img').each(function imgIndex(index) {
      $(this).attr('data-number', index);
      numberArray.push(index);
    });

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
      }
    }
    shuffleArray(numberArray);

    $(numberArray).each(function imageReveal(i) {
      const dataNum = $(this)[0];
      setTimeout(() => {
        $(`#instafeed img[data-number="${dataNum}"]`).addClass('loaded');
      }, (i + 1) * 20);
      setTimeout(() => {
        $('#instafeed img[data-number="0"]').addClass('loaded');
      }, 30);
    });
  },
});

Barba.Dispatcher.on('transitionCompleted', () => {
  if ($('#instafeed').length) {
    feed.run();
  }
});
