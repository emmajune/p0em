import nlp from 'compromise';
import { rando } from '@nastyox/rando.js';
import { parentPort } from 'worker_threads';



var words:any = {}

var thoughts = [
	'and did u know I brushed my teeth today',
	'and did you know the patriots lost',
	'and did you know the sky is turning red',
	'did you know',
	"and did you know that god isn't dead",
	'and where is my phone',
	'and where did it go',
	'????',
	'and what are your thoughts on genocide',
	'and are trans people real',
	'and what about antisemitism?',
	'and is any of this new',
	'and what is knowledge anyway',
	'are we a fungal infection?',
	"and what's your ideal way to die",
	'and brexit',
	'something about blue lives?',
	'and are you an organ donor?',
	'and do you care?',
	'and did you know im really high?',
	'i wish i understood proper nouns',
];

function unPunct(str: string) {
	str = str.replace(/[^a-zA-Z0-9 ]/g, '');
	return str;
}

var data = await fetch('https://doikayt.vercel.app/api');
var obj: any = await data.json();
var objArr = Object.values(obj).flat(2);
var wordsoup: string = '';
for (let i = 0; i < objArr.length; i++) {
	// @ts-ignore
	let desc: string = objArr[i]?.description;
	if (!desc) {
		continue;
	}
	wordsoup += desc;
}

console.log('1/5');

var doc = nlp(wordsoup);
console.log('2/5');

doc.normalize({
	whitespace: true,
	case: true,
	punctuation: true,
	unicode: false,
	contractions: true,
	acronyms: true,
	possessives: true,
});
console.log('3/5');

//@ts-ignore
Array.prototype.unique = function (arr) {
  return [...new Set(arr)]
}


doc.unique();

words.V1 = doc
	.match('#PresentTense')
	.not('#Modal')
	.not('#Copula')
	.not('#Gerund')
	.not('#Infinitive')
	.out('array');
console.log('4/5');




words.N1 = doc.match('#Determiner #Singular').out('array')
words.N2 = doc.match('#Singular').out('array')

function poemize(str:string) {
  var posArr = ['N1', 'N2', 'V1']
  for (let pos of posArr) {
    while (str.includes(pos)) {
      const randWord = words[pos][rando(words[pos].length-1)]
      str = str.replace(pos, randWord)
    }
  }
  return str
}

const template:string = `N1 V1 N1  &
N1 V1 N1--&
N1 V1 N1--&
N1 V1 N1--&
N1 V1 N1--&
N1 V1 N1--&
N1 V1 N1--&
N1 V1 N1--&`



console.log('5/5');
async function genHtml() {
  const poem = poemize(template) 
	var preHtml = `

      emma@emmas-MacBook-Air <em>making_headli(n)es</em> %


  ${'IS IT POETRY'.padStart(rando(70) + 30)}

that ${poem}

  ${rando(thoughts).value.padStart(rando(60) + 30)}
        
  `;

	var html = `
  <html>
    <head>
      <title>*making_headli(n)es*</title>
    </head>
    <body style="margin:0;padding:0;width:100vw;height:100vh;filter:invert(100%);hue-rotate(180deg);background-color:black;">
        <pre>${preHtml.replaceAll('.', '-')}</pre>
      <p style="display:inline;padding:0;margin:0;background-color:transparent;border:none;position:absolute;select:none;bottom:0;right:0;font-family:monospace;">IS_FRESH</p>
    </body>
  </html>
`;



	// var times:string[] = []
	// let num

	// var COM = doc.match('with #Determiner? #Noun')
	// var LOC = doc.match('in #Determiner? #Noun')
	// var DIR = doc.match('(to|toward(s)?|near|around|beyond|across|above|below|through) #Determiner #Noun')
	// var GOL = doc.match('for #Determiner #Noun')
	// var MNR = doc.match('#Adverb')
	// var TMP = doc.match(`at ${times[(num=0)]}|while`)






  parentPort!.postMessage(html)
	return 'done!';
}

parentPort!.on('message', genHtml)

genHtml();
