import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Questions from '../../components/Questions';

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
  const [CurrentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    console.log(questionRef);
  }, [questionRef]);
  const handlePrevStep = () => {
    if (questionRef.current) {
      questionRef.current.prev();
    }
  };
  const handleNextStep = () => {
    if (questionRef.current) {
      questionRef.current.next();
    }
    if (CurrentStep === mockupData.length - 1) {
      console.log('done');
      console.log(questionRef.current.getAnswers());
    }
  };
  return (
    <>
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
            {CurrentStep === mockupData.length - 1 ? 'Gửi đáp án' : 'Tiếp theo'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateSugesstionModule;
