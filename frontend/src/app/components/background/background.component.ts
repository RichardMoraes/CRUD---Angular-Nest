import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent {
  @Input('aside') asideMenu: boolean = false;
  // TODO: Add animation on loading
  // @ViewChild('blueWave') blueWave!: ElementRef;
  // @ViewChild('orangeWave') orangeWave!: ElementRef;
  // @ViewChild('whiteWave') whiteWave!: ElementRef;

  constructor(private userService: UserService) {}

  // ngAfterViewInit(): void {
  //   this.animateWave([this.blueWave.nativeElement, this.orangeWave.nativeElement, this.whiteWave.nativeElement]);
  // }

  // animateWave(elements: HTMLElement[]) {
  //   console.log(elements)

  //   elements.forEach((element: HTMLElement) => {
  //     console.log(element)
  //   })
  // }

  logout() {
    this.userService.logout().catch(() => alert('Error, You are not logged out'));
  }
}
