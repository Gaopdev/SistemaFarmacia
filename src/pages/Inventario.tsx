import { useEffect, useState } from "react";
import {NavbarComponent} from "../components/index"
import {FooterComponent} from "../components/index"
import {InventarioComponent} from "../components/index"
import {SearchComponent} from "../components/index"
import useDatos from "../hooks/useDatos";

function Inventario(){
    const [products, setProducts] = useState<MedicamentoUI[]>([]);
    const { obtenerMedicamentos } = useDatos();
    const [filtro, setFiltro] = useState("");
    const alEscribir = (valor: string) => {
        setFiltro(valor);
    };
    const productosFiltrados = products.filter((p) =>
        p.titulo.toLowerCase().includes(filtro.toLowerCase())
    );

    useEffect(() => {
    const cargar = async () => {
        const data = await obtenerMedicamentos();
        setProducts(data);
    };

    cargar();
}, []);
    return(
    <div className="page-container">
        <NavbarComponent />
        <div className="page-content">
            <SearchComponent alEscribir={alEscribir}/>
            <InventarioComponent
            products={productosFiltrados}/>
        </div>
        <FooterComponent/>
    </div>


    )
}
export default Inventario