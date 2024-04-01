import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";

//pages and components
import DisplayTab from './webComponents/displaytab'
import NavBar from './webComponents/Navbar'
import Footer from './webComponents/footer';
import SearchComponent from './webComponents/Search';
import {DataReceiver} from './DataContext'

function App() {
  return (
    <div className="App" padding-bottom='60px'>
      <BrowserRouter>
        <DataReceiver>
          <NavBar />
          <div className='pages' style={{marginTop: 200, marginBottom: 100}}>
            <Routes>
            <Route 
                path="/search"
                element={<SearchComponent />}
              />
              <Route 
                path="/search/home"
                element={<SearchComponent />}
              />
              <Route 
                path="/search/:ticker" 
                element={<DisplayTab />}
              />
              <Route 
                path="/watchlist"
                element= ""
              />
              <Route
                path="/portfolio"
                element=""
                />
            </Routes>
          </div>
          <Footer />
        </DataReceiver>
      </BrowserRouter>
    </div>
  );
}

export default App;

