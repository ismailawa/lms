declare module 'react-step-progress-bar' {
  export interface StepProps {
    label?: string;
    completed?: boolean;
    active?: boolean;
    transition: string;
    children: (any) => any;
  }

  export interface ProgressBarProps {
    steps?: StepProps[];
    children: any;
    percent: number;
    filledBackground: string;
    unfilledBackground: string;
  }

  export class ProgressBar extends React.Component<ProgressBarProps> {}
  export class Step extends React.Component<StepProps> {}
}
