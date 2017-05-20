  //tokenization
  const Language = require('@google-cloud/language')({
    projectID: 'systemflow',
    private_key: 'AIzaSyBq4fjiHcxmV89HjqlARLkn__BdDxuczj8'
  });
  var language = Language();

  function analyzeSyntaxOfText (text) {
  // [START language_syntax_string]
  // Imports the Google Cloud client library
  //const Language = require('@google-cloud/language');

  // Instantiates a client
  //const language = Language();


  // The text to analyze, e.g. "Hello, world!"
  // const text = 'Hello, world!';

  // Instantiates a Document, representing the provided text
  const document = language.document({ content: text, language: 'ja-JP'});

  // Detects syntax in the document
  document.detectSyntax()
    .then((results) => {
      const syntax = results[0];

      console.log('Parts of speech:');
      syntax.forEach((part) => {
        console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
        console.log(`Morphology:`, part.partOfSpeech);
      });
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
  // [END language_syntax_string]
}