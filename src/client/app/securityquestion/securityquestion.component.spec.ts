import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { SecurityquestionModule } from './securityquestion.module';

export function main() {
   describe('securityquestion component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [SecurityquestionModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let securityquestionDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(securityquestionDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-securityquestion></sd-securityquestion>'
})
class TestComponent {}
