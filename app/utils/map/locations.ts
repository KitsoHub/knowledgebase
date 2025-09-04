// You can place this in a file like `lib/locations.ts` or directly in your component
export const locations = {
  okavango: {
    id: "okavango",
    name: "Okavango Delta",
    position: [-19.318701, 22.446918] as [number, number],
    description: "A lush inland delta in Botswana, home to elephants, hippos, and incredible biodiversity.",
    imageUrl: "/sites/okavango.jpeg",
  },
  etosha: {
    id: "Tsodilo hills",
    name: "Etosha National Park",
    position: [-18.7586615, 21.7357546] as [number, number],
    description: "The Tsodilo Hills are a UNESCO World Heritage Site, consisting of rock art, rock shelters, depressions, and caves in Botswana, Southern Africa",
    imageUrl: "/sites/tsodilo.jpeg",
  },
  windhoek: {
    id: "windhoek",
    name: "Windhoek",
    position: [-19, 17.92439] as [number, number],
    description: "The capital of Namibia, blending modernity with German colonial architecture.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Windhoek_from_Aviation_Museum.jpg/800px-Windhoek_from_Aviation_Museum.jpg",
  },
};