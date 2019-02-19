import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { EducationModule } from './education.module';

export function main() {
   describe('education component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [EducationModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let educationDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(educationDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-education></sd-education>'
})
class TestComponent {}
