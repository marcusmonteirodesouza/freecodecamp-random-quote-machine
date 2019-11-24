import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
        <p id="text">
          - <span>{quoteData.quote}</span>
        </p>
        <footer>
          <p id="author">{quoteData.author}</p>
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
      <button
        type="button"
        id="new-quote"
        onClick={async () => setQuoteData(await quoteService.fetchQuoteData())}
      >
        new quote
      </button>
      <div>
        <button type="button" id="tweet-quote">
          <a href="twitter.com/intent/tweet">tweet quote</a>
        </button>
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
