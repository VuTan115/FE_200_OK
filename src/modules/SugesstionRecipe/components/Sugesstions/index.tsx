import { Avatar, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  data?: any;
};

const mockupData = [
  {
    title: 'Cá hồi',
    description:
      'Cá hồi là một loài cá thuộc họ Cá hồi, là loài cá đặc sản của miền Bắc. Cá hồi có thể sống ở các khu vực nước ngọt, nước ngọt và nước mặn, nhưng nó thường sống ở các khu vực nước ngọt. Cá hồi có thể sống ở các khu vực nước ngọt, nước ngọt và nước mặn, nhưng nó thường sống ở các khu vực nước ngọt.',
    image:
      'https://images.foody.vn/res/g1/1000/s570x570/foody-upload-api-foody-mobile-190621-1-190621101101.jpg',
    id: 1,
  },
  {
    title: 'Gà rán',
    description:
      'Gà rán là một loài cá thuộc họ Cá hồi, là loài cá đặc sản của miền Bắc. Cá hồi có thể sống ở các khu vực nước ngọt, nước ngọt và nước mặn, nhưng nó thường sống ở các khu vực nước ngọt. Cá hồi có thể sống ở các khu vực nước ngọt, nước ngọt và nước mặn, nhưng nó thường sống ở các khu vực nước ngọt.',
    image:
      'https://images.foody.vn/res/g1/1000/s570x570/foody-upload-api-foody-mobile-190621-1-190621101101.jpg',
    id: 2,
  },
];

const Sugesstions = (props: Props) => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {mockupData.map((item) => (
        <Card className="w-full" loading={loading} key={item.id}>
          <div className="flex justify-between">
            <Meta
              title={item.title}
              // description only has 200 characters max length
              description={`${item.description}`.split(' ').slice(0, 20).join(' ')}
            />
            <div className="relative h-[60px] w-[60px]">
              <Image fill sizes="100%" src={item.image} alt="" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Sugesstions;
