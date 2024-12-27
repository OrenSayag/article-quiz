import '@article-quiz/preset';

export const metadata = {
  title: 'Article Quiz',
  description: 'Build knowledge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
