import { Card } from "@/components/Card";
import { getData } from "@/config/db";

export default async function Page({ params }) {
  const { category } = await params; // Await params to access its properties

  const data = await getData("api/product/");

  return (
    <div>
      {/* <h1 className="text-center my-5">{categoryData.name}</h1> */}
      <div className="container">
        <div className="row">
          {data ? (
            data.products
              .filter((p) => {
                return parseInt(p.category_id) === parseInt(category);
              })
              .map((p) => {
                return (
                  <Card
                    key={p.id} // Use p.id as key for better uniqueness
                    title={p.name}
                    body={`${p.info} - ${p.category}`}
                    view={`/products/${p.id}`}
                    image={`/${p.image}`}
                    width="100"
                    height="200"
                    price={p.price}
                    oldPrice={p.oldPrice}
                  />
                );
              })
          ) : (
            <div>No Data Found...</div>
          )}
        </div>
      </div>
    </div>
  );
}
