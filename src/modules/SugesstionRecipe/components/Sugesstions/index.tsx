import { Avatar, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Image from 'next/image';
import { useState } from 'react';
import { ResponseSuggestion } from '../../api';

type Props = {
  suggestions: ResponseSuggestion[];
};

const Sugesstions = (props: Props) => {
  const { suggestions } = props;
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {suggestions.map((item) => (
        <Card className="w-full" loading={loading} key={item.id}>
          <div className="flex justify-between">
            <Meta
              title={item.title}
              // description only has 200 characters max length
              description={`${item.content}`.split(' ').slice(0, 20).join(' ')}
            />
            <div className="relative h-[60px] w-[60px]">
              <Image
                fill
                sizes="100%"
                src={'https://joeschmoe.io/api/v1/random'}
                alt=""
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Sugesstions;
