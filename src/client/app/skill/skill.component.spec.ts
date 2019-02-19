import { Component } from '@angular/core';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { SkillModule } from './skill.module';

export function main() {
   describe('skill component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [SkillModule]
      });
    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let skillDOMEl = fixture.debugElement.children[0].nativeElement;

              expect(skillDOMEl.querySelectorAll('h2')[0].textContent).toEqual('Features');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-skill></sd-skill>'
})
class TestComponent {}
