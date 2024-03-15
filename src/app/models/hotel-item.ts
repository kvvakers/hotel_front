export class HotelItem {
  private name: string = '';
  private image: string = '';
  private description: string = '';
  private price: number = 0;
  private cityName: string = '';
  private rating: number = 0;

  constructor(name:string, image:string, description:string, price:number, cityName:string, rating:number) {
    this.name = name;
    this.image = image;
    this.description = description;
    this.price = price;
    this.cityName = cityName;
    this.rating = rating;
  }
  getName():string {
    return this.name;
  }
  getImage():string {
    return this.image;
  }
  getDescription():string {
    return this.description;
  }
  getPrice():number {
    return this.price;
  }
  getCityName():string {
    return this.cityName;
  }
  getRating():number {
    return this.rating;
  }
}

