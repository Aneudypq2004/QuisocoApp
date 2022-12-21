import { useContext, useEffect, createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from "next/router";

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {
    const router = useRouter()

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaACtual] = useState({})
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState('')



    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias');
        setCategorias(data)
    }
    useEffect(() => {
        obtenerCategorias();
    }, []);

    useEffect(() => {
        setCategoriaACtual(categorias[0])
    }, [categorias]);

    useEffect(() => {

        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad
        ) + total, 0)

        setTotal(nuevoTotal)
    }, [pedido]);


    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id);
        setCategoriaACtual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({ categoriaId, ...producto }) => {

        if (pedido.some(productoState => productoState.id === producto.id)) {

            //Actualizar la cantidad

            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState);
            setPedido(pedidoActualizado)
            toast.success('Actualizado Correctamente')

        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado Correctamente')


        }

        setModal(false)


    }

    const handleEditarCantidades = (id) => {
        const productoActualizar = pedido.filter(producto => producto.id === id);
        setProducto(productoActualizar[0]);
        setModal(!modal);

    }
    const handleEliminarProducto = (id) => {
        const productoActualizado = pedido.filter(producto => producto.id !== id);
        setPedido(productoActualizado);
        toast.error('Eliminado correctamente')

    }
    const colocarOrden = async e => {

        e.preventDefault();
        
        try {

            await axios.post('/api/ordenes', {
                nombre,
                pedido,
                total,
                fecha: Date.now().toString()
            });

            toast.success('Pedido realizado Correctamente');

            setPedido([]);

            setNombre('');

            setCategoriaACtual(categorias[0]);

            setTimeout(() => {

                router.push('/');

            }, 3000);



        } catch (error) {
            console.log(error);
        }




    }




    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                producto,
                handleSetProducto,
                handleChangeModal,
                handleAgregarPedido,
                modal,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total

            }}>

            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext

