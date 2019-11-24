import React from 'react';
import QuoteBox from '../Quotes/QuoteBox';

const styles = {
  app: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quoteBoxContainer: {}
};

const App = () => {
  return (
    <div style={styles.app}>
      <div style={styles.quoteBoxContainer}>
        <QuoteBox />
      </div>
    </div>
  );
};

export default App;
