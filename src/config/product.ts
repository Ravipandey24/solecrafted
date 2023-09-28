
const ManFootwearCategories = ['Sneakers', 'Running', 'Walking', 'Training & Gym', 'Sandals & Flip Flops', 'Motorsport', 'Cricket', 'Basketball', 'Football', 'Softride']
const WomanFootwearCategories = ['Sneakers', 'Running', 'Walking', 'Training & Gym', 'Sandals & Flip Flops', 'Badminton']
const KidsFootwearCategories = ['Older Kids', 'Younger Kids', 'Babies and Toddlers', 'Lifestyle', 'Sandals & Slides', 'Running']

export const productCategories = [
    {
        title: 'Men',
        subcategories: ManFootwearCategories.map(item => item)
    },
    {
        title: 'Women',
        subcategories: WomanFootwearCategories.map(item => item)
    },
    {
        title: 'Kids',
        subcategories: KidsFootwearCategories.map(item => item)
    }
]