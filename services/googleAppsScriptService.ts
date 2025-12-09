import { SubmissionData } from '../types';
import { GOOGLE_APPS_SCRIPT_URL } from '../constants';

export const sendDataToGoogleAppsScript = async (data: SubmissionData): Promise<void> => {
  if (GOOGLE_APPS_SCRIPT_URL === 'https://script.google.com/macros/s/AKfycbyKL5eguBgO9ZeMvEZ8D-MhBJSXvwtYPUTyVS3OBmK96FQ7XiEiskmZxtDb1tf9VcU4/exec') {
    throw new Error(
      'Google Apps Script URL is not configured. Please update constants.ts with your deployed URL.',
    );
  }

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors', // Required for cross-origin requests to Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Attempt to parse error message from response body
      let errorDetail = `HTTP error! status: ${response.status}`;
      try {
        const errorResponse = await response.json();
        errorDetail = errorResponse.message || errorDetail;
      } catch (jsonError) {
        // If response is not JSON, just use the status
      }
      throw new Error(`데이터 전송 실패: ${errorDetail}`);
    }

    const result = await response.json();
    if (result.status === 'error') {
      throw new Error(`Apps Script 오류: ${result.message}`);
    }
  } catch (error) {
    console.error('Failed to send data to Google Apps Script:', error);
    throw error;
  }
};
