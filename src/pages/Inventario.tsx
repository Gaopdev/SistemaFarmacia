import {NavbarComponent} from "../components/index"
import {FooterComponent} from "../components/index"
import {InventarioComponent} from "../components/index"

function Inventario(){
    return(
    <div className="page-container">
        <NavbarComponent />
        <div className="page-content">
            <InventarioComponent/>
        </div>
        <FooterComponent/>
    </div>


    )
}
export default Inventario