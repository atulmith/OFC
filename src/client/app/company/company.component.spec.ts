import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { CompanyModule } from './company.module';

export function main() {
   describe('company component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [CompanyModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let companyDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(companyDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-company></sd-company>'
})
class TestComponent {}
