import { Home, Login, ProductDetails, Purchases } from "./pages"
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { LoadingScreen, NavBar, ProtectedRoutes } from './components'
import { useSelector } from 'react-redux'

function App() {
  
  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      
      <HashRouter>
        <NavBar />

        <Container>

          {isLoading && <LoadingScreen/>}

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/products/:id" element={<ProductDetails />}/>

            <Route element={<ProtectedRoutes/>}>
              <Route path="/purchases" element={<Purchases />}/>
            </Route>

          </Routes>

        </Container>

      </HashRouter>
      
    </div>
  )
}

export default App
