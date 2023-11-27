import { cleanup } from '@testing-library/react';
import './App.css';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXTwitter} from '@fortawesome/free-brands-svg-icons';

let quotesURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

let colorsArray = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

function App() {
  const [quote, setQuote] = useState("I didn’t fail the test. I just found 100 ways to do it wrong.")
  const [author, setAuthor] = useState("Benjamin Franklin")
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setQuotesArray] = useState(null)
  const [mainColor, setMainColor] = useState('#16a085')

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    let randomIntegerColors = Math.floor(colorsArray.length * Math.random())
    setRandomNumber(randomInteger)
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
    setMainColor(colorsArray[randomIntegerColors])
  }

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }
  
  useEffect(() => {     // detects if any changes were made to the url and update it locally
    fetchQuotes(quotesURL)
   }, [quotesURL])

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: mainColor}}>
        <div id='quote-box'>
          <p id='text' style={{color: mainColor}}>
            "{quote}"
          </p>
          <p id='author' style={{color: mainColor}}>
            - {author}
          </p>
          <div>
            <a id='tweet-quote' style={{backgroundColor: mainColor}} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faXTwitter}/></a>
            <button id="new-quote" style={{backgroundColor: mainColor}} onClick={() => getRandomQuote()}>New Quote</button>
          </div>
        </div>
        <div><a id='owner' href={encodeURI(`https://www.linkedin.com/in/rafaelcarvalho11/`)}>by Rafael Carvalho</a></div>
      </header>
    </div>
  );
}

export default App;
