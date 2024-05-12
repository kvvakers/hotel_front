import {IRoom} from "./room-interface";
import {IHotel} from "./hotel-interface";

export class Deal {
  private dealId!: number;
  private dateBegin!: String;
  private dateEnd!: String;
  private email!: String;
  private phone!: String;
  private total!: number;
  private roomId!: number;
  private room!: IRoom;
  private hotel!: IHotel;

  constructor(
    roomId: number,
    dateBegin: String,
    dateEnd: String,
    email?: String,
    phone?: String,
    room?: IRoom,
    hotel?: IHotel,
    total?: number
  ) {
    this.roomId = roomId;
    this.dateBegin = dateBegin;
    this.dateEnd = dateEnd;
    if (phone) this.phone = phone;
    if (email) this.email = email;
    if (room) this.room = room;
    if (hotel) this.hotel = hotel;
    if (total) this.total = total;
  }

  getDateBegin(): String {
    return this.dateBegin;
  }
  getDateEnd(): String {
    return this.dateEnd;
  }
  getEmail(): String {
    return this.email;
  }
  getPhone(): String {
    return this.phone;
  }
  getTotal(): number {
    return this.total;
  }
  getRoom(): IRoom {
    return this.room;
  }
  getHotel(): IHotel {
    return this.hotel;
  }
}
