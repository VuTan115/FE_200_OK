import { appLibrary } from '@/shared/utils/loading';
import { Button, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { questionAPI, ResponseQuestion, ResponseSuggestion } from '../../api';
import Questions from '../../components/Questions';
import Sugesstions from '../../components/Sugesstions';

type Question = {
  id: number;
  question: string;
  answers: [{ id: number; value: number; label: string }];
};

const rawToClient = (data: ResponseQuestion[]): Question[] => {
  return data.map(
    (item) =>
      ({
        id: item.id,
        question: item.content,
        answers: item.tags.map((tag) => ({ id: tag.id, value: tag.id, label: tag.name })),
      } as Question)
  );
};

const CreateSugesstionModule = () => {
  const questionRef = useRef<{
    next: () => void;
    prev: () => void;
    isDone: () => boolean;
    currentStep: () => number;
    getAnswers: () => { answerId: number; questionId: number }[];
  }>();
  const [currentStep, setCurrentStep] = useState(0);
  const [moveToSugesstion, setMoveToSugesstion] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [suggestions, setSuggestions] = useState<ResponseSuggestion[]>([]);
  const getQuestions = async () => {
    try {
      const res = await questionAPI.getQuestions(5);
      setQuestions(rawToClient(res.data));
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);
  const handlePrevStep = () => {
    if (questionRef.current) {
      questionRef.current.prev();
    }
  };
  const handleNextStep = () => {
    if (questionRef.current) {
      questionRef.current.next();
    }
    if (currentStep === questions.length - 1) {
      const data = questionRef.current.getAnswers();
      const notAnsweredQuestion = questions.filter(
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
    try {
      appLibrary.showloading();
      const params = questionRef.current.getAnswers();
      if (params.length === 0) {
        message.error('Có lỗi xảy ra, vui lòng thử lại sau');
        return;
      }
      const tags = params.map((item) => item.answerId);

      onGetSuggestions(tags);
      appLibrary.hideloading();
    } catch (error) {
      appLibrary.hideloading();
      message.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };
  const onGetSuggestions = async (tags: number[]) => {
    try {
      appLibrary.showloading();
      const { data, success } = await questionAPI.getSuggestionFromTags(tags);

      if (success) {
        message.success('Cookies đã tìm thấy món ăn cho bạn');
        setSuggestions(data);
        setMoveToSugesstion(true);
      }
      appLibrary.hideloading();
    } catch (error) {
      appLibrary.hideloading();

      message.error('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };
  return (
    <>
      <div>
        {!moveToSugesstion && (
          <div>
            <Questions
              ref={questionRef}
              questions={questions}
              onStepChange={setCurrentStep}
            />
            <div className="flex gap-5 mx-auto  justify-center items-center mt-5">
              <Button type="primary" onClick={handlePrevStep}>
                Trước đó
              </Button>
              <Button type="primary" onClick={handleNextStep}>
                {currentStep === questions.length - 1 ? 'Gửi đáp án' : 'Tiếp theo'}
              </Button>
            </div>
          </div>
        )}
        {moveToSugesstion && <Sugesstions suggestions={suggestions} />}
      </div>
    </>
  );
};

export default CreateSugesstionModule;
