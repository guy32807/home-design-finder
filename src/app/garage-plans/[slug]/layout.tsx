import { Metadata } from 'next';

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const slug = params.slug;
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: `${title} | Garage Plan Details`,
    description: `View details, specifications, and features of our ${title} garage plan.`,
  };
};

export default function GaragePlanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="garage-plan-layout">
      {children}
    </div>
  );
}