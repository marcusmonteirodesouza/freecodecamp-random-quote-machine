import React from 'react';
import QuoteBox from '../Quotes/QuoteBox';

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'rotate(-1.75deg)'
  },
  appHeader: {
    textTransform: 'capitalize'
  },
  quoteBoxContainer: {
    width: '60%'
  }
};

const App = () => {
  return (
    <div style={styles.appContainer}>
      <header style={styles.appHeader}>
        <h1>programming quotes...</h1>
      </header>
      <div style={styles.quoteBoxContainer}>
        <QuoteBox />
      </div>
    </div>
  );
};

export default App;
