import React, { useState } from 'react';
import StudentInfoForm from './components/StudentInfoForm';
import ActivityDetailsForm from './components/ActivityDetailsForm';
import Modal from './components/Modal';
import LoadingSpinner from './components/LoadingSpinner';
import { StudentInfo, ActivityDetails, SubmissionData, LearningActivity, PerformanceStatus } from './types';
import { sendDataToGoogleAppsScript } from './services/googleAppsScriptService';
import { APP_TITLE, APP_DESCRIPTION } from './constants';

type AppScreen = 'studentInfo' | 'activityDetails' | 'submitting' | 'result';

const initialStudentInfo: StudentInfo = {
  gradeNumber: '', // Changed from classNumber
  classNumber: '', // Changed from studentNumber
  name: '',
  learningActivity: '' as LearningActivity,
};

const initialActivityDetails: ActivityDetails = {
  record: '',
  timeSpent: '',
  performanceStatus: '',
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('studentInfo');
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(initialStudentInfo);
  const [activityDetails, setActivityDetails] = useState<ActivityDetails>(initialActivityDetails);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState<React.ReactNode>('');
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('info');

  const handleStudentInfoSubmit = (data: StudentInfo) => {
    setStudentInfo(data);
    setCurrentScreen('activityDetails');
  };

  const handleActivityDetailsSubmit = async (data: ActivityDetails) => {
    setActivityDetails(data);
    setCurrentScreen('submitting');

    // Construct studentId using the updated field names
    const studentId = `${studentInfo.gradeNumber}-${studentInfo.classNumber}-${studentInfo.name}`;
    const submissionData: SubmissionData = {
      studentId,
      learningActivity: studentInfo.learningActivity,
      record: data.record,
      timeSpent: data.timeSpent,
      // Fix: Convert empty string to undefined for submission as per SubmissionData type.
      performanceStatus: data.performanceStatus === '' ? undefined : data.performanceStatus,
    };

    try {
      await sendDataToGoogleAppsScript(submissionData);
      setModalTitle('제출 완료');
      setModalMessage('학습 활동 기록이 성공적으로 제출되었습니다.');
      setModalType('success');
    } catch (error: unknown) {
      console.error('Submission error:', error);
      setModalTitle('제출 실패');
      setModalMessage(
        <>
          <p className="mb-2">학습 활동 기록 제출 중 오류가 발생했습니다.</p>
          <p className="font-semibold text-red-700">{(error as Error).message}</p>
          <p className="mt-2 text-xs">Google Apps Script URL이 올바르게 설정되었는지 확인해주세요.</p>
        </>
      );
      setModalType('error');
    } finally {
      setIsModalOpen(true);
      setCurrentScreen('result');
    }
  };

  const resetForm = () => {
    setStudentInfo(initialStudentInfo);
    setActivityDetails(initialActivityDetails);
    setCurrentScreen('studentInfo');
    setIsModalOpen(false);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden md:max-w-xl">
        <div className="bg-indigo-600 p-4 sm:p-6 text-white text-center">
          <h1 className="text-3xl font-extrabold">{APP_TITLE}</h1>
          <p className="text-sm mt-1 opacity-90 hidden sm:block">{APP_DESCRIPTION}</p>
        </div>

        {currentScreen === 'studentInfo' && (
          <StudentInfoForm initialData={studentInfo} onSubmit={handleStudentInfoSubmit} />
        )}
        {currentScreen === 'activityDetails' && (
          <ActivityDetailsForm
            initialData={activityDetails}
            onSubmit={handleActivityDetailsSubmit}
            onBack={() => setCurrentScreen('studentInfo')}
            isSubmitting={false} // Only disable if actively submitting
          />
        )}
        {currentScreen === 'submitting' && (
          <div className="p-6 text-center">
            <LoadingSpinner />
            <p className="mt-4 text-gray-700">데이터를 전송하고 있습니다. 잠시만 기다려주세요...</p>
          </div>
        )}

        <Modal
          isOpen={isModalOpen && currentScreen === 'result'}
          onClose={resetForm}
          title={modalTitle}
          type={modalType}
        >
          {modalMessage}
        </Modal>
      </div>
    </div>
  );
};

export default App;