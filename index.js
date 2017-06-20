const util = require('util')
const htmlToJson = require('html-to-json');
const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdqJpYshcHUNYsM9FAcnh2WaN6Z6Pl4g1sWBP_-GgLjXCLhFA/viewform';

const promise = htmlToJson.request(formUrl, {
  'inputs': ['input', function ($input) {
    return $input;
  }]
});

promise.done(function (result) {
  const questions = [];

  result.inputs.forEach(function(element) {
    if (element[0].attribs['aria-label']) {
      let question = {
        type: 'free text',
        name: element[0].attribs['aria-label']
      };
      questions.push(question);
    }
  });

  console.log(util.inspect(questions, false, null))
});