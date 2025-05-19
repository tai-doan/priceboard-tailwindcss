import { useEffect } from 'react';
import './App.css';
import { applyStoredTheme } from './utils/themeToggle';
import Body from './views/body';
import Header from './views/header';
import PriceboardLayout from './views/priceboard';


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
        <PriceboardLayout />
      </Body>
    </main>
  )
}

export default App;
