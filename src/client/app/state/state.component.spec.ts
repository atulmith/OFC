import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { StateModule } from './state.module';

export function main() {
   describe('state component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [StateModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let stateDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(stateDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-state></sd-state>'
})
class TestComponent {}
