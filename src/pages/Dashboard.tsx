import {GestionRComponent} from "../components/index"
import {NavbarComponent} from "../components/index"
import {FooterComponent} from "../components/index"

function Dashboard(){
    return(
    <div className="page-container">
        <NavbarComponent />
        <div className="page-content">
            <GestionRComponent/>
        </div>
        <FooterComponent/>
    </div>


    )
}
export default Dashboard