import { Handshake, Leaf, Gem } from "lucide-react";

const features = [
  {
    icon: Handshake,
    title: "Ethically Sourced",
    description: "Every piece is traceable. We partner directly with artisan collectives to ensure fair wages and safe working environments."
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Process",
    description: "From carbon-neutral shipping to 100% biodegradable packaging, our footprint is as light as our aesthetic."
  },
  {
    icon: Gem,
    title: "Timeless Quality",
    description: "We reject fast furniture. Our products are engineered for durability and designed to transcend fleeting seasonal trends."
  }
];

const WhyTerraModern = () => {
  return (
    <div className="w-full bg-muted/40 py-20 px-8 lg:px-22">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <h2 className="text-foreground text-3xl md:text-[2.5rem] font-bold tracking-tight mb-4">
            Why TerraModern?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            We believe that your home should be a reflection of the natural world. Our philosophy centers on materials that age gracefully and designs that serve a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card text-card-foreground rounded-4xl p-8 lg:p-10 shadow-sm flex flex-col items-start transition-transform hover:-translate-y-1 duration-300"
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

export default WhyTerraModern;
