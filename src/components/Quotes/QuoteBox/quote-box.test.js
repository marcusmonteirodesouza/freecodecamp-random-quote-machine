import React from 'react';
import {
  render,
  cleanup,
  findByTestId,
  fireEvent
} from '@testing-library/react';
import QuoteBox from './quote-box';

// This is just a little hack to silence a warning that we'll get until we
// upgrade to 16.9: https://github.com/facebook/react/pull/14853
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }

    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe('QuoteBox', () => {
  const makeMockQuotesService = fetchQuoteDataFunc => {
    const mockQuotesService = {};
    mockQuotesService.fetchQuoteData = fetchQuoteDataFunc;
    return mockQuotesService;
  };

  const defaultFetchQuoteDataFunc = (suffix = '') => {
    return {
      quote: `quote${suffix}`,
      author: `author${suffix}`,
      authorInfo: `authorInfo${suffix}`,
      authorPage: `authorPage${suffix}`
    };
  };

  const defaultMockQuotesService = makeMockQuotesService(
    defaultFetchQuoteDataFunc
  );

  const defaultQuoteBox = <QuoteBox quoteService={defaultMockQuotesService} />;

  let changeableQuotesService;

  beforeEach(() => {
    class QuoteDataFetcher {
      constructor() {
        this.i = 0;
        this.fetchQuoteData = this.fetchQuoteData.bind(this);
      }

      fetchQuoteData() {
        this.i++;
        return defaultFetchQuoteDataFunc(this.i);
      }
    }

    const quoteDataFetcher = new QuoteDataFetcher();

    changeableQuotesService = makeMockQuotesService(
      quoteDataFetcher.fetchQuoteData
    );
  });

  afterEach(cleanup);

  it('0 shows a "loading message until the data is fetched', async () => {
    const { getByText } = render(defaultQuoteBox);
    expect(getByText('loading', { exact: false })).toBeVisible();
  });

  test('1 I can see a wrapper element with a corresponding id="quote-box"', async () => {
    const { container } = render(defaultQuoteBox);
    const wrapper = await findByTestId(container, 'quote-box');
    expect(wrapper).toHaveAttribute('id', 'quote-box');
  });

  test('2 Within #quote-box, I can see an element with a corresponding id="text"', async () => {
    const { container } = render(defaultQuoteBox);
    const wrapper = await findByTestId(container, 'quote-box');
    expect(wrapper.querySelector('#text')).toBeVisible();
  });

  test('3 Within #quote-box, I can see an element with a corresponding id="author"', async () => {
    const { container } = render(defaultQuoteBox);
    const wrapper = await findByTestId(container, 'quote-box');
    expect(wrapper.querySelector('#author')).toBeVisible();
  });

  test('4 Within #quote-box, I can see a clickable element with a corresponding id="new-quote"', async () => {
    const { container } = render(defaultQuoteBox);
    const wrapper = await findByTestId(container, 'quote-box');
    expect(wrapper.querySelector('#new-quote')).toHaveAttribute(
      'type',
      'button'
    );
  });

  test('5 Within #quote-box, I can see a clickable a element with a corresponding id="tweet-quote"', async () => {
    const { container } = render(defaultQuoteBox);
    const wrapper = await findByTestId(container, 'quote-box');
    expect(wrapper.querySelector('#tweet-quote').tagName).toBe('A');
  });

  test('6 On first load, my quote machine displays a random quote in the element with id="text"', async () => {
    const { container } = render(defaultQuoteBox);
    const wrapper = await findByTestId(container, 'quote-box');
    expect(wrapper.querySelector('#text').textContent).toContain('quote');
  });

  test('7 On first load, my quote machine displays the random quote\'s author in the element with id="author"', async () => {
    const { container } = render(defaultQuoteBox);
    const wrapper = await findByTestId(container, 'quote-box');
    expect(wrapper.querySelector('#author').textContent).toContain('author');
  });

  test('8 When the #new-quote button is clicked, my quote machine should fetch a new quote and display it in the #text element', async () => {
    const { container } = render(
      <QuoteBox quoteService={changeableQuotesService} />
    );

    let wrapper = await findByTestId(container, 'quote-box');
    expect(wrapper.querySelector('#text').textContent).toContain('quote1');
    fireEvent.click(wrapper.querySelector('#new-quote'));
    wrapper = await findByTestId(container, 'quote-box');
    expect(wrapper.querySelector('#text').textContent).toContain('quote2');
  });

  test("9 My quote machine should fetch the new quote's author when the #new-quote button is clicked and display it in the #author element.", async () => {
    const { container } = render(
      <QuoteBox quoteService={changeableQuotesService} />
    );

    let wrapper = await findByTestId(container, 'quote-box');
    expect(wrapper.querySelector('#author').textContent).toContain('author1');
    fireEvent.click(wrapper.querySelector('#new-quote'));
    wrapper = await findByTestId(container, 'quote-box');
    expect(wrapper.querySelector('#author').textContent).toContain('author2');
  });

  test('10 I can tweet the current quote by clicking on the #tweet-quote "a" element. This a element should include the "twitter.com/intent/tweet" path in its href attribute to tweet the current quote.', async () => {
    const { container } = render(defaultQuoteBox);
    const wrapper = await findByTestId(container, 'quote-box');
    const tweetQuote = wrapper.querySelector('#tweet-quote');
    expect(tweetQuote.href).toContain('twitter.com/intent/tweet');
  });

  test.todo(
    "11 The #quote-box wrapper element should be horizontally centered. Please run tests with browser's zoom level at 100% and page maximized."
  );
});
