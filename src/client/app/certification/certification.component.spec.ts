import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { CertificationModule } from './certification.module';

export function main() {
   describe('certification component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [CertificationModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let certificationDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(certificationDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-certification></sd-certification>'
})
class TestComponent {}
