import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { MembershiptypeModule } from './membershiptype.module';

export function main() {
   describe('membershiptype component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [MembershiptypeModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let membershiptypeDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(membershiptypeDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-membershiptype></sd-membershiptype>'
})
class TestComponent {}
