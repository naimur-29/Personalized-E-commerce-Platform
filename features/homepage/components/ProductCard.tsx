"use server";

import { Button } from "@/components/ui/button";
import Image from "next/image";

type productType = {
  imgLink: string;
  name: string;
  price: number;
};

type propType = {
  product: productType;
};

export default async function ProductCard({ product }: propType) {
  return (
    <div>
      <div className="relative mb-5 w-full aspect-[3/4] px-4">
        <Image
          src={product.imgLink}
          alt={product.name}
          fill={true}
          className="object-cover object-top"
        />
      </div>
      <h4 className="text-primary text-2xl lg:text-3xl font-serif">
        {product.name || "Loading..."}
      </h4>
      <p className="font-mono text-lg text-muted-foreground mb-4">
        {product.price || "Loading..."}/-
      </p>
      <Button className="text-md">Shop now</Button>
    </div>
  );
}
