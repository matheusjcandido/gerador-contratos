import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerador de Contratos Grátis - Prestação de Serviços, Freelancer, NDA",
  description: "Crie contratos profissionais em minutos. Modelos de contrato de prestação de serviços, freelancer e termo de confidencialidade (NDA). 100% grátis.",
  keywords: "gerador de contratos, contrato de prestação de serviços, contrato freelancer, nda, termo de confidencialidade, modelo de contrato grátis",
  openGraph: {
    title: "Gerador de Contratos Grátis",
    description: "Crie contratos profissionais em minutos - 100% grátis!",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
