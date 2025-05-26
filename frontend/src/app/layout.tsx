import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
