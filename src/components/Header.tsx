import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Leaf, Search, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  return (
    <header className="border-b border-muted shadow-md">
      <div className="flex mx-auto justify-around px-4 py-6">
        <div className="flex text-center justify-around items-center gap-6">
          <Avatar size="lg">
            <AvatarFallback className="bg-primary">
              <Leaf className="text-white" />
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-2xl tracking-wide">TerraModern</span>
          <span className="font-medium text-secondary-foreground">Shop</span>
          <span className="font-medium text-secondary-foreground">
            Collections
          </span>
          <span className="font-medium text-secondary-foreground">
            Sustainability
          </span>
          <span className="font-medium text-secondary-foreground">
            Our Story
          </span>
        </div>
        <div className="flex text-center justify-around items-center gap-6">
          <InputGroup className="p-5 rounded-3xl shadow-2xs border-2 border-muted">
            <InputGroupInput placeholder="Search products..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Button className="p-5 rounded-2xl">
            <ShoppingCart />
            Cart
          </Button>
          <Avatar className="border-2 border-primary" size="lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
