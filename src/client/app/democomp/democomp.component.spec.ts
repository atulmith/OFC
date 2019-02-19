import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { democompModule } from './democomp.module';

export function main() {
   describe('democomp component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [democompModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let democompDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(democompDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-democomp></sd-democomp>'
})
class TestComponent {}
