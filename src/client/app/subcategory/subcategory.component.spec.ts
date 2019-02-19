import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { SubcategoryModule } from './subcategory.module';

export function main() {
   describe('subcategory component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [SubcategoryModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let subcategoryDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(subcategoryDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-subcategory></sd-subcategory>'
})
class TestComponent {}
