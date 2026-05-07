import { useNavigate } from "react-router-dom"
import useDatos from "../../hooks/useDatos"
import "./footer.css"
function FooterComponent() {
    const {logout} = useDatos();
    const navigate = useNavigate();

    const handleLogout = () =>{
        logout();
        navigate("/inicio")
    }

    return(
        <>
        <div className="footer">
            <button className="btn btn-danger" onClick={handleLogout}>Salir</button>
            <p>© 2026 <span>VFarmacia Benevides</span> · Todos los derechos reservados</p>
        </div>
        </>
    )
}
export default FooterComponent