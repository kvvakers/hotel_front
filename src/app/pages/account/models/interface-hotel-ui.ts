import {HotelItem} from "../../../models/hotel-item";

export class HotelItemUI {
  constructor(private id: number, private isOpened: boolean, private hotelItem: HotelItem) { }

  getId(): number { return this.id; }
  getIsOpened(): boolean { return this.isOpened; }
  getHotelItem(): HotelItem { return this.hotelItem; }

  setIsOpened(value: boolean): void { this.isOpened = value; }
  invertIsOpened(): void {
    this.isOpened = !this.isOpened;
  }
}
