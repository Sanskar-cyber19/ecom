"use client";

import { getData, getImage } from "@/config/db";
import { useCart } from "@/context/cart";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/Card";
import { getDiscount } from "@/utils/discount";

export default function Category() {
  const params = useParams();
  const { addItem } = useCart();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getData()
        //   `api/product/${params.product}/?format=json`
        // );
        setData(result.products);

        const sugg = await getData("api/product/");
        setSuggestions(sugg.products);

        // Fetch all image URLs in parallel
        // const imagePromises = result.images.map(async (image) => {
        //   try {
        //     const imageData = await getImage(image);
        //     return imageData.image;
        //   } catch (error) {
        //     console.error("Error loading image:", error);
        //     return null;
        //   }
        // });

        // const resolvedImageUrls = await Promise.all(imagePromises);
        setImageUrls(result?.products[params.product - 1]?.images_id);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.product]);

  const addProduct = () => {
    if (data) {
      addItem(data[params.product - 1]);
      alert("Product added to cart.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // if (!data || imageUrls.length === 0) {
  //   return (
  //     <div className="text-center p-4">
  //       <h2 className="text-xl font-semibold text-red-600">
  //         Error: Something is wrong :)
  //         {JSON.stringify(suggestions, null, 2)}
  //       </h2>
  //     </div>
  //   );
  // }

  return (
    <div className="mx-4">
      {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
      <div className="container d-flex flex-lg-nowrap flex-md-wrap flex-wrap gap-5 align-items-start">
        <div
          id="myCarousel"
          className="carousel slide w-100 mx-5"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {JSON.stringify(imageUrls,null,2)}
            {imageUrls.map((imageUrl, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <Image
                  src={`/${imageUrl}`}
                  width={600}
                  height={600}
                  alt={`${data.name} - Image ${index + 1}`}
                  className="object-cover w-full h-auto max-w-full" // Make it responsive
                  layout="responsive"
                />
              </div>
            ))}
          </div>
          <div>
            <button
              className="btn"
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide="prev"
            >
              <FaArrowLeft className="text-black" />
            </button>
            <button
              className="btn"
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide="next"
            >
              <FaArrowRight className="text-black" />
            </button>
          </div>
        </div>

        <div className="mx-5 w-100">
          <h1>{data[params.product - 1].name}</h1>
          <h3>Price : {data[params.product - 1].price}.00</h3>
          <h5 className="text-success">{getDiscount(data[params.product - 1].price, data[params.product - 1].oldPrice)}% off</h5>
          <p>
            {data[params.product - 1].info}
            <br />
            <b>Rating: </b>
            {data[params.product - 1].rating}
          </p>
          <div className="d-flex">
            <button className="btn btn-primary px-5 mx-1" onClick={addProduct}>
              Add to cart
            </button>
            <button className="btn btn-primary px-5 mx-1">Order Now</button>
          </div>
        </div>
      </div>

      <h3 className="mt-5">Suggestions</h3>
      <div className="d-flex gap-3 py-3">
        {suggestions.count ? (
          suggestions.results.map((p) => {
            // Check if product category matches the requested category
            if (
              parseInt(p.category) !== parseInt(data.category) ||
              p.name === data.name
            ) {
              return null; // Return null instead of rendering nothing
            }
            return (
              <Card
                key={p.id} // Use p.id as key for better uniqueness
                title={p.name}
                body={`${p.info} - ${p.category}`}
                view={`/products/${p.id}`}
                image={p.image}
                width="50"
                height="300"
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
  );
}
