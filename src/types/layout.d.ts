type NavConfigType = {
    name: string,
    description: string,
    headingFont: import('next/dist/compiled/@next/font').NextFont,
    url: string,
    NavItems: {
        title: string,
        items: {
            title: string,
            href: string
        }[]
    }[]
}