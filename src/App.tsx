
import './App.css'
import BmsPanel from './components/BmsPanel'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <div className="content-wrapper">
          <BmsPanel />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App