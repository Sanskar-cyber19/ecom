import { Card } from "@/components/Card";
import { getData } from "@/config/db";

export default async function page() {
  const data = await getData("api/product/?format=json");
  if(!data) return<p>Loading....</p>
  return (
    <div>
      <h1 className="text-center my-5"> All Products</h1>
      <div className="container">
        <div className="row">
          {/* <pre>{JSON.stringify(data.products,null,2)}</pre> */}
          {data ? data.products.map((p, index) => (
            <Card
              key={index}
              title={p.name}
              body={p.info}
              view={`/products/${p.id}`}
              image={`/${p.image}`}
              width="100"
              height="200"
              price={p.price}
              oldPrice={p.oldPrice}
            />
          )) : (
            <div>No data Found....</div>
          )}
        </div>
      </div>
    </div>
  );
}
