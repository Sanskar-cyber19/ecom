import { getDiscount } from "@/utils/discount";
import Image from "next/image";
import Link from "next/link";

export function Card({ image, width, height,price,oldPrice, title, body, view }) {
  const bodyText = (text, wordLimit = 12) => {
    const words = text.trim().split(/\s+/);
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const titleText = (text, wordLimit = 6) => {
    const words = text.trim().split(/\s+/);
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  return (
    <div className="col-lg-3 mb-2">
      <div className="card h-100">
        <Image
          src={image}
          width={width}
          height={height}
          className="bd-placeholder-img card-img-top"
          alt={title}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{titleText(title)}</h5>
          <p className="card-text flex-grow-1">
            {bodyText(body)}<br/><br/>
            <span className="d-flex justify-content-between">
            <b>Price : {price}.00</b>
              <b className="text-success">{getDiscount(price,oldPrice)}% off</b>
            </span>
          </p>
          <div className="d-flex gap-2 justify-content-center mt-auto">
            <Link href={view} className="btn btn-primary">
              Add to Cart »
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}