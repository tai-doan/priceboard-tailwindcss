import { useEffect } from 'react';
import PriceboardSocketProvider from './provider/priceboard-socket';
import { applyStoredTheme } from './utils/themeToggle';
import Body from './views/body';
import Header from './views/header';
import PriceboardLayout from './views/priceboard';

// import style
import './styles/index';


const App = () => {
  useEffect(() => {
    applyStoredTheme();

    return () => {
    }
  }, [])

  return (
    <main className='min-h-screen space-y-1 bg-light-frame dark:bg-dark-frame'>
      <Header />
      <Body>
        <PriceboardSocketProvider>
          <PriceboardLayout />
        </PriceboardSocketProvider>
      </Body>
    </main>
  )
}

export default App;
