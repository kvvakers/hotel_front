import {RoomItem} from "./room-item";

export class HotelItem {
  private hotelId: number = 0;
  private hotelName: string = '';
  private image: string = '';
  private description: string = '';
  private cityName: string = '';
  private rating: number = 0;
  private roomList: Array<RoomItem> = [];

  constructor(hotelId:number, hotelName:string, image:string, description:string, cityName:string, rating:number, roomList: RoomItem[]) {
    this.hotelId = hotelId;
    this.hotelName = hotelName;
    this.image = image;
    this.description = description;
    this.cityName = cityName;
    this.rating = rating;
    this.roomList = roomList;
  }
  getId():number {
    return this.hotelId;
  }
  getName():string {
    return this.hotelName;
  }
  getImage():string {
    return this.image;
  }
  getDescription():string {
    return this.description;
  }
  getCityName():string {
    return this.cityName;
  }
  getRating():number {
    return this.rating;
  }
  getRoomList():RoomItem[] {
    return this.roomList;
  }
}

