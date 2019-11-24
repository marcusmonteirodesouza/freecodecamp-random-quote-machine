import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import quotesService from '../service';

const QuoteBox = ({ quoteService }) => {
  const [quoteData, setQuoteData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    (async () =>
      setQuoteData(
        await quoteService.fetchQuoteData(abortController.signal)
      ))();

    const cleanup = () => {
      abortController.abort();
    };

    return cleanup;
  }, [quoteService]);

  return quoteData ? (
    <div id="quote-box" data-testid="quote-box">
      <blockquote>
        <p id="text">{`"${quoteData.quote}"`}</p>
        <footer>
          <p
            style={{ textAlign: 'right' }}
            id="author"
          >{`- ${quoteData.author}`}</p>
          <cite>
            <a
              href={quoteData.authorPage}
              target="_blank"
              rel="noopener noreferrer"
            >
              {quoteData.authorInfo}
            </a>
          </cite>
        </footer>
      </blockquote>
      <div style={{ textAlign: 'center' }}>
        <button
          type="button"
          id="new-quote"
          onClick={async () =>
            setQuoteData(await quoteService.fetchQuoteData())
          }
        >
          new quote
        </button>
        <a
          style={{ marginLeft: '.5em' }}
          id="tweet-quote"
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=${quoteData.quote} ${quoteData.author}&hashtags=quotes`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
    </div>
  ) : (
    <p>Loading quote...</p>
  );
};

QuoteBox.propTypes = {
  quoteService: PropTypes.object
};

QuoteBox.defaultProps = {
  quoteService: quotesService
};

export default QuoteBox;
