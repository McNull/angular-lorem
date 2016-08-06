(function (angular) {

  angular.module('lorem', [])
    .factory('lorem', function () {

      // Stolen from https://github.com/knicklabs/lorem-ipsum.js and slightly modified

      /* output = loremIpsum({
       count: 1                      // Number of words, sentences, or paragraphs to generate.
       , units: 'sentences'            // Generate words, sentences, or paragraphs.
       , sentenceLowerBound: 5         // Minimum words per sentence.
       , sentenceUpperBound: 15        // Maximum words per sentence.
       , paragraphLowerBound: 3        // Minimum sentences per paragraph.
       , paragraphUpperBound: 7        // Maximum sentences per paragraph.
       , format: 'plain'               // Plain text or html
       , words: ['ad', 'dolor', ... ]  // Custom word dictionary. Uses dictionary.words (in lib/dictionary.js) by default.
       , random: Math.random           // A PRNG function. Uses seed random by default
       , capitalize: false             // Capitalize words
       });
       */

      /*module.exports = {
        create: generator,
        seed: seed,
        randomInteger: randomInteger
      };*/

      var _seed = 1;

      function seed(value) {
        _seed = value;
      }

      function random() {
        var x = Math.sin(_seed++) * 10000;
        return x - Math.floor(x);
      }

      function randomInteger(min, max) {
        return Math.floor(random() * (max - min + 1) + min);
      }

      function generator() {
        var options = (arguments.length) ? arguments[0] : {}
          , count = options.count || 1
          , units = options.units || 'sentences'
          , sentenceLowerBound = options.sentenceLowerBound || 5
          , sentenceUpperBound = options.sentenceUpperBound || 15
          , paragraphLowerBound = options.paragraphLowerBound || 3
          , paragraphUpperBound = options.paragraphUpperBound || 7
          , format = options.format || 'plain'
          , words = options.words || dictonary
          , random = options.random || random // Math.random
          , capitalize = options.capitalize || false;

        units = simplePluralize(units.toLowerCase());
        //    var randomInteger = function (min, max) {
        //      return Math.floor(random() * (max - min + 1) + min);
        //    };
        var randomWord = function (words) {
          var w = words[randomInteger(0, words.length - 1)];

          if (capitalize) {
            w = w.charAt(0).toUpperCase() + w.slice(1);
          }

          return w;
        };
        var randomSentence = function (words, lowerBound, upperBound) {
          var sentence = ''
            , bounds = { min: 0, max: randomInteger(lowerBound, upperBound) };
          while (bounds.min < bounds.max) {
            sentence = sentence + ' ' + randomWord(words);
            bounds.min = bounds.min + 1;
          }
          if (sentence.length) {
            sentence = sentence.slice(1);
            sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
          }
          return sentence;
        };
        var randomParagraph = function (words, lowerBound, upperBound, sentenceLowerBound, sentenceUpperBound) {
          var paragraph = ''
            , bounds = { min: 0, max: randomInteger(lowerBound, upperBound) };
          while (bounds.min < bounds.max) {
            paragraph = paragraph + '. ' + randomSentence(words, sentenceLowerBound, sentenceUpperBound);
            bounds.min = bounds.min + 1;
          }
          if (paragraph.length) {
            paragraph = paragraph.slice(2);
            paragraph = paragraph + '.';
          }
          return paragraph;
        };
        var iter = 0
          , bounds = { min: 0, max: count }
          , string = ''
          , prefix = ''
          , suffix = "\r\n";
        if (format == 'html') {
          prefix = '<p>';
          suffix = '</p>';
        }
        while (bounds.min < bounds.max) {
          switch (units.toLowerCase()) {
            case 'words':
              string = string + ' ' + randomWord(words);
              break;
            case 'sentences':
              string = string + '. ' + randomSentence(words, sentenceLowerBound, sentenceUpperBound);
              break;
            case 'paragraphs':
              string = string + prefix + randomParagraph(words, paragraphLowerBound, paragraphUpperBound, sentenceLowerBound, sentenceUpperBound) + suffix;
              break;
          }
          bounds.min = bounds.min + 1;
        }
        if (string.length) {
          var pos = 0;
          if (string.indexOf('. ') == 0) {
            pos = 2;
          } else if (string.indexOf('.') == 0 || string.indexOf(' ') == 0) {
            pos = 1;
          }
          string = string.slice(pos);
          if (units == 'sentences') {
            string = string + '.';
          }
        }
        return string;
      }

      function simplePluralize(string) {
        if (string.indexOf('s', string.length - 1) === -1) {
          return string + 's';
        }
        return string;
      }

      var dictonary = [
        'ad',
        'adipisicing',
        'aliqua',
        'aliquip',
        'amet',
        'anim',
        'aute',
        'cillum',
        'commodo',
        'consectetur',
        'consequat',
        'culpa',
        'cupidatat',
        'deserunt',
        'do',
        'dolor',
        'dolore',
        'duis',
        'ea',
        'eiusmod',
        'elit',
        'enim',
        'esse',
        'est',
        'et',
        'eu',
        'ex',
        'excepteur',
        'exercitation',
        'fugiat',
        'id',
        'in',
        'incididunt',
        'ipsum',
        'irure',
        'labore',
        'laboris',
        'laborum',
        'Lorem',
        'magna',
        'minim',
        'mollit',
        'nisi',
        'non',
        'nostrud',
        'nulla',
        'occaecat',
        'officia',
        'pariatur',
        'proident',
        'qui',
        'quis',
        'reprehenderit',
        'sint',
        'sit',
        'sunt',
        'tempor',
        'ullamco',
        'ut',
        'velit',
        'veniam',
        'voluptate'
      ];

      return {
        create: generator,
        seed: seed,
        randomInteger: randomInteger
      };
    });
} (angular));

