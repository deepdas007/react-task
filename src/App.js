import "./App.css";
import DynamicTable from "./pages/AddProduct";

function App() {
    return (
        <div className="App">
            <h1>Add Product Variants</h1>
            <DynamicTable rowCount="4" columnCount="4" />
        </div>
    );
}

export default App;
