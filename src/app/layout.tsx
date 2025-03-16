import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "react-datepicker/dist/react-datepicker.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "@/styles/sass/bootstrap.scss";
import "@/styles/css/global.css";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calculadora de Interés Moratorio",
  icons: {
    icon: "/unam.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`} data-bs-theme="dark">
        {children}
        <footer className="text-center text-muted mt-5 p-3 border-top">
  <div className="container">
    <div className="row">
      <div className="col-md-9">
        <p>
          La información proporcionada por esta calculadora es únicamente de carácter informativo y no sustituye el asesoramiento legal o financiero.
        </p>
        <p>
          Los valores de <strong>UDIS</strong> y <strong>CCP-UDIS</strong> están disponibles hasta el <strong>25 de marzo de 2025</strong>, mientras que los datos de <strong>CCP-UDIS</strong> solo cubren hasta <strong>febrero de 2025</strong>.
        </p>
      </div>
      <div className="col-md-3 text-md-end border-start">
        <p className="small">
          Desarrollado por:<br />
          <strong>Alvarado Reyes Jorge Miguel</strong>, <br />
          <strong>Monroy Alarcon Omar Ulises</strong>.
          <strong>Tirado Luna Jose Angel</strong>, <br />
          <strong>Jimenez Pineda Leydi Montserrat</strong> y <br />
        </p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </div>
  </div>
</footer>

      </body>
    </html>
  );
}
