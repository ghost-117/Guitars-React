import Header from "./components/Header"
import Guitar from "./components/Guitar"
import Footer from "./components/Footer"
import { db } from "./data/guitarras"
import { useState } from "react"
function App() {

  const [guitars, setGuitars] = useState(db)
  const [cart, setCart] = useState([])

  const addGuitar = (guitar) => {
    console.log('Recibe guitarra', guitar.nombre)
    const idExist = cart.findIndex(g => g.id === guitar.id)
    if(idExist === -1){
      const newCart = [... cart]
      newCart.push({
        ...guitar,
        cantidad: 1
      })
      setCart(newCart)
    }else{
      const newCart = [... cart]
      newCart[idExist].cantidad++
      setCart(newCart)
    }
  }

  return (
    <>
      <Header/>
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
        {
        guitars.map(guitar => <Guitar 
                                key={guitar.id}
                                guitar={guitar}
                                addGuitar = {addGuitar}
                                />)
        }
        </div>
      </main>

      <Footer/>
    </>
  )
}

export default App