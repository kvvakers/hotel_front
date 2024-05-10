import {RoomImage} from "./room-image";

export class RoomItem {
  private id: number = -1;
  private roomId: number = -1;
  private bedNumbers: number = -1;
  private price: number = -1;
  private hotelId: number = -1;
  private images: RoomImage[] = [];

  constructor(id: number, roomId:number, bedNumbers: number, price: number, hotelId: number, images: RoomImage[]) {
    this.id = id;
    this.roomId = roomId;
    this.bedNumbers = bedNumbers;
    this.price = price;
    this.hotelId = hotelId;
    this.images = images;
  }
  getId(): number {
    return this.id;
  }
  getRoomId():number {
    return this.roomId;
  }
  getBedNumbers():number {
    return this.bedNumbers;
  }
  getPrice():number {
    return this.price;
  }
  getHotelId():number {
    return this.hotelId;
  }
  getImages():RoomImage[] {
    return this.images;
  }

  setId(value: number): void {
    this.id = value;
  }
  setRoomId(value: number): void {
    this.roomId = value;
  }
  setBedNumbers(value: number): void {
    this.bedNumbers = value;
  }
  setPrice(value: number): void {
    this.price = value;
  }
  setImages(values: RoomImage[]): void {
    this.images = values;
  }
  setImage(value: string): void {
    this.images.push(new RoomImage(-1, value, this.id));
  }

  validToSave(): boolean {
    return (this.roomId > 0 && this.bedNumbers > 0 && this.price > 0);
  }
}

