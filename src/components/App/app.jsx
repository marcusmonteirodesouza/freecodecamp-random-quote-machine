import React from 'react';
import Media from 'react-media';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
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
  }
};

const App = () => {
  return (
    <div style={styles.appContainer}>
      <header style={styles.appHeader}>
        <h1>
          <a
            href="https://github.com/marcusmonteirodesouza/freecodecamp-random-quote-machine"
            target="_blank"
            rel="noopener noreferrer"
            title="See the source code on Github"
            style={{ marginRight: '.5em' }}
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          programming quotes...
        </h1>
      </header>
      <Media
        query={{
          minWidth: '30em'
        }}
      >
        {matches => (
          <div style={{ width: matches ? '60%' : 'auto' }}>
            <QuoteBox />
          </div>
        )}
      </Media>
    </div>
  );
};

export default App;
