export class RoomImage {
  private id!: number;
  private image!: string;
  private roomId!: number;

  constructor(id: number, image: string, roomId: number) {
    this.id = id;
    this.image = image;
    this.roomId = roomId;
  }

  getId(): number {
    return this.id;
  }
  getImage(): string {
    return this.image;
  }
  getRoomId(): number {
    return this.roomId;
  }

  setImage(value: string): void {
    this.image = value;
  }
}
