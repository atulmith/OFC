import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { PopularsearchModule } from './popularsearch.module';

export function main() {
   describe('popularsearch component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [PopularsearchModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let popularsearchDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(popularsearchDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-popularsearch></sd-popularsearch>'
})
class TestComponent {}
