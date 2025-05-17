import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { getBaseUrl } from "@/lib/metaData";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrl();
  return {
    title: "BJJ Snake Game",
    description: "Progress from White Belt to Black Belt in this snake game!",
    icons: {
      icon: `${baseUrl}/favicon.ico`,
    },
    openGraph: {
      images: [
        {
          url: `${baseUrl}/og-image.png`,
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RZDJ9VWK1V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RZDJ9VWK1V');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
