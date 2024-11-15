import { Carousel } from "@/components/Carousel";

const Feature = [
  { id: "1", title: "Custom UI", body: "Custom UI design according to Client" },
  { id: "2", title: "Admin", body: "We provide Intergrated admin panle" },
  { id: "3", title: "Email/Message", body: "on order Email and phone masssage provide" },
  { id: "4", title: "Category", body: "Category wise product separeation" },
  { id: "5", title: "Domain/SSL", body: "free domain ans ssl certicate for first year" },
  { id: "6", title: "Timing", body: "In 3 day's website ready to launch" },
  { id: "7", title: "Free Matainsec", body: "Fisrt 1 month free Mataince and changes for website." },
];
export default function Home() {
  return (
    <div>
      <div className="w-100" style={{ height: "60vh" }}>
        <Carousel />
      </div>
      <h3 className="text-center my-3">Feature</h3>
      <div className="container py-3">
        <div className="row justify-content-center">
          {Feature.map((f) => (
            <div className="col-sm-6 col-lg-4 mb-4" key={f.id}>
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">{f.title}</h5>
                  <p className="card-text">
                    {f.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
