import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Garage Plans | Browse Our Collection',
  description: 'Explore our collection of garage plans, from simple 1-car designs to multi-car garages with living space.',
};

export default function GaragePlansLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="garage-plans-layout">
      {children}
    </div>
  );
}