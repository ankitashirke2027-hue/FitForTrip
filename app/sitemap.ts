import type {MetadataRoute} from 'next';

export default function sitemap():MetadataRoute.Sitemap{
  const lastModified=new Date();
  return [
    {url:'https://fitfortrip.in/',lastModified,changeFrequency:'weekly',priority:1},
    {url:'https://fitfortrip.in/privacy',lastModified,changeFrequency:'yearly',priority:.3},
  ];
}
