import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { PlanModule } from './plan.module';

export function main() {
   describe('plan component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [PlanModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let planDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(planDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-plan></sd-plan>'
})
class TestComponent {}
