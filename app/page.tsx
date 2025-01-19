"use server";

import ProductCard from "@/features/homepage/components/ProductCard";
import Image from "next/image";

const products = [
  {
    imgLink: "/products/Le Beau Le Parfum.jpg",
    name: "Le Beau Le Parfum",
    price: 1699,
  },
  {
    imgLink: "/products/Khamrah.jpg",
    name: "Khamrah",
    price: 2499,
  },
  {
    imgLink: "/products/Baccarat Rouge 540.jpg",
    name: "Baccarat Rouge 540",
    price: 3499,
  },
  {
    imgLink: "/products/Layton Parfums de Marly.jpg",
    name: "Layton Parfums de Marly",
    price: 999,
  },
  {
    imgLink: "/products/Eros Versace.jpg",
    name: "Eros Versace",
    price: 5499,
  },
];

export default async function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full aspect-[3/5] max-h-[75vh] lg:max-h-screen">
        <Image
          className="select-none object-cover object-[20%_0%] w-full h-full -z-50"
          src="/hero-bg.webp"
          fill={true}
          alt="hero section background"
        />

        <div className="flex flex-col items-center justify-end w-full h-full p-4 py-8 bg-[#001B0033]">
          <h2 className="inline mb-12 max-w-[1000px] text-secondary text-6xl lg:text-8xl text-center font-serif font-semibold">
            Meet our new limited collection.
          </h2>
          <p className="inline mb-12 lg:mb-24 max-w-[1000px] text-muted text-2xl text-center font-serif">
            AVAILABLE NOW
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 content-center my-6 lg:my-10 px-2 sm:px-3 lg:px-6 gap-6">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </section>

      {/* About Section */}
      <section className="my-16">
        <div className="relative w-full aspect-[3/4] max-h-screen lg:max-h-[65vh]">
          <Image
            className="select-none object-cover object-[50%_30%] w-full h-full -z-50"
            src="/about-section-separator.jpg"
            fill={true}
            alt="about section separator"
          />
        </div>
      </section>
    </main>
  );
}
