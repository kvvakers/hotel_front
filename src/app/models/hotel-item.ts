import {RoomItem} from "./room-item";

export class HotelItem {
  private hotelId: number = 0;
  private hotelName: string = '';
  private image: string = '';
  private description: string = '';
  private cityName: string = '';
  private rating: number = 0;
  private roomList: RoomItem[] = [];

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
  setName(value: String): void {
    this.hotelName = value.toString();
  }
  setDescription(value: String): void {
    this.description = value.toString();
  }
  setCityName(value: String): void {
    this.cityName = value.toString();
  }
  setImage(value: String): void {
    this.image = value.toString();
  }
  setRoomList(list: RoomItem[]): void {
    this.roomList = list;
  }
  addRoom(room: RoomItem): void {
    this.roomList.push(room);
  }

  /**
   * @returns { string } string with info about error or empty string
   */
  validToSave(): string {
    if (this.hotelName.length == 0) return "Hotel name is required!";
    if (this.cityName.length == 0) return "City name is required!";
    if (this.description.length == 0) return "Hotel description is required!";
    if (this.roomList.length == 0) return "As least one room required!";
    for (let i: number = 0; i < this.roomList.length; ++i) {
      if (!this.roomList[i].validToSave()) return "Fields in room are incorrect!";
    }
    return "";
  }
}

