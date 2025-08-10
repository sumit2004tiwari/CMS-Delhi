import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "VVWorx Future Forward Marketing",
  description: "VVWorx Future Forward Marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">   
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>  
      <body suppressHydrationWarning>
      
        <main>{children}</main>
     
      </body>
    </html>
  );
}
