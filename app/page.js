import { Carousel } from "@/components/Carousel";

const Feature = [
  { id: "1", title: "Custom UI", body: "Tailored UI design according to client specifications." },
  { id: "2", title: "Admin Panel", body: "Integrated admin panel for easy management and control." },
  { id: "3", title: "Email & SMS Notifications", body: "Automated email and SMS notifications on order placement." },
  { id: "4", title: "Product Categories", body: "Separation of products into categories for better organization." },
  { id: "5", title: "Domain & SSL", body: "Free domain and SSL certificate for the first year." },
  { id: "6", title: "Quick Launch", body: "Your website will be ready to launch within 3 days." },
  { id: "7", title: "Free Maintenance", body: "One month of free maintenance and updates for your website." },
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
