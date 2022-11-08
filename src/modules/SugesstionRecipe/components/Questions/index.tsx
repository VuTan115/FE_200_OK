import SrcIcons from '@/assets/icons';
import SrcImages from '@/assets/images';
import { Loading } from '@nextui-org/react';
import { Button, Carousel, Radio } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import clsx from 'clsx';
import Image from 'next/image';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Answer, Question } from '../../pages/Create';

type Props = {
  questions: Question[];
  onStepChange: (step: number) => void;
};

const Questions = (props: Props, ref) => {
  const { questions } = props;
  const sliderRef = useRef<CarouselRef>();
  const [doneAnswers, setDoneAnswers] = useState<
    { answerId: number; questionId: number }[]
  >([]);
  const [isDone, setIsDone] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [questionsWithIsRequiredAnswer, setQuestionsWithIsRequiredAnswer] = useState<
    Question[]
  >([]);

  const onChange = (answerId, item) => {
    // if new insert else update in doneAnswer by setDoneAnswers
    const index = doneAnswers.findIndex(
      (doneAnswer) => doneAnswer.questionId === item.id
    );
    if (index === -1) {
      setDoneAnswers([...doneAnswers, { answerId: answerId, questionId: item.id }]);
    } else {
      doneAnswers[index].answerId = answerId;
      setDoneAnswers([...doneAnswers]);
    }
  };
  const handleNextStep = () => {
    sliderRef.current.next();
    if (isDone) {
      // console.log(doneAnswers);
    }
  };
  useImperativeHandle(ref, () => ({
    next: () => sliderRef.current.next(),
    prev: () => sliderRef.current.prev(),
    getAnswers: () => doneAnswers,
    isDone: () => isDone,
    currentStep: () => currentStep,
  }));

  const handleRandomRollAnswer = (questionId: number) => {
    const newQuest = questions.find((question) => question.id === questionId);
    newQuest.answers = getFiveRandomAnswers(newQuest.answers);
    setQuestionsWithIsRequiredAnswer((pre) => {
      const newData = JSON.parse(JSON.stringify(pre));
      const index = newData.findIndex((item) => item.id === questionId);
      if (index === -1) {
        newData.push(newQuest);
      } else {
        newData[index] = newQuest;
      }
      return newData;
    });
  };
  useEffect(() => {
    if (questions.length > 0) {
      setQuestionsWithIsRequiredAnswer((pre) => {
        const newQuestions = JSON.parse(JSON.stringify(questions));
        /* deep copy questions */

        return newQuestions.map((item) => {
          item.answers = getFiveRandomAnswers(item.answers);
          // item.answers = item.answers.filter((answer) => answer.isRequired);
          return item;
        });
      });
    }
  }, [questions]);

  const getFiveRandomAnswers = (answers: any) => {
    let finalAnwers = [];
    const requiredAnswers = answers.filter((answer) => answer.isRequired);
    const unrequiredAnswers = answers.filter((answer) => !answer.isRequired);

    if (requiredAnswers.length >= 5) {
      finalAnwers = requiredAnswers.slice(0, 5);
    } else {
      const needingAnswersCount = 5 - requiredAnswers.length;

      const newUnrequiredAnswers = shuffle(unrequiredAnswers);
      console.log(newUnrequiredAnswers.slice(0, needingAnswersCount));
      finalAnwers = [
        ...requiredAnswers,
        ...unrequiredAnswers.slice(0, needingAnswersCount),
      ];
    }

    return shuffle(finalAnwers);
  };

  function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
  return (
    <div className="card mx-auto  gap-10">
      <p className="text-2xl font-bold text-center">Hôm nay ăn gì nhỉ?</p>
      <div className="right-side">
        <div className="questions">
          <Carousel
            dots={false}
            ref={sliderRef}
            infinite={false}
            afterChange={(value) => {
              props.onStepChange(value);
              setCurrentStep(value);
              if (isDone !== (value === questions.length - 1)) {
                setIsDone(value === questions.length - 1);
              }
            }}
          >
            {questionsWithIsRequiredAnswer.length > 0 ? (
              questionsWithIsRequiredAnswer.map((item, index) => (
                <div
                  key={item.id}
                  className="!flex flex-row gap-5 !flex-nowrap overflow-visible mb-5 justify-center items-center"
                >
                  <div className="flex flex-col w-1/2 ">
                    <p className="text-center text-[16px]">{item.question}</p>
                    <div className=" h-full relative min-h-[350px]">
                      {/* random image from SrcImage */}
                      <Image
                        fill
                        sizes="100%"
                        src={Object.values(SrcImages)[index + 1]}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="answers w-1/2 mt-5 rounded-[8px]">
                    <Radio.Group
                      onChange={(event) => {
                        onChange(event.target.value, item);
                      }}
                      className="flex flex-col gap-5"
                      size="large"
                    >
                      {item.answers?.map((answer) => (
                        <div
                          className="flex w-full relative items-center"
                          key={answer.id}
                        >
                          <Image
                            width={26}
                            height={26}
                            src={SrcIcons.iconLogo}
                            alt="cookies"
                            // selected then  animate-pulse
                            className={clsx(
                              'absolute -left-[10px] z-10 ',
                              doneAnswers.find(
                                (doneAnswer) =>
                                  doneAnswer.answerId === answer.id &&
                                  doneAnswer.questionId === item.id
                              ) && 'animate-spin'
                            )}
                          />
                          <Radio.Button
                            key={item.id}
                            value={answer.value}
                            className="w-full pl-[30px] !rounded-[10px] border border-solid "
                          >
                            {answer.label}
                          </Radio.Button>
                        </div>
                      ))}
                    </Radio.Group>
                    <Button
                      type="primary"
                      className="w-full mt-5"
                      onClick={() => {
                        handleRandomRollAnswer(item.id);
                      }}
                    >
                      Thay đổi lựa chọn
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="mx-auto !my-5 !flex justify-center items-center flex-col">
                <Loading />
                <span>Đang kết nối đến server...</span>
              </div>
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Questions);
