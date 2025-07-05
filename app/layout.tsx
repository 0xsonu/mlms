import "./globals.css";
import type { Metadata } from "next";
import { TenantProvider } from "@/lib/contexts/tenant-context";
import { AuthProvider } from "@/lib/contexts/auth-context";

export const metadata: Metadata = {
  title: "Multi-Tenant LMS",
  description:
    "A comprehensive learning management system with multi-tenant support",
  keywords:
    "LMS, multi-tenant, learning management system, education, online courses",
  authors: [{ name: "Sonu Kumar", url: "https://github.com/0xsonu" }],
  creator: "Sonu Kumar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter">
        <TenantProvider>
          <AuthProvider>{children}</AuthProvider>
        </TenantProvider>
      </body>
    </html>
  );
}
