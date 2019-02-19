import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { CurrencyconversionModule } from './currencyconversion.module';

export function main() {
   describe('currencyconversion component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [CurrencyconversionModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let currencyconversionDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(currencyconversionDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-currencyconversion></sd-currencyconversion>'
})
class TestComponent {}
