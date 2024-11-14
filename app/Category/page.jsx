import { getData } from "@/config/db";
import Image from "next/image";
import Link from "next/link";

export default async function Category() {
  const data = await getData("api/category/");
  return (
    <div>
      <div className="container py-3">
        <div className="row">
          {data.count > 0 ? data.results.map((c, index) => (
            <>
              <div className="col-lg-3 text-center">
                <Image
                  src="http://localhost:8000/media/media/_lyricalguy_-20240104-0003_GPQhkJw.jpg"
                  width={200}
                  height={200}
                  alt="cate"
                  className="rounded-circle"
                />
                <div>
                  <Link href={`/Category/${c.id}`} className="btn px-5">
                    <h2>{c.name}</h2>
                  </Link>
                </div>
              </div>
            </>
          )) : (
            <div className="col-lg-3 ">No Data Found...</div>
          )}
        </div>
      </div>
    </div>
  );
}
