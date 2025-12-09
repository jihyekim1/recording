import React, { useState } from 'react';
import Input from './Input';
import Dropdown from './Dropdown';
import Button from './Button';
import { LearningActivity, StudentInfo } from '../types';
import { LEARNING_ACTIVITY_OPTIONS } from '../constants';

interface StudentInfoFormProps {
  initialData: StudentInfo;
  onSubmit: (data: StudentInfo) => void;
}

const StudentInfoForm: React.FC<StudentInfoFormProps> = ({ initialData, onSubmit }) => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudentInfo((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!studentInfo.gradeNumber.trim()) {
      newErrors.gradeNumber = '학년은 필수 항목입니다.';
    }
    if (!studentInfo.classNumber.trim()) {
      newErrors.classNumber = '반은 필수 항목입니다.';
    } else if (isNaN(Number(studentInfo.classNumber))) {
      newErrors.classNumber = '반은 숫자여야 합니다.';
    }
    if (!studentInfo.name.trim()) {
      newErrors.name = '이름은 필수 항목입니다.';
    }
    if (!studentInfo.learningActivity) {
      newErrors.learningActivity = '학습 활동을 선택해야 합니다.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(studentInfo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">학생 정보 및 활동 선택</h2>

      <Input
        label="학년"
        id="gradeNumber"
        name="gradeNumber"
        value={studentInfo.gradeNumber}
        onChange={handleChange}
        required
        error={errors.gradeNumber}
        placeholder="예: 3"
        type="number"
        inputMode="numeric"
      />
      <Input
        label="반"
        id="classNumber"
        name="classNumber"
        value={studentInfo.classNumber}
        onChange={handleChange}
        required
        error={errors.classNumber}
        placeholder="예: 1"
        type="number"
        inputMode="numeric"
      />
      <Input
        label="이름"
        id="name"
        name="name"
        value={studentInfo.name}
        onChange={handleChange}
        required
        error={errors.name}
        placeholder="예: 홍길동"
      />
      <Dropdown
        label="학습 활동"
        id="learningActivity"
        name="learningActivity"
        value={studentInfo.learningActivity}
        onChange={handleChange}
        options={LEARNING_ACTIVITY_OPTIONS}
        required
        error={errors.learningActivity}
      />

      <Button type="submit" fullWidth className="mt-6">
        다음
      </Button>
    </form>
  );
};

export default StudentInfoForm;