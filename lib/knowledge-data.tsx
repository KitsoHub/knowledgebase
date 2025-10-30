export interface KnowledgeCategory {
  id: string
  title: string
  description: string
  thumbnail: string
}

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: 'medicine',
    title: 'Traditional Medicine',
    description:
      "Discover healing practices and medicinal plants used in Botswana's traditional healthcare.",
    thumbnail:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'plants',
    title: 'Indigenous Plants',
    description:
      'Learn about local plants and their traditional uses in daily life.',
    thumbnail:
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'music',
    title: 'Traditional Music',
    description:
      "Experience the rhythms and instruments that define Botswana's musical heritage.",
    thumbnail:
      'https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'poetry',
    title: 'Oral Poetry',
    description:
      'Explore traditional poems, proverbs, and storytelling practices.',
    thumbnail:
      'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
]
