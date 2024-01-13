import "./styles.css";
import { food } from "./mock-data";
import FoodTable from "./components/FoodTable/FoodTable";


function App() {
  return (
    <>
      <h1>Alimentos disponibles</h1>
      <FoodTable list={food} />
    </>
  );
}

export default App;
