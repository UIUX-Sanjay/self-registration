import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TranslationSet {
  title: string;
  subtitle: string;
  select_branch: string;
  choose_branch: string;
}

interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  @ViewChild('dropdown', { static: true })
  dropdownRef!: ElementRef<HTMLElement>;

  @ViewChild('langModal', { static: true })
  langModalRef!: ElementRef<HTMLElement>;

  @ViewChild('langButton', { static: true })
  langButtonRef!: ElementRef<HTMLButtonElement>;

  dropdownOpen = false;
  langModalOpen = false;

  selectedBranch = '';
  selectedLang = 'en';

  readonly logoUrl = '/assets/calm.png';
  readonly leftImageUrl = '/assets/welcome.png';

  readonly branches = ['Chennai', 'Coimbatore', 'Madurai'];

  readonly languages: LanguageOption[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ta', label: 'Tamil', flag: '🇮🇳' },
    { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
    { code: 'te', label: 'Telugu', flag: '🇮🇳' },
    { code: 'ml', label: 'Malayalam', flag: '🇮🇳' },
    { code: 'kn', label: 'Kannada', flag: '🇮🇳' },
    { code: 'bn', label: 'Bengali', flag: '🇧🇩' },
    { code: 'fr', label: 'French', flag: '🇫🇷' },
    { code: 'de', label: 'German', flag: '🇩🇪' },
    { code: 'es', label: 'Spanish', flag: '🇪🇸' },
    { code: 'pt', label: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', label: 'Russian', flag: '🇷🇺' },
    { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', label: 'Korean', flag: '🇰🇷' },
    { code: 'ar', label: 'Arabic', flag: '🇸🇦' },
    { code: 'tr', label: 'Turkish', flag: '🇹🇷' },
  ];

  readonly translations: Record<string, TranslationSet> = {
    en: {
      title: 'Welcome to CALMS',
      subtitle: 'Please select your branch location',
      select_branch: 'Select Branch',
      choose_branch: 'Choose a branch...'
    },
    ta: {
      title: 'CALMS-க்கு வரவேற்கிறோம்',
      subtitle: 'உங்கள் கிளை இடத்தைத் தேர்ந்தெடுக்கவும்',
      select_branch: 'கிளையைத் தேர்ந்தெடுக்கவும்',
      choose_branch: 'ஒரு கிளையைத் தேர்ந்தெடுக்கவும்...'
    },
    hi: {
      title: 'CALMS में आपका स्वागत है',
      subtitle: 'कृपया अपनी शाखा स्थान चुनें',
      select_branch: 'शाखा चुनें',
      choose_branch: 'एक शाखा चुनें...'
    },
    te: {
      title: 'CALMS కు స్వాగతం',
      subtitle: 'దయచేసి మీ బ్రాంచ్ స్థానాన్ని ఎంచుకోండి',
      select_branch: 'శాఖను ఎంచుకోండి',
      choose_branch: 'ఒక శాఖను ఎంచుకోండి...'
    },
    ml: {
      title: 'CALMS-ലേക്ക് സ്വാഗതം',
      subtitle: 'ദയവായി നിങ്ങളുടെ ശാഖ സ്ഥാനം തിരഞ്ഞെടുക്കുക',
      select_branch: 'ശാഖ തിരഞ്ഞെടുക്കുക',
      choose_branch: 'ഒരു ശാഖ തിരഞ്ഞെടുക്കുക...'
    },
    kn: {
      title: 'CALMS ಗೆ ಸ್ವಾಗತ',
      subtitle: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಶಾಖೆಯ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      select_branch: 'ಶಾಖೆ ಆಯ್ಕೆಮಾಡಿ',
      choose_branch: 'ಒಂದು ಶಾಖೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ...'
    },
    bn: {
      title: 'CALMS-এ স্বাগতম',
      subtitle: 'দয়া করে আপনার শাখার অবস্থান নির্বাচন করুন',
      select_branch: 'শাখা নির্বাচন করুন',
      choose_branch: 'একটি শাখা নির্বাচন করুন...'
    },
    fr: {
      title: 'Bienvenue chez CALMS',
      subtitle: 'Veuillez sélectionner l’emplacement de votre agence',
      select_branch: 'Sélectionner une agence',
      choose_branch: 'Choisissez une agence...'
    },
    de: {
      title: 'Willkommen bei CALMS',
      subtitle: 'Bitte wählen Sie Ihren Standort',
      select_branch: 'Standort wählen',
      choose_branch: 'Wählen Sie einen Standort...'
    },
    es: {
      title: 'Bienvenido a CALMS',
      subtitle: 'Seleccione la ubicación de su sucursal',
      select_branch: 'Seleccionar sucursal',
      choose_branch: 'Elige una sucursal...'
    },
    pt: {
      title: 'Bem-vindo à CALMS',
      subtitle: 'Selecione o local da sua filial',
      select_branch: 'Selecionar filial',
      choose_branch: 'Escolha uma filial...'
    },
    ru: {
      title: 'Добро пожаловать в CALMS',
      subtitle: 'Пожалуйста, выберите местоположение филиала',
      select_branch: 'Выберите филиал',
      choose_branch: 'Выберите филиал...'
    },
    ja: {
      title: 'CALMSへようこそ',
      subtitle: '支店の場所を選択してください',
      select_branch: '支店を選択',
      choose_branch: '支店を選択...'
    },
    ko: {
      title: 'CALMS에 오신 것을 환영합니다',
      subtitle: '지점 위치를 선택하세요',
      select_branch: '지점 선택',
      choose_branch: '지점을 선택하세요...'
    },
    ar: {
      title: 'مرحبًا بك في CALMS',
      subtitle: 'يرجى اختيار موقع الفرع',
      select_branch: 'اختر الفرع',
      choose_branch: 'اختر فرعًا...'
    },
    tr: {
      title: "CALMS'e hoş geldiniz",
      subtitle: 'Lütfen şube konumunuzu seçin',
      select_branch: 'Şube seçin',
      choose_branch: 'Bir şube seçin...'
    }
  };

  get t(): TranslationSet {
    return this.translations[this.selectedLang] ?? this.translations['en'];
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectBranch(branch: string): void {
    this.selectedBranch = branch;
    this.dropdownOpen = false;
  }

  toggleLangModal(): void {
    this.langModalOpen = !this.langModalOpen;
  }

  closeLangModal(): void {
    this.langModalOpen = false;
  }

  selectLanguage(code: string): void {
    this.selectedLang = code;
    this.langModalOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node | null;

    if (this.dropdownOpen && this.dropdownRef && target && !this.dropdownRef.nativeElement.contains(target)) {
      this.dropdownOpen = false;
    }

    const clickedLangButton =
      this.langButtonRef && target && this.langButtonRef.nativeElement.contains(target);
    const clickedLangModal =
      this.langModalRef && target && this.langModalRef.nativeElement.contains(target);

    if (this.langModalOpen && !clickedLangButton && !clickedLangModal) {
      this.langModalOpen = false;
    }
  }

  trackByValue(index: number, value: string): string {
    return value;
  }

  trackByLang(index: number, lang: LanguageOption): string {
    return lang.code;
  }
}
