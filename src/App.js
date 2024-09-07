import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

function App() {

  async function fetchData() {
    const res = await fetch("https://fakestoreapi.com/products");
    return res.json();
  }
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Card fetchData={fetchData} />
      </div>
    </QueryClientProvider>
  );
}

export default App;

function Card({ fetchData }) {
  const { data, status } = useQuery("products", fetchData);

  if (status === "loading") {
    return <p>..loading</p>;
  }

  if (status === "error") {
    return <p>Error</p>;
  }
  return (
    <div className="container">
      {data.map((product) => (
        <div className="card">
          <img
            src={product.image}
            className="card-img-top"
            alt={product.title}
          />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <div className="card-price">${product.price.toFixed(2)}</div>
            <button className="btn btn-primary">Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
