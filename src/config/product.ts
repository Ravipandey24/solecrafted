const ManFootwearCategories = [
  "Sneakers",
  "Running",
  "Walking",
  "Training & Gym",
  "Sandals & Flip Flops",
  "Motorsport",
  "Cricket",
  "Basketball",
  "Football",
  "Softride",
];
const WomanFootwearCategories = [
  "Sneakers",
  "Running",
  "Walking",
  "Training & Gym",
  "Sandals & Flip Flops",
  "Badminton",
];
const KidsFootwearCategories = [
  "Older Kids",
  "Younger Kids",
  "Babies and Toddlers",
  "Lifestyle",
  "Sandals & Slides",
  "Running",
];

export const productCategories = ["Casual", "Running", "Formal", "Football"];
export const productGenderCategories = [
  {
    title: "Men",
    subcategories: ManFootwearCategories.map((item) => item),
  },
  {
    title: "Women",
    subcategories: WomanFootwearCategories.map((item) => item),
  },
  {
    title: "Kids",
    subcategories: KidsFootwearCategories.map((item) => item),
  },
];

export const AllSizeVariants = [
  { metric: "UK", size: 6 },
  { metric: "UK", size: 6.5 },
  { metric: "UK", size: 7 },
  { metric: "UK", size: 7.5 },
  { metric: "UK", size: 8 },
  { metric: "UK", size: 8.5 },
  { metric: "UK", size: 9 },
  { metric: "UK", size: 9.5 },
  { metric: "UK", size: 10 },
  { metric: "UK", size: 10.5 },
  { metric: "UK", size: 11 },
] as const;
