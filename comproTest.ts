import nlp from 'compromise'
import datePlugin from 'compromise-dates'
nlp.plugin(datePlugin)


var doc = nlp('slowly, throughout yesterday')
//@ts-ignore


var nouns = doc.match('#Determiner? Noun')

var COM = doc.match('with #Determiner? #Noun').out('array')
var LOC = doc.match('in #Determiner? #Noun').out('array')
var DIR = doc.match('(to|toward(s)?|near|around|beyond|across|above|below|through) #Determiner #Noun').out('array')
var GOL = doc.match('for #Determiner #Noun').out('array')
var MNR = doc.match('#Adverb').out('array').out('array')
var TMP = doc.match('#Preposition? #Date').out('array')
var EXT = doc.match('(by #Percent|#Comparative than #Determiner? #Noun)').out('array')
var REC = ['us']
var PRD = doc.match('#Adjective AF')
//var PRP = doc.match('')
// only one vreb!!!
var CAU = 'because of #Determiner? #Noun'
//var DIS = 
var ADV = MNR
var ADJ = '#Adjective'
//lvb

console.log()

	/*
	
	
	emic/etic
	global/local
	insider/outsider
	
	
	*/