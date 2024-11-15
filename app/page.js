import { Carousel } from "@/components/Carousel";

const Feature = [
  {
    id: "1",
    title: "Custom UI",
    body: "Tailored UI design according to client specifications.",
  },
  {
    id: "2",
    title: "Admin Panel",
    body: "Integrated admin panel for easy management and control.",
  },
  {
    id: "3",
    title: "Email & SMS Notifications",
    body: "Automated email and SMS notifications on order placement.",
  },
  {
    id: "5",
    title: "Domain & SSL",
    body: "Free domain and SSL certificate for the first year.",
  },
  {
    id: "6",
    title: "Quick Launch",
    body: "Your website will be ready to launch within 3 days.",
  },
  {
    id: "7",
    title: "Free Maintenance",
    body: "One month of free maintenance and updates for your website.",
  },
];

const website = [
  // Core E-commerce Features
  {
    id: "1",
    title: "Product Catalog",
    body: "Advanced filtering and smart search to help customers find products instantly",
  },
  {
    id: "2",
    title: "Shopping Cart",
    body: "Real-time cart updates with a seamless add/remove experience",
  },
  {
    id: "3",
    title: "Checkout Process",
    body: "Streamlined 3-step checkout for faster purchase completion",
  },
  {
    id: "4",
    title: "User Registration",
    body: "Quick account creation with social media integration options",
  },
  {
    id: "5",
    title: "Order Tracking",
    body: "Live order status updates with email/SMS notifications",
  },

  // Product Presentation
  {
    id: "6",
    title: "Product Images",
    body: "High-resolution, zoomable product images",
  },
  {
    id: "7",
    title: "Product Descriptions",
    body: "Detailed specifications with key features and benefits highlighted",
  },
  {
    id: "8",
    title: "Price Information",
    body: "Dynamic pricing with bulk purchase discounts and stock alerts",
  },
  {
    id: "9",
    title: "Product Categories",
    body: "Intuitive category structure for easy product discovery",
  },
  {
    id: "10",
    title: "Related Products",
    body: "Smart product recommendations based on browsing history",
  },

  // User Experience
  {
    id: "11",
    title: "Responsive Design",
    body: "Perfect viewing experience across all devices and screen sizes",
  },
  {
    id: "12",
    title: "Easy Navigation",
    body: "Clean, intuitive menu structure with breadcrumb navigation",
  },
  {
    id: "13",
    title: "Quick Load Times",
    body: "Optimized page loading with lazy loading for better performance",
  },
  {
    id: "15",
    title: "Product Comparison",
    body: "Side-by-side product comparison for informed decision making",
  },

  // Business Operations
  {
    id: "16",
    title: "Admin Dashboard",
    body: "Comprehensive dashboard for complete store management",
  },
  {
    id: "18",
    title: "Order Management",
    body: "Centralized order processing with bulk action capabilities",
  },
  {
    id: "19",
    title: "Customer Database",
    body: "Detailed customer profiles with purchase history and preferences",
  },
  {
    id: "20",
    title: "Analytics Tools",
    body: "Advanced reporting with sales trends and customer behavior insights",
  },

  // Payment and Security
  {
    id: "21",
    title: "Payment Options",
    body: "Multiple secure payment methods including credit cards and digital wallets",
  },
  {
    id: "22",
    title: "SSL Security",
    body: "Bank-grade encryption for all transactions and data transfer",
  },
  {
    id: "23",
    title: "Secure Checkout",
    body: "PCI DSS compliant checkout process for safe payments",
  },
];

export default function Home() {
  return (
    <div>
      <div className="w-100" style={{ height: "60vh" }}>
        <Carousel />
      </div>
      <h3 className="text-center my-3">Website Features</h3>
      <div className="container py-3">
        <div className="row justify-content-center">
          {website.map((f) => (
            <div className="col-sm-6 col-lg-4 mb-4" key={f.id}>
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">{f.title}</h5>
                  <p className="card-text">{f.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-center my-3">Company Provides Features</h3>
      <div className="container py-3">
        <div className="row justify-content-center">
          {Feature.map((f) => (
            <div className="col-sm-6 col-lg-4 mb-4" key={f.id}>
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">{f.title}</h5>
                  <p className="card-text">{f.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
