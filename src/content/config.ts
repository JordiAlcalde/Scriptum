import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Scriptum'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    esborrany: z.boolean().default(false),
  }),
});

const relatsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    llibre: z.string(),
    llibreId: z.string(),
    capitol: z.number().optional(),
    ordre: z.number().optional(),
    tipus: z
      .enum(['capitol', 'dedicatoria', 'epigraf', 'proleg', 'epileg', 'nota'])
      .default('capitol'),
    seccio: z.string().optional(),
    etiqueta: z.string().optional(),
    estat: z.enum(['en-curs', 'acabat']).optional(),
    publicacio: z.enum(['completa', 'entregues']).optional(),
    portada: z.string().optional(),
    descripcioLlibre: z.string().optional(),
    data: z.date(),
    sinopsi: z.string().optional(),
    tempsLectura: z.string().optional(),
    esborrany: z.boolean().default(false),
  }),
});

const etiquetesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  relats: relatsCollection,
  etiquetes: etiquetesCollection,
};

