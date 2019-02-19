import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { MemberModule } from './member.module';

export function main() {
   describe('member component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [MemberModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let memberDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(memberDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-member></sd-member>'
})
class TestComponent {}
