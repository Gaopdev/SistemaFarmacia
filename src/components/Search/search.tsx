import { useNavigate } from "react-router-dom";
import "./search.css";

interface Props{
    alEscribir:(valor:string)=>void
}

const SearchComponent = ({alEscribir}:Props)=>{
    const navigate = useNavigate();
    return(
        <>
        <div className="container-search">
            <input type="text" className="search form-group m-3" placeholder="🔎 Buscar" onChange={(e)=>alEscribir(e.target.value)}/>
            <button className="btn btn-danger" onClick={() => navigate("/dashboard")}>Regresar</button>
        </div>
        </>
    )
}
export default SearchComponent;  