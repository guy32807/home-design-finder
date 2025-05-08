import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import StructuredData from '../../../components/common/StructuredData';

// Blog post data (use your actual data)
const blogPosts = {
  'modern-farmhouse-design-tips': {
    id: '1',
    title: 'Modern Farmhouse Design Tips for Your Dream Home',
    slug: 'modern-farmhouse-design-tips',
    excerpt: 'Learn the key elements that make the Modern Farmhouse style so appealing and how to incorporate them into your home design.',
    content: `
      <p>The Modern Farmhouse style has become one of the most popular home design trends in recent years, beloved for its blend of cozy, traditional elements with clean, contemporary touches. If you're drawn to this style for your dream home, here are the key elements to consider:</p>
      
      <h2>Exterior Elements</h2>
      <p>The Modern Farmhouse exterior typically features:</p>
      <ul>
        <li><strong>Board and batten siding</strong>, often in white or light neutral colors</li>
        <li><strong>Metal roof accents</strong> that add contrast and authenticity</li>
        <li><strong>A welcoming front porch</strong> with simple columns and comfortable seating</li>
        <li><strong>Black-framed windows</strong> that create dramatic contrast against light siding</li>
        <li><strong>Gable roofs</strong> with simple, clean lines</li>
      </ul>
      
      <h2>Interior Design Elements</h2>
      <p>Inside a Modern Farmhouse, you'll typically find:</p>
      <ul>
        <li><strong>Open floor plans</strong> that create flow between kitchen, dining, and living spaces</li>
        <li><strong>Neutral color palettes</strong> with whites, creams, grays, and warm wood tones</li>
        <li><strong>Shiplap accent walls</strong> that add texture and character</li>
        <li><strong>Exposed beams</strong> that bring warmth and architectural interest</li>
        <li><strong>Farmhouse sink</strong> as a functional focal point in the kitchen</li>
        <li><strong>Mix of modern and vintage elements</strong>, such as contemporary appliances with antique accessories</li>
      </ul>
      
      <h2>Bringing Modern Farmhouse Into Your Home Plan</h2>
      <p>When selecting a house plan or customizing your design:</p>
      <ol>
        <li><strong>Focus on the kitchen</strong> as the heart of the home with a large island, farmhouse sink, and open shelving</li>
        <li><strong>Incorporate plenty of natural light</strong> through large windows</li>
        <li><strong>Consider a mudroom</strong> for practical family living</li>
        <li><strong>Balance rustic and refined</strong> elements throughout your design</li>
        <li><strong>Add architectural interest</strong> with ceiling treatments like shiplap or beams</li>
      </ol>
      
      <p>The Modern Farmhouse style's popularity stems from its ability to feel both timeless and contemporary, creating spaces that are both Instagram-worthy and genuinely livable for families. By incorporating these key elements into your home design, you'll achieve that perfect balance of comfort, style, and functionality that makes the Modern Farmhouse so beloved.</p>
    `,
    publishDate: '2023-06-15',
    author: 'Emily Johnson',
    category: 'Design Tips',
    image: 'https://picsum.photos/seed/farmhouseblog/800/500',
    tags: ['Modern Farmhouse', 'Interior Design', 'Home Design', 'Architecture']
  },
  'choose-perfect-floor-plan': {
    id: '2',
    title: 'How to Choose the Perfect Floor Plan for Your Family',
    slug: 'choose-perfect-floor-plan',
    excerpt: 'Finding the right floor plan can be overwhelming. Here are the key considerations to ensure your new home fits your lifestyle perfectly.',
    content: `
      <p>Selecting the right floor plan is one of the most critical decisions when building or buying a home. The layout will shape how you live in your space for years to come, so it's worth taking the time to find one that truly fits your family's needs.</p>
      
      <h2>Assess Your Current and Future Needs</h2>
      <p>Before diving into specific plans, think about:</p>
      <ul>
        <li><strong>Family size:</strong> Do you need to accommodate children, aging parents, or frequent guests?</li>
        <li><strong>Growth plans:</strong> Are you planning to expand your family or eventually downsize?</li>
        <li><strong>Work requirements:</strong> Do you need a home office or dedicated workspace?</li>
        <li><strong>Lifestyle preferences:</strong> Do you entertain often? Value privacy? Need specialized spaces?</li>
      </ul>
      
      <h2>Key Considerations for Every Floor Plan</h2>
      
      <h3>1. Traffic Flow</h3>
      <p>Consider how people will move through your home on a daily basis:</p>
      <ul>
        <li>Are hallways and doorways spacious enough?</li>
        <li>Can you easily travel between frequently used spaces?</li>
        <li>Is there a good balance between open areas and private rooms?</li>
      </ul>
      
      <h3>2. Room Relationships</h3>
      <p>Think about which rooms should be adjacent and which should be separated:</p>
      <ul>
        <li>Would you prefer the primary bedroom away from common living spaces?</li>
        <li>Should children's bedrooms be near or far from the primary suite?</li>
        <li>Is kitchen proximity to dining areas and outdoor spaces important?</li>
      </ul>
      
      <h3>3. Functionality for Your Lifestyle</h3>
      <p>Evaluate how well the plan accommodates your specific needs:</p>
      <ul>
        <li>If you work from home, is there adequate office space away from noise?</li>
        <li>For frequent entertainers, is there enough space for guests to gather?</li>
        <li>For families with children, are there play areas visible from the kitchen?</li>
      </ul>
      
      <h2>One-Story vs. Two-Story Considerations</h2>
      <p>The debate between single-level and multi-level homes comes down to several factors:</p>
      <ul>
        <li><strong>Accessibility:</strong> One-story homes offer better accessibility for all ages</li>
        <li><strong>Privacy:</strong> Two-story homes can better separate living and sleeping areas</li>
        <li><strong>Efficiency:</strong> Two-story homes often have smaller footprints and can be more energy-efficient</li>
        <li><strong>Future needs:</strong> Consider how stairs might impact aging in place</li>
      </ul>
      
      <h2>Final Tips Before Committing</h2>
      <p>Before finalizing your floor plan choice:</p>
      <ol>
        <li><strong>Visualize daily routines</strong> from waking up to bedtime</li>
        <li><strong>Consider furniture placement</strong> and whether your existing pieces will fit</li>
        <li><strong>Think about storage needs</strong> and whether there's adequate closet and cabinet space</li>
        <li><strong>Visit homes with similar layouts</strong> if possible to get a real feel for the space</li>
        <li><strong>Consider modifications</strong> that might make a good plan perfect for your specific needs</li>
      </ol>
      
      <p>Remember that while trends come and go, a well-designed floor plan that suits your family's lifestyle will provide enjoyment for many years. Take your time with this decision to ensure your new home truly works for the way you live.</p>
    `,
    publishDate: '2023-05-22',
    author: 'Michael Chen',
    category: 'Planning',
    image: 'https://picsum.photos/seed/floorplan/800/500',
    tags: ['Floor Plans', 'Home Design', 'Family Homes', 'Building Tips']
  }
};

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = blogPosts[params.slug];
  
  if (!post) {
    return {
      title: 'Post Not Found | Home Design Finder Blog',
      description: 'The requested blog post could not be found.'
    };
  }
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    publishedTime: post.publishDate,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      images: [
        {
          url: post.image,
          width: 800,
          height: 500,
          alt: post.title,
        }
      ],
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    }
  };
}

