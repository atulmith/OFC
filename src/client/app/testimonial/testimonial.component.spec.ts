import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { TestimonialModule } from './testimonial.module';

export function main() {
   describe('testimonial component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [TestimonialModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let testimonialDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(testimonialDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-testimonial></sd-testimonial>'
})
class TestComponent {}
