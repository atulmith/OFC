import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { UserrightsModule } from './userrights.module';

export function main() {
   describe('userrights component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [UserrightsModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let userrightsDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(userrightsDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-userrights></sd-userrights>'
})
class TestComponent {}
