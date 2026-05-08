import useDatos from "../../hooks/useDatos"
import "./gestionR.css"
import { useEffect, useState } from "react"

function GestionRComponent(){
    const {obtenerResumenInventraio} = useDatos();
    const [total, setTotal] = useState(0);
    const [critico, setCritico] = useState<any[]>([]);

    useEffect(()=>{
        cargarDatos();
    },[]);

    const cargarDatos = async() => {
        const res = await obtenerResumenInventraio();

        setTotal(res.totalValor);
        setCritico(res.stockCritico);
    }

    return(
        <div className="container-cards">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <h1 className="titulos-dash">
                            Valor total de Mercancia 💵
                        </h1>
                        <h2>${total}</h2>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <h1 className="titulos-dash">
                            Stock Critico 📉
                        </h1>
                        <h2>{critico.length}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GestionRComponent