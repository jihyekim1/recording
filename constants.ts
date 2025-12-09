import { LearningActivity, PerformanceStatus } from './types';

// IMPORTANT: Replace this with your deployed Google Apps Script Web App URL.
// Instructions on how to deploy:
// 1. Go to script.google.com, create a new project.
// 2. Paste the Google Apps Script code (provided separately) into Code.gs.
// 3. Save the project.
// 4. Click 'Deploy' -> 'New deployment'.
// 5. Select type 'Web app'.
// 6. Set 'Execute as' to 'Me'.
// 7. Set 'Who has access' to 'Anyone'.
// 8. Click 'Deploy' and copy the 'Web app URL'.
export const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'; 

export const LEARNING_ACTIVITY_OPTIONS = [
  { value: '', label: '학습 활동 선택', disabled: true },
  { value: LearningActivity.FRONT_ROLL, label: '앞구르기' },
  { value: LearningActivity.BACK_ROLL, label: '뒷구르기' },
  { value: LearningActivity.VAULT, label: '뜀틀 넘기' },
  { value: LearningActivity.LONG_JUMP, label: '멀리뛰기' },
  { value: LearningActivity.HIGH_JUMP, label: '높이 뛰기' },
];

export const PERFORMANCE_STATUS_OPTIONS = [
  { value: '', label: '수행 여부 선택 (선택 사항)' },
  { value: PerformanceStatus.SUCCESS_CONFIDENTLY, label: '자신있게 성공' },
  { value: PerformanceStatus.SUCCESS_EFFORT, label: '노력해서 성공' },
  { value: PerformanceStatus.TRY_AGAIN, label: '다시 해볼래!' },
  { value: PerformanceStatus.NEED_HELP, label: '도움이 필요해!' },
];

export const APP_TITLE = '학생 활동 기록';
export const APP_DESCRIPTION = '학생들의 학습 활동을 기록하고 관리합니다.';
