export class Image {
  private imageId!: number;
  private image!: string;
  private roomId!: number;

  constructor(imageId: number, image: string, roomId: number) {
    this.imageId = imageId;
    this.image = image;
    this.roomId = roomId;
  }

  getId(): number {
    return this.imageId;
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
