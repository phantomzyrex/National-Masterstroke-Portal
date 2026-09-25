export interface MasterstrokeItem {
  id: string;
  title: string;
  year: string;
  officialClaim: string;
  oppositionVision: string;
  bureaucraticStatus: string;
  progressPercent: number; // e.g. 99.9 or -400 or 150
  glitchLabel: string;
  iconName: string;
  edRaidStatus: string;
  tag: string;
}

export interface ErrorModalData {
  isOpen: boolean;
  title: string;
  code: string;
  gazetteRef: string;
  message: string;
  babuRemarks: string;
  actionText: string;
  secondaryActionText?: string;
  severity: 'warning' | 'critical' | 'gazette' | 'washing_machine' | 'success';
}

export interface HyperlinkTrap {
  id: string;
  label: string;
  size: string;
  category: string;
  triggerType: 'bsod' | 'gazette_error' | 'redirect_loop' | 'termite_eaten' | 'teleprompter_down' | 'lunch_break';
  trapMessage: string;
  bureaucraticCode: string;
}
