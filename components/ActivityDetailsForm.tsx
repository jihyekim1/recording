import React, { useState } from 'react';
import Textarea from './Textarea';
import Input from './Input';
import Dropdown from './Dropdown';
import Button from './Button';
import { ActivityDetails, PerformanceStatus } from '../types';
import { PERFORMANCE_STATUS_OPTIONS } from '../constants';

interface ActivityDetailsFormProps {
  initialData: ActivityDetails;
  onSubmit: (data: ActivityDetails) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const ActivityDetailsForm: React.FC<ActivityDetailsFormProps> = ({
  initialData,
  onSubmit,
  onBack,
  isSubmitting,
}) => {
  const [activityDetails, setActivityDetails] = useState<ActivityDetails>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setActivityDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(activityDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">활동 상세 기록</h2>

      <Textarea
        label="기록 (선택 사항)"
        id="record"
        name="record"
        value={activityDetails.record}
        onChange={handleChange}
        placeholder="활동에 대한 자세한 기록을 남겨주세요."
      />
      <Input
        label="소요 시간 (선택 사항)"
        id="timeSpent"
        name="timeSpent"
        value={activityDetails.timeSpent}
        onChange={handleChange}
        placeholder="예: 30분, 1시간 15분"
      />
      <Dropdown
        label="수행 여부 (선택 사항)"
        id="performanceStatus"
        name="performanceStatus"
        value={activityDetails.performanceStatus}
        onChange={handleChange}
        options={PERFORMANCE_STATUS_OPTIONS}
      />

      <div className="flex justify-between mt-6">
        <Button type="button" variant="secondary" onClick={onBack} disabled={isSubmitting}>
          이전
        </Button>
        <Button type="submit" fullWidth={false} disabled={isSubmitting}>
          {isSubmitting ? '전송 중...' : '제출'}
        </Button>
      </div>
    </form>
  );
};

export default ActivityDetailsForm;