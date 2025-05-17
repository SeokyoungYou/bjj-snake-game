import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
