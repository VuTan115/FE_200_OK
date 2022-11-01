import SrcIcons from '@/assets/icons';
import SrcImages from '@/assets/images';
import { Button, Carousel, Radio } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import clsx from 'clsx';
import Image from 'next/image';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

type Props = {
  questions: {
    id: number;
    question: string;
    answers: { id: number; value: number; label: string }[];
  }[];
  onStepChange: (step: number) => void;
};

const Questions = (props: Props, ref) => {
  const sliderRef = useRef<CarouselRef>();
  const [doneAnswers, setDoneAnswers] = useState<
    { answerId: number; questionId: number }[]
  >([]);
  const [isDone, setIsDone] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { questions } = props;
  const onChange = (answerId, item) => {
    console.log(doneAnswers);
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
      console.log(doneAnswers);
    }
  };
  useImperativeHandle(ref, () => ({
    next: () => sliderRef.current.next(),
    prev: () => sliderRef.current.prev(),
    getAnswers: () => doneAnswers,
    isDone: () => isDone,
    currentStep: () => currentStep,
  }));

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
            {questions.map((item, index) => (
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
                    {item.answers.map((answer) => (
                      <div className="flex w-full relative items-center" key={answer.id}>
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
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Questions);
