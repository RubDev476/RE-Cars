import type { Metadata } from "next";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//import "@/styles/globals/_typography.scss"; //import separately in "layout.tsx";
import "./globals.scss";
import "../styles/index.scss";

import { Providers } from "@/store/Providers";

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import { Header, Footer } from "@/components";

export const metadata: Metadata = {
    title: "RE Autos",
    description: "Autos usados, o seminuevos a los mejores precios",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Header />

                    {children}
                    
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
