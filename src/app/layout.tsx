import type { Metadata } from "next";
import { Crimson_Pro, Inter } from "next/font/google";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gerador de Contratos Grátis - Documentos Profissionais",
  description: "Crie contratos profissionais em minutos. Modelos de prestação de serviços, freelancer e NDA. 100% grátis.",
  keywords: "gerador de contratos, contrato de prestação de serviços, contrato freelancer, nda, termo de confidencialidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${crimsonPro.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
