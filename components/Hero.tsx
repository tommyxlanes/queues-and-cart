import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-24 grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Minimal products. <br />
            Maximum quality.
          </h1>

          <p className="text-neutral-300 text-lg">
            Thoughtfully designed products made to last.
          </p>

          <div className="flex gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-md bg-white text-black px-6 py-3 font-medium hover:bg-neutral-200 transition"
            >
              Shop now
            </Link>

            <Link
              href="#featured"
              className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-white hover:bg-white/10 transition"
            >
              Featured
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="aspect-square rounded-2xl bg-neutral-800 relative">
            <Image
              src={
                "https://images.unsplash.com/photo-1604506847073-4a8e18e07d92?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              fill
              className="w-full h-full"
              alt="Straight Street"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
