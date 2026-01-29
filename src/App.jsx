import Header from "./components/Header"
import Guitar from "./components/Guitar"
import Footer from "./components/Footer"
import { db } from "./data/guitarras"
import { useEffect, useState } from "react"
function App() {

  const CartStorage = localStorage.getItem('cart')
  const initilCart = CartStorage? JSON.parse(CartStorage): []

  const [guitars, setGuitars] = useState(db)
  const [cart, setCart] = useState(initilCart)

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

  const addOne = (id) =>{
    const idxGuitar = cart.findIndex(g => g.id === id)
    const newCart = [... cart]
    if(newCart[idxGuitar].cantidad < 10)
    newCart[idxGuitar].cantidad++
    setCart(newCart)
  }

  const lessOne = (id) =>{
    const idxGuitar = cart.findIndex(g => g.id === id)
    const newCart = [... cart]
    if(newCart[idxGuitar].cantidad === 0)
      removeGuitar(id)
    newCart[idxGuitar].cantidad--
    setCart(newCart)
  }

  const cleanCart = (id) =>{
    setCart([])
  }

  const removeGuitar = (id) =>{
    const newCart = cart.filter(g => g.id !== id)
    setCart(newCart)

    

  }
  useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
  return (
    <>
      <Header
      cart={cart}
      guitar={guitars[3]}
      addGuitar={addGuitar}
      addOne = {addOne}
      lessOne = {lessOne}
      removeGuitar ={removeGuitar}
      cleanCart = {cleanCart}
      />
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