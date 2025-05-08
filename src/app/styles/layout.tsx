export default function StylesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="styles-layout">
      {children}
    </div>
  );
}