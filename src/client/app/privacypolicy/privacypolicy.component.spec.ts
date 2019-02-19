import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { PrivacyPolicyModule } from './privacypolicy.module';

export function main() {
   describe('project component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [PrivacyPolicyModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let projectDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(projectDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-project></sd-project>'
})
class TestComponent {}
