import { appLibrary } from '@/shared/utils/loading';
import { Button, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Questions from '../../components/Questions';
import Sugesstions from '../../components/Sugesstions';

type Props = {
  data?: any;
};
const mockupData = [
  {
    id: 1,
    question: 'Bạn có thích ăn cá không?',
    answers: [
      { id: 1, value: 1, label: 'Có' },
      { id: 2, value: 2, label: 'Không' },
      { id: 3, value: 3, label: 'Hơi thích' },
      { id: 4, value: 4, label: '!Có' },
    ],
  },
  {
    id: 2,
    question: 'Bạn có thích ăn thịt không?',
    answers: [
      { id: 1, value: 1, label: 'Có' },
      { id: 2, value: 2, label: 'Không' },
      { id: 3, value: 3, label: 'Hơi thích' },
      { id: 4, value: 4, label: '!Có' },
    ],
  },
  {
    id: 3,
    question: 'Bạn có thích ăn rau không?',
    answers: [
      { id: 1, value: 1, label: 'Có' },
      { id: 2, value: 2, label: 'Không' },
      { id: 3, value: 3, label: 'Hơi thích' },
      { id: 4, value: 4, label: '!Có' },
    ],
  },
  {
    id: 4,
    question: 'Bạn có thích ăn trái cây không?',
    answers: [
      { id: 1, value: 1, label: 'Có' },
      { id: 2, value: 2, label: 'Không' },
      { id: 3, value: 3, label: 'Hơi thích' },
      { id: 4, value: 4, label: '!Có' },
    ],
  },
  {
    id: 5,
    question: 'Bạn có thích ăn đồ ăn vặt không?',
    answers: [
      { id: 1, value: 1, label: 'Có' },
      { id: 2, value: 2, label: 'Không' },
      { id: 3, value: 3, label: 'Hơi thích' },
      { id: 4, value: 4, label: '!Có' },
    ],
  },
  {
    id: 6,
    question: 'Bạn có thích ăn đồ ăn vặt không?',
    answers: [
      { id: 1, value: 1, label: 'Có' },
      { id: 2, value: 2, label: 'Không' },
      { id: 3, value: 3, label: 'Hơi thích' },
      { id: 4, value: 4, label: '!Có' },
    ],
  },
  {
    id: 7,
    question: 'Bạn có thích ăn đồ ăn vặt không?',
    answers: [
      {
        id: 1,
        value: 1,
        label: 'Có',
      },
      { id: 2, value: 2, label: 'Không' },
      { id: 3, value: 3, label: 'Hơi thích' },
      { id: 4, value: 4, label: '!Có' },
    ],
  },
];
const CreateSugesstionModule = (props: Props) => {
  const questionRef = useRef<{
    next: () => void;
    prev: () => void;
    isDone: () => boolean;
    currentStep: () => number;
    getAnswers: () => { answerId: number; questionId: number }[];
  }>();
  const [currentStep, setCurrentStep] = useState(0);
  const [moveToSugesstion, setMoveToSugesstion] = useState(false);
  useEffect(() => {}, [questionRef]);
  const handlePrevStep = () => {
    if (questionRef.current) {
      questionRef.current.prev();
    }
  };
  const handleNextStep = () => {
    if (questionRef.current) {
      questionRef.current.next();
    }
    if (currentStep === mockupData.length - 1) {
      const data = questionRef.current.getAnswers();
      const notAnsweredQuestion = mockupData.filter(
        (item) => !data.find((i) => i.questionId === item.id)
      );
      if (notAnsweredQuestion.length) {
        message.warning(
          `Bạn chưa trả lời câu hỏi: ${notAnsweredQuestion
            .map((item) => item.question)
            .join(', ')}`
        );
        return;
      }
      onSubmitAnswers();
    }
  };
  const onSubmitAnswers = () => {
    appLibrary.showloading();
    setMoveToSugesstion(true);
    appLibrary.hideloading();
  };
  return (
    <>
      <div>
        {!moveToSugesstion && (
          <div>
            <Questions
              ref={questionRef}
              questions={mockupData}
              onStepChange={setCurrentStep}
            />
            <div className="flex gap-5 mx-auto  justify-center items-center mt-5">
              <Button type="primary" onClick={handlePrevStep}>
                Trước đó
              </Button>
              <Button type="primary" onClick={handleNextStep}>
                {currentStep === mockupData.length - 1 ? 'Gửi đáp án' : 'Tiếp theo'}
              </Button>
            </div>
          </div>
        )}
        {moveToSugesstion && <Sugesstions />}
      </div>
    </>
  );
};

export default CreateSugesstionModule;
