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
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5M8XTGCH');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5M8XTGCH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
