import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA, ElementRef,
  Input, OnChanges,
  OnInit, Renderer2, SimpleChanges, ViewChild,
} from "@angular/core";
import {Image} from "../../models/image";
import {NgForOf, NgIf} from "@angular/common";
import {register} from 'swiper/element/bundle';
import {SwiperOptions} from "swiper/types";
import Swiper from "swiper";

@Component({
  selector: "app-slider",
  imports: [
    NgForOf,
    NgIf,
    ImageSliderComponent,
  ],
  templateUrl: "./image-slider.component.html",
  styleUrl: "./image-slider.component.scss",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImageSliderComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild("swiperRef") swiperRef!: ElementRef;
  @Input() height: number = 300;
  @Input({ required: true }) slides: Image[] = [];
  private swiper!: Swiper;
  private swiperEl!: any;
  vSlides: HTMLElement[] = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    register();

    this.swiperEl = this.swiperRef.nativeElement;

    if (!this.swiperEl) return;
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
    };

    Object.assign(this.swiperEl, params);

    this.swiperEl.initialize();

    this.swiper = this.swiperEl.swiper;

    this.initSlides();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["slides"] && this.swiper) {
      this.initSlides();
    }
  }

  initSlides(): void {
    this.swiper.removeAllSlides();
    this.vSlides = this.generateSlides();
    this.vSlides.forEach((item: HTMLElement): void => {
      this.swiper.appendSlide(item);
    });
  }
  generateSlides(): HTMLElement[] {
    const array: HTMLElement[] = [];
    this.slides.forEach((item: Image): void => {
      const swiperSlide = this.renderer.createElement('swiper-slide');

      const div = this.renderer.createElement('div');
      this.renderer.setStyle(div, 'height', `${this.height}px`);
      this.renderer.addClass(div, 'swiper-image');

      const img = this.renderer.createElement('img');
      this.renderer.setStyle(img, 'width', '100%');
      this.renderer.setStyle(img, 'height', '100%');
      this.renderer.setStyle(img, 'object-fit', 'cover');
      this.renderer.setAttribute(img, 'src', `data:image/jpeg;base64,${item.getImage()}`);
      this.renderer.setAttribute(img, 'alt', '');

      this.renderer.appendChild(div, img);
      this.renderer.appendChild(swiperSlide, div);
      array.push(swiperSlide);
    });
    return array;
  }
}
