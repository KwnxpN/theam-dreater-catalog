import { Eye, Filter, CheckCircle2 } from "lucide-react";

const features = [
  {
    title: "Visual-First Discovery",
    description:
      "Explore products through clear, high-quality images supported by concise and practical details, helping you understand key features before opening each individual item page.",
    icon: Eye,
  },
  {
    title: "Smart Filtering",
    description:
      "Quickly narrow down the catalog using intuitive category filters, allowing you to focus on the most relevant products and navigate collections with greater efficiency.",
    icon: Filter,
  },
  {
    title: "Trusted Information",
    description:
      "Every product listing is carefully reviewed for clarity and consistency, ensuring specifications, descriptions, and essential details remain accurate, structured, and reliable.",
    icon: CheckCircle2,
  },
];

const FAQ = () => {
  return (
    <div className="w-full bg-muted/40 py-20 px-8 lg:px-22">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <h2 className="text-foreground text-3xl md:text-[2.5rem] font-bold tracking-tight mb-4">
            Why Choose Theam Dreater?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Theam Dreater is a curated product catalog built for clarity and discovery.
            We organize collections thoughtfully so you can explore products with focus,
            structure, and ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card border text-card-foreground rounded-4xl p-8 lg:p-10 shadow-sm flex flex-col items-start transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-accent group-hover:bg-primary transition-colors duration-300 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-card-foreground text-xl font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
