import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  Renderer2, SimpleChanges
} from "@angular/core";
import {RoomImage} from "../../models/room-image";
import {NgForOf, NgIf} from "@angular/common";
import {register, SwiperContainer} from 'swiper/element/bundle';
import {SwiperOptions} from "swiper/types";
import Swiper from "swiper";

@Component({
  selector: "app-slider",
  imports: [
    NgForOf,
    NgIf,
  ],
  templateUrl: "./image-slider.component.html",
  styleUrl: "./image-slider.component.scss",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImageSliderComponent implements OnInit, OnChanges {
  @Input() height: number = 300;
  @Input({ required: true }) slides: RoomImage[] = [];
  private swiperInstance!: Swiper;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    register();

    const swiperEl: SwiperContainer | null = document.querySelector('swiper-container');

    if (!swiperEl) return;
    const params: SwiperOptions = {
      injectStyles: [`
      .swiper-button-next,
      .swiper-button-prev {
        color: #605DEC;
        background-color: #FAFAFA;
        transition: all 0.3s ease 0s;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 24px;
        text-align: center;
        position: absolute;
        top: ${this.height / 2 - 40 / 2};
        z-index: 10;
      }
      .swiper-button-next svg,
      .swiper-button-prev svg {
        width: 12px
      }

      .swiper-button-next {
        border-radius: 16px 0 0 16px;
        right: 0;
      }
      .swiper-button-prev {
        border-radius: 0 16px 16px 0;
        left: 0;
      }

      .swiper-button-next:hover,
      .swiper-button-prev:hover {
        background-color: #0056b3;
        color: #FAFAFA;
      }
      `],
      navigation: { enabled: true, },
      on: {
        init: (swiper: Swiper): void => {
          this.swiperInstance = swiper;
          this.updateSwiper();
        }
      }
    };

    Object.assign(swiperEl, params);

    swiperEl.initialize();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.slides)
    if (changes['slides']) {
      this.updateSwiper();
    }
  }

  private updateSwiper() {
    // Option 1: Using Swiper instance (if you have access)
    if (this.swiperInstance) {
      this.swiperInstance.update();
    }

    // Option 2: Triggering change detection (fallback)
    this.changeDetectorRef.detectChanges();
  }


}
