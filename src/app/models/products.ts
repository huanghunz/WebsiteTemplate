export interface Product{
    
    key: string;
    title: string;
    price: number;
    category: string;
   
    date: string;

    imgUrl: string; // cover image
    imgUrls:string[];

    summary: string[]
    details:string[];
}