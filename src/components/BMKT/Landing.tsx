import React from "react";

export default function Landing() {
  return (
    <div className="w-full bg-white">
        <section
            className="w-full bg-cover bg-center text-white py-24 px-6 flex flex-col items-start"
            style={{
                backgroundImage: "url('/header.webp')",
            }}
            >
            <div className="w-full max-w-4xl flex flex-col items-center"> 

                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-center">
                EVOLUCIONA TU <br />
                EMPRESA CON UNA <br />
                TIENDA ONLINE
                </h1>

                <button className="mt-8 bg-lime-400 hover:bg-lime-500 text-black font-bold px-6 py-3 rounded-full text-lg transition">
                VER PAQUETES
                </button>
            </div>
        </section>

        <section className="bg-white py-24 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            <div className="relative flex justify-center">
                <img
                src="UC.webp"
                className=" w-3/4"
                />
            </div>

            <div>
                <h2 className="text-4xl text-[#232B34] font-extrabold mb-4">
                UNA SUCURSAL <br /> MÁS, EN LÍNEA
                </h2>
                <p className="text-lg text-[#232B34] leading-relaxed">
                Sin restricciones geográficas <br />
                ni horarios, expande tus oportunidades <br />
                de venta con una tienda online en  <br />
                Shopify.
                </p>
            </div>
            </div>
        </section>
    </div>
  );
}
