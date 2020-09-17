import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DefaultFormValidators } from '@fsa/dynamicforms';
import {
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  ANONYMOUS_CONSENT_STATUS,
  GlobalMessageService,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { RegisterComponent } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { FSUserSignUp } from '../../../occ/occ-models';
import { DateConfig } from './../../../core/date-config/date-config';

@Component({
  selector: 'cx-fs-register',
  templateUrl: './register.component.html',
})
export class FSRegisterComponent extends RegisterComponent
  implements OnInit, OnDestroy {
  constructor(
    protected userService: UserService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected router: RoutingService,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected anonymousConsentsConfig: AnonymousConsentsConfig,
    protected config: DateConfig
  ) {
    super(
      userService,
      globalMessageService,
      fb,
      router,
      anonymousConsentsService,
      anonymousConsentsConfig
    );
  }

  sub = new Subscription();
  consentGiven: boolean;

  registerForm = this.fb.group({
    ...this.registerForm.controls,
    phoneNumber: [
      '',
      DefaultFormValidators.regexValidator(
        DefaultFormValidators.phoneNumberRegex
      ),
    ],
    dateOfBirth: [
      '',
      [Validators.required, DefaultFormValidators.dateOfBirthValidator(18)],
    ],
  });

  ngOnInit() {
    super.ngOnInit();
    this.sub.add(
      this.anonymousConsent$.subscribe(data => {
        if (data?.consent?.consentState) {
          this.consentGiven =
            data.consent.consentState === ANONYMOUS_CONSENT_STATUS.GIVEN;
        }
      })
    );
    this.registerForm.get('newsletter').patchValue(this.consentGiven);
  }

  collectDataFromRegisterForm(formData: any): FSUserSignUp {
    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      titleCode,
      phoneNumber,
    } = formData;

    return {
      firstName,
      lastName,
      dateOfBirth,
      uid: email.toLowerCase(),
      password,
      titleCode,
      phoneNumber,
    };
  }

  getDateFormat() {
    return this.config.date.format || '';
  }

  protected isFSConsentRequired(): boolean {
    const {
      requiredConsents,
      registerConsent,
    } = this.anonymousConsentsConfig?.anonymousConsents;

    if (requiredConsents && registerConsent) {
      return requiredConsents.includes(registerConsent);
    }

    return false;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
