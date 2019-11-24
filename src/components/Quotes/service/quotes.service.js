const quotesService = {};

quotesService.fetchQuoteData = async abortControllerSignal => {
  const fetchRandomQuote = async abortControllerSignal => {
    try {
      const response = await fetch(
        'https://programming-quotes-api.herokuapp.com/quotes/random',
        { signal: abortControllerSignal }
      );
      const data = await response.json();
      const { author } = data;
      const quote = data.en;
      return {
        author,
        quote
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  const searchWikipedia = async (searchTerm, abortControllerSignal) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${searchTerm
          .split(' ')
          .join('+')}`,
        { signal: abortControllerSignal }
      );

      const data = await response.json();
      const info = data[2][0];
      const page = data[3][0];

      return {
        info,
        page
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  const quoteData = await fetchRandomQuote(abortControllerSignal);
  const { author } = quoteData;
  const { quote } = quoteData;
  const authorData = await searchWikipedia(author, abortControllerSignal);
  const authorInfo = authorData.info;
  const authorPage = authorData.page;

  return {
    quote,
    author,
    authorInfo,
    authorPage
  };
};

export default quotesService;
