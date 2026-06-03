import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://profitness.in";
  const now = new Date();

  return [
    { url: baseUrl,                          lastModified: now, changeFrequency: "weekly",  priority: 1.0  },
    { url: `${baseUrl}/about`,               lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${baseUrl}/services`,            lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${baseUrl}/membership`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9  },
    { url: `${baseUrl}/trainers`,            lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${baseUrl}/blog`,                lastModified: now, changeFrequency: "weekly",  priority: 0.7  },
    { url: `${baseUrl}/events`,              lastModified: now, changeFrequency: "weekly",  priority: 0.7  },
    { url: `${baseUrl}/gallery`,             lastModified: now, changeFrequency: "monthly", priority: 0.6  },
    { url: `${baseUrl}/contact`,             lastModified: now, changeFrequency: "yearly",  priority: 0.8  },
    { url: `${baseUrl}/ai-tools`,            lastModified: now, changeFrequency: "weekly",  priority: 0.9  },
    { url: `${baseUrl}/calculators`,         lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${baseUrl}/login`,               lastModified: now, changeFrequency: "yearly",  priority: 0.5  },
    { url: `${baseUrl}/signup`,              lastModified: now, changeFrequency: "yearly",  priority: 0.5  },
  ];
}
