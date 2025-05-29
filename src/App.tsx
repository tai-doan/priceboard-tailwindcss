import { useEffect } from 'react';
import { applyStoredTheme } from './provider/app-store';
import Body from './views/body';
import Header from './views/header';
import PriceboardLayout from './views/priceboard';

// import style
import PriceboardSocketManager from './provider/priceboard-socket-manager';
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
        <>
          <PriceboardSocketManager />
          <PriceboardLayout />
        </>
      </Body>
    </main>
  )
}

export default App;
