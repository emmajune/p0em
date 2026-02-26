var posTagger = require('wink-pos-tagger')

var tagger = posTagger();

// Tag the sentence using the tag sentence api.
console.log(tagger.tagSentence( 'He is trying to fish for fish in the lake.' ))