export default function BlogPost({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = blogPosts[params.slug];
  
  if (!post) {
    notFound();
  }
  
  // Create blog schema data
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image,
    "editor": post.author,
    "genre": post.category,
    "keywords": post.tags?.join(', '),
    "url": `https://homedesignfinder.com/blog/${post.slug}`,
    "datePublished": post.publishDate,
    "dateCreated": post.publishDate,
    "dateModified": post.publishDate,
    "description": post.excerpt,
    "articleBody": post.content.replace(/<[^>]*>/g, ''), // Strip HTML
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Home Design Finder",
      "logo": {
        "@type": "ImageObject",
        "url": "https://homedesignfinder.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://homedesignfinder.com/blog/${post.slug}`
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <StructuredData data={blogSchema} />
      
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-green-700 hover:underline">Home</Link> &gt;{' '}
        <Link href="/blog" className="text-green-700 hover:underline">Blog</Link> &gt;{' '}
        <span className="text-gray-600">{post.title}</span>
      </nav>
      
      <article className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative h-[400px]">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-8 gap-x-6 gap-y-2">
            <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            <span>By {post.author}</span>
            <span>In {post.category}</span>
          </div>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
          
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-12 pt-6 border-t">
            <h3 className="text-xl font-semibold mb-4">Ready to find your dream home?</h3>
            <div className="flex gap-4">
              <Link 
                href="/styles" 
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
              >
                Explore Home Styles
              </Link>
              <Link 
                href="/plans" 
                className="px-4 py-2 border border-green-700 text-green-700 rounded hover:bg-green-50"
              >
                Browse House Plans
              </Link>
            </div>
          </div>
        </div>
      </article>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Read More Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(blogPosts)
            .filter(p => p.slug !== post.slug)
            .slice(0, 2)
            .map(relatedPost => (
              <div key={relatedPost.id} className="border rounded overflow-hidden shadow-sm">
                <Link href={`/blog/${relatedPost.slug}`} className="block">
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{relatedPost.title}</h3>
                    <p className="text-gray-600 text-sm">{relatedPost.excerpt}</p>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}