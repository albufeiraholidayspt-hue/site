import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, MapPin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

export function Blog() {
  const posts: BlogPost[] = [
    {
      slug: 'best-beaches-albufeira',
      title: '10 Best Beaches Near Albufeira You Must Visit',
      excerpt: 'Discover the most stunning beaches in Albufeira, from hidden coves with crystalline waters to popular sandy beaches perfect for families.',
      image: 'https://res.cloudinary.com/de6edaaft/image/upload/w_800,h_500,c_fill,f_auto,q_80/v1769626460/albufeira-holidays/gallery/zumfud2v8eiq0dnuguuq.jpg',
      date: '2026-02-01',
      readTime: '8 min read',
      category: 'Beaches'
    },
    {
      slug: 'things-to-do-albufeira',
      title: 'Complete Guide: What to Do in Albufeira',
      excerpt: 'From water sports and boat tours to exploring the charming old town, discover the best activities and attractions in Albufeira.',
      image: 'https://res.cloudinary.com/de6edaaft/image/upload/w_800,h_500,c_fill,f_auto,q_80/v1769628620/albufeira-holidays/gallery/ee2lfrsdb3hrxe7fxplz.jpg',
      date: '2026-01-30',
      readTime: '10 min read',
      category: 'Activities'
    },
    {
      slug: 'best-restaurants-albufeira',
      title: 'Where to Eat in Albufeira: Best Restaurants Guide',
      excerpt: 'Experience authentic Portuguese cuisine and fresh seafood at the best restaurants in Albufeira old town and beyond.',
      image: 'https://res.cloudinary.com/de6edaaft/image/upload/w_800,h_500,c_fill,f_auto,q_80/v1769628303/albufeira-holidays/gallery/jpr1mg7wk6tehgyc1cmx.jpg',
      date: '2026-01-28',
      readTime: '7 min read',
      category: 'Food & Drink'
    }
  ];

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Albufeira Holidays Blog",
    "description": "Travel guides, tips and local insights for your perfect Albufeira vacation",
    "url": "https://albufeiraholidays.pt/blog",
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.image,
      "datePublished": post.date,
      "url": `https://albufeiraholidays.pt/blog/${post.slug}`,
      "author": {
        "@type": "Organization",
        "name": "Albufeira Holidays"
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Albufeira Travel Blog | Guides, Tips & Local Insights</title>
        <meta name="description" content="Discover the best beaches, restaurants, activities and travel tips for Albufeira. Expert local guides for your perfect Algarve vacation." />
        <meta name="keywords" content="albufeira blog, travel guide albufeira, best beaches algarve, things to do albufeira, restaurants albufeira, vacation tips portugal" />
        <link rel="canonical" href="https://albufeiraholidays.pt/blog" />
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Albufeira Travel Blog
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Expert guides, local tips and insider knowledge for your perfect Algarve vacation
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <Link to={`/blog/${post.slug}`}>
                      <h2 className="font-display text-xl font-bold text-gray-900 mb-3 hover:text-orange-500 transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Coming Soon */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-3 rounded-full">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">More guides coming soon!</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
