import "./gestionR.css"

function GestionRComponent(){
    return(
        <div className="container-cards">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <h1 className="titulos-dash">
                            Valor total de Mercancia 💵
                        </h1>
                        <h2>${}</h2>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <h1 className="titulos-dash">
                            Stock Critico 📉
                        </h1>
                        <h2>{}</h2>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <h1 className="titulos-dash">
                            Agregar Medicamentos
                        </h1>
                        <button className="btn btn-info">Agregar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GestionRComponent