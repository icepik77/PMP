import { Header } from "./header";
import {CostModule} from "./CostModule.tsx";

export function Report(){
    return(
        <div>
            {Header()}
            <h1>Отчет</h1>
            {CostModule()}
            

        </div>
    )
}