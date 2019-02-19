import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { PricerangeModule } from './pricerange.module';

export function main() {
   describe('pricerange component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [PricerangeModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let pricerangeDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(pricerangeDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-pricerange></sd-pricerange>'
})
class TestComponent {}
