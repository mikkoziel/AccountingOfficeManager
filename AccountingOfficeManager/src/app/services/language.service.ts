import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  setDefaultLang(lang){
    this.translate.setDefaultLang(lang)
  }
}
