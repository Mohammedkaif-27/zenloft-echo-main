import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
}

const BASE_URL = "https://zenloftstudio.online";

/**
 * Zero-dependency SEO hook that updates document title and meta tags
 * on route change. No external packages needed.
 */
export const useSEO = ({
  title,
  description,
  ogImage = `${BASE_URL}/og-image.png`,
  ogUrl,
  ogType = "website",
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to set or create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Primary SEO
    setMeta("name", "description", description);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", ogType);
    if (ogUrl) {
      setMeta("property", "og:url", ogUrl);
    }

    // Twitter Card
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical && ogUrl) {
      canonical.href = ogUrl;
    }
  }, [title, description, ogImage, ogUrl, ogType]);
};
