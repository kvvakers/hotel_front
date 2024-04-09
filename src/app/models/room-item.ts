export class RoomItem {
  private roomId: number = 0;
  private bedNumbers: number = 0;
  private price: number = 0;
  private hotelId: number = 0;

  constructor(roomId:number, bedNumbers: number, price: number, hotelId: number) {
    this.roomId = roomId;
    this.bedNumbers = bedNumbers;
    this.price = price;
    this.hotelId = hotelId;
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
}

