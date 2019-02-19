import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { CityModule } from './city.module';

export function main() {
   describe('city component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [CityModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let cityDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(cityDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-city></sd-city>'
})
class TestComponent {}
