import {Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit} from "@angular/core";
import {ButtonComponent} from "../../controls/button/button.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {TabHotelItemComponent} from "../account/components/tab-hotel-item/tab-hotel-item.component";
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import {InputComponent} from "../../controls/input/input.component";
import {HotelItem} from "../../models/hotel-item";
import {RoomItem} from "../../models/room-item";
import {FormItem} from "../../models/form-item";
import {HotelsService} from "../../services/api/hotels/hotels.service";
import {Subscription} from "rxjs";
import {ImageSliderComponent} from "../../controls/image-slider/image-slider.component";
import {register, SwiperContainer} from "swiper/swiper-element";
import {SwiperOptions} from "swiper/types";

@Component({
  selector: 'app-account',
  standalone: true,
    imports: [
        ButtonComponent,
        NgClass,
        TabHotelItemComponent,
        NgForOf,
        RouterLink,
        InputComponent,
        NgIf,
        ImageSliderComponent
    ],
  templateUrl: './add-hotel.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddHotelComponent implements OnInit, OnDestroy {
  routeSubscription!: Subscription;
  hotel: HotelItem = new HotelItem(0, "", "", "", "", 0, []);
  formItems: FormItem[] = [];
  roomFormItems : RoomFormItemStruct[] = [];
  error: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private hotelsService: HotelsService) { }

  ngOnInit(): void {
    this.routeSubscription =  this.route.params.subscribe((params: Params): void => {
      const id: number = params['id'];

      if (id != -1) {
        this.hotelsService.getHotelById(id).subscribe((data: HotelItem): void => {
          this.hotel = data;
          this.createFormItemsWithInitValue(data.getName(), data.getCityName(), data.getDescription());
          data.getRoomList().forEach((item: RoomItem): void => {
            this.roomFormItems.push(new RoomFormItemStruct(item));
          })
        });
        return;
      }
      this.createFormItemsWithInitValue("", "", "");
    });
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
  onFileSelected(event: any, target: HotelItem | RoomItem): void {
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (event:ProgressEvent<FileReader>) : void => {
      if (event.target == null) return;
      const blob: Blob = new Blob([new Uint8Array(event.target.result as ArrayBuffer)], { type: file.type });
      const tempReader: FileReader = new FileReader();
      tempReader.onload = (): void => {
        const base64String: string  = tempReader.result as string;
        target.setImage(base64String.split(',')[1]);
      };
      tempReader.readAsDataURL(blob);
    };
    reader.readAsArrayBuffer(file);
  }
  addRoom(): void {
    let exitCondition: boolean = false;
    this.hotel.getRoomList().forEach((item: RoomItem): void => {
      if (!item.validToSave()) exitCondition = true;
    })

    if (exitCondition) return;
    const room: RoomItem = new RoomItem(-1, -1, -1, -1, -1, [], true);
    this.hotel.addRoom(room);
    this.roomFormItems.push(new RoomFormItemStruct(room));
  }
  saveHotel() : void {
    this.error = this.hotel.validToSave();
    if (this.error.length > 0) { return; }

    this.hotelsService.saveHotel(this.hotel).subscribe((): void => {
      this.router.navigate(["account"]);
    });
  }

  /**
   * Method that helps to reuse code. Method allows to set initial value depends on task.
   * @param name
   * @param city
   * @param description
   * @private
   */
  private createFormItemsWithInitValue(name: string, city: string, description: string) {
    this.formItems = [
      {
        placeholder: "Name of your hotel",
        name: "Name of the hotel *",
        action: (value: String) => this.hotel.setName(value),
        initValue: name,
      },
      {
        placeholder: "City of your hotel",
        name: "City of the hotel *",
        action: (value: String) => this.hotel.setCityName(value),
        initValue: city,
      },
      {
        placeholder: "Description of your hotel",
        name: "Description of the hotel *",
        action: (value: String) => this.hotel.setDescription(value),
        initValue: description,
      },
    ]
  }
}


class RoomFormItemStruct {
  form: FormItem[] = [];
  room!: RoomItem;
  error: string = "";

  constructor(room: RoomItem) {
    this.room = room;
    this.form = [
      {
        placeholder: "Number of the room",
        name: "Hotel room number *",
        action: (value: String): void => {
          this.error = "";
          const parsedValue: number = parseFloat(value.toString());
          if (isNaN(parsedValue)) {
            this.error = "Only numbers available in room number!";
            return;
          }
          this.room.setRoomId(parsedValue);
        },
        initValue: this.room.getRoomId() != -1 ? this.room.getRoomId().toString() : "",
      },
      {
        placeholder: "Number of beds",
        name: "Room number of places *",
        action: (value: String): void => {
          this.error = "";
          const parsedValue: number = parseFloat(value.toString());
          if (isNaN(parsedValue)) {
            this.error = "Only numbers available in number of beds!";
            return;
          }
          this.room.setBedNumbers(parsedValue);
        },
        initValue: this.room.getBedNumbers() != -1 ? this.room.getBedNumbers().toString() : "",
      },
      {
        placeholder: "Price for one day",
        name: "Room price for single day *",
        action: (value: String): void => {
          this.error = "";
          const parsedValue: number = parseFloat(value.toString());
          if (isNaN(parsedValue)) {
            this.error = "Only numbers available in price!";
            return;
          }
          this.room.setPrice(parsedValue);
        },
        initValue: this.room.getPrice() != -1 ? this.room.getPrice().toString() : "",
      },
    ];
  }
}
