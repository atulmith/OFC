import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { MaincategoryModule} from './maincategory.module';

export function main() {
   describe('maincategory component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [MaincategoryModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let maincategoryDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(maincategoryDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-maincategory></sd-maincategory>'
})
class TestComponent {}
