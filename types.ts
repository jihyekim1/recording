export enum LearningActivity {
  FRONT_ROLL = '앞구르기',
  BACK_ROLL = '뒷구르기',
  VAULT = '뜀틀 넘기',
  LONG_JUMP = '멀리뛰기',
  HIGH_JUMP = '높이 뛰기',
}

export enum PerformanceStatus {
  SUCCESS_CONFIDENTLY = '자신있게 성공',
  SUCCESS_EFFORT = '노력해서 성공',
  TRY_AGAIN = '다시 해볼래!',
  NEED_HELP = '도움이 필요해!',
}

export interface StudentInfo {
  gradeNumber: string; // 학년
  classNumber: string; // 반
  name: string; // 이름
  learningActivity: LearningActivity | ''; // 학습 활동 (required, but empty string for initial state)
}

export interface ActivityDetails {
  record: string; // 기록
  timeSpent: string; // 소요 시간
  performanceStatus: PerformanceStatus | ''; // 수행 여부
}

export interface SubmissionData {
  studentId: string;
  learningActivity: LearningActivity;
  record: string;
  timeSpent: string;
  // Fix: Allow performanceStatus to be undefined for submission if no option is selected.
  performanceStatus: PerformanceStatus | undefined;
}